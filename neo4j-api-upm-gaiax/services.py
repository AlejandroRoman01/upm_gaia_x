# Función para crear un nodo de Participant
def create_participant(session, participant_id, legal_name="Unknown", legal_address="Unknown"):
    session.run(
        "MERGE (p:Participant {participant_id: $participant_id, name: $name, address: $address})",
        participant_id=participant_id, name=legal_name, address=legal_address
    )

# Función para crear un nodo de Service Access Point
def create_service_access_point(session, service_access_point_id, open_api, provided_by):
    session.run(
        "MERGE (a:ServiceAccessPoint {service_access_point_id: $service_access_point_id, api: $api, provided_by: $provided_by})",
        service_access_point_id=service_access_point_id, api=open_api, provided_by= provided_by
    )

# Función para crear un nodo de Service Offering
def create_service_offering(session, service_offering_id, name="Unknown", description="No Description", provided_by="No provided"):
    session.run(
        "MERGE (s:ServiceOffering {service_offering_id: $service_offering_id, name: $name, description: $description, provided_by: $provided_by})",
        service_offering_id=service_offering_id, name=name, description=description, provided_by= provided_by
    )

# Función para crear un nodo de Data Resource
def create_data_resource(session, data_resource_id, name="Unknown", description="No Description", produced_by="No provided"):
    session.run(
        "MERGE (d:DataResource {data_resource_id: $data_resource_id, name: $name, description: $description, produced_by: $produced_by})",
        data_resource_id=data_resource_id, name=name, description=description, produced_by=produced_by
    )

# Función para relacionar un Participant con un Service Offering
def match_participant_service_offering(session, participant_id, service_offering_id):
    session.run(
        "MATCH (p:Participant {participant_id: $participant_id}), (s:ServiceOffering {service_offering_id: $service_offering_id}) "
        "MERGE (p)-[:PROVIDES]->(s)",
        participant_id=participant_id, service_offering_id=service_offering_id
    )

# Función para relacionar un Service Offering con un Data Resource
def match_service_offering_data_resource(session, service_offering_id, data_resource_id):
    session.run(
        "MATCH (s:ServiceOffering {service_offering_id: $service_offering_id}), (d:DataResource {data_resource_id: $data_resource_id}) "
        "MERGE (s)-[:AGGREGATES]->(d)",
        service_offering_id=service_offering_id, data_resource_id=data_resource_id
    )

# Función para relacionar un Data Resource con un Service Access Point
def match_data_resource_service_access_point(session, data_resource_id, service_access_point_id):
    session.run(
        "MATCH (d:DataResource {data_resource_id: $data_resource_id}), (a:ServiceAccessPoint {service_access_point_id: $service_access_point_id}) "
        "MERGE (d)-[:EXPOSES]->(a)",
        data_resource_id=data_resource_id, service_access_point_id=service_access_point_id
    )

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
                service_offering_id = subject["id"]
                provided_by = subject["gx:providedBy"]["id"]
                open_api = subject.get("gx:openAPI")

                if open_api:
                    create_service_access_point(session, service_offering_id, open_api, provided_by)
                else:
                    create_service_offering(session, service_offering_id,
                                            subject.get("gx:serviceOffering:name", "Unknown"),
                                            subject.get("gx:serviceOffering:description", "No Description"),
                                            provided_by)
                    match_participant_service_offering(session, provided_by, service_offering_id)

                    if "gx:aggregationOf" in subject:
                        for data_resource in subject["gx:aggregationOf"]:
                            data_resource_id = data_resource["@id"]
                            match_service_offering_data_resource(session, service_offering_id, data_resource_id)

            elif subject["type"] == "gx:DataResource":
                data_resource_id = subject["id"]
                exposed_through = subject["gx:exposedThrough"]["@id"]
                produced_by = subject["gx:producedBy"]["@id"]
                create_data_resource(session, data_resource_id, subject.get("gx:name", "Unknown"),
                                     subject.get("gx:description", "No Description"), produced_by)
                match_data_resource_service_access_point(session, data_resource_id, exposed_through)