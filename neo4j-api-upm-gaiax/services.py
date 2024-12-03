
# Función principal para crear nodos y relaciones basado en el JSON
def create_nodes_and_relationships(session, data):
    for vc in data["verifiableCredential"]:
        if "credentialSubject" in vc:
            subject = vc["credentialSubject"]
            if subject["type"] == "gx:LegalParticipant":
                participant_id = subject["id"]
                legalAddress = subject.get("gx:legalAddress")["gx:countrySubdivisionCode"]
                create_participant(session, participant_id, subject.get("gx:legalName", "Unknown"), legalAddress)
            elif subject["type"] == "gx:ServiceOffering":
                serviceoffering_id = subject["id"]
                participantID = subject["gx:providedBy"]["id"]
                openAPI = subject.get("gx:openAPI")
 
                if openAPI:
                    create_service_access_point(session, serviceoffering_id, openAPI, participantID)
                else:
                     create_service_offering(session, serviceoffering_id,
                                            subject.get("gx:serviceOffering:name", "Unknown"),
                                            subject.get("gx:serviceOffering:description", "No Description"),
                                           participantID)
                     match_participant_service_offering(session, participantID, serviceoffering_id)
 
                     if "gx:aggregationOf" in subject:
                        for data_resource in subject["gx:aggregationOf"]:
                            data_resource_id = data_resource["@id"]
                            match_service_offering_data_resource(session, serviceoffering_id, dataresource_id)
            elif subject["type"] == "gx:DataResource":
                dataresource_id = subject["id"]
                exposed_through = subject["gx:exposedThrough"]["@id"]
                producedBy = subject["gx:producedBy"]["@id"]
                create_data_resource(session,  dataresource_id, subject.get("gx:name", "Unknown"),
                                     subject.get("gx:description", "No Description"), producedBy)
                match_data_resource_service_access_point(session, dataresource_id, exposed_through)

def create_participant(session, participant_id, legal_name="Unknown", legal_address="Unknown"):
    session.run(
        "MERGE (p:Participant {participant_id: $participant_id, name: $name, address: $address})",
        participant_id=participant_id, name=legal_name, address=legal_address
    )

def create_service_offering(session, serviceoffering_id, serviceOfferingName="Unknown", serviceOfferingDescription="No Description", participantID="Unknown"):
    session.run(
        "MERGE (s:ServiceOffering {serviceoffering_id: $serviceoffering_id, serviceOfferingName: $serviceOfferingName, serviceOfferingDescription: $serviceOfferingDescription, participantID: $participantID})",
         serviceoffering_id= serviceoffering_id, serviceOfferingNameI=serviceOfferingName,serviceOfferingDescription=serviceOfferingDescription, providedBy=participantID)
    
def  create_data_resource(session,  dataresource_id, name="Unknown", description="No Description", producedBy="Unknown"):
    session.run(
        "MERGE (d:DataResource { dataresource_id: $ dataresource_id, name: $name,  description: $description, producedBy: $producedBy})",
         dataresource_id=  dataresource_id, name= name, description=description, producedBy=producedBy)
    
def create_service_access_point(session,  serviceoffering_id, exposed_through="Unknown"):
    session.run(
        "MERGE (d:DataResource { dataresource_id: $ dataresource_id, exposed_throughy: $exposed_through})",
         serviceoffering_id =  serviceoffering_id, exposed_through=exposed_through)
                  
def match_participant_service_offering(session, participantID, serviceoffering_id):
    session.run(
        "MATCH (p:Participant {participantID: $participantID}), (s:ServiceOffering {serviceoffering_id: $serviceoffering_id}) "
        "MERGE (p)-[:PROVIDES]->(s)",
        participantID=participantID, service_offering_id=serviceoffering_id
    )
 
# Función para relacionar un Service Offering con un Data Resource
def match_service_offering_data_resource(session, serviceoffering_id, data_resource_id):
    session.run(
        "MATCH (s:ServiceOffering {serviceoffering_id: $serviceoffering_id}), (d:DataResource {data_resource_id: $data_resource_id}) "
        "MERGE (s)-[:AGGREGATES]->(d)",
       serviceoffering_id=serviceoffering_id, data_resource_id=data_resource_id
    )
 
# Función para relacionar un Data Resource con un Service Access Point
def match_data_resource_service_access_point(session, data_resource_id, service_access_point_id):
    session.run(
        "MATCH (d:DataResource {data_resource_id: $data_resource_id}), (a:ServiceAccessPoint {service_access_point_id: $service_access_point_id}) "
        "MERGE (d)-[:EXPOSES]->(a)",
        data_resource_id=data_resource_id, service_access_point_id=service_access_point_id
    )

    