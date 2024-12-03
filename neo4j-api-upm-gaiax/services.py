
# Función principal para crear nodos y relaciones basado en el JSON
def create_nodes_and_relationships(session, data):
    for vc in data["verifiableCredential"]:
        if "credentialSubject" in vc:
            subject = vc["credentialSubject"]
            if subject["type"] == "gx:LegalParticipant":
                participant_id = subject["id"]
                legalAddress = subject.get("gx:legalAddress")["gx:countrySubdivisionCode"]
                create_participant(session, participant_id, subject.get("gx:legalName", "Unknown"), legalAddress)

def create_participant(session, participant_id, legal_name="Unknown", legal_address="Unknown"):
    session.run(
        "MERGE (p:Participant {participant_id: $participant_id, name: $name, address: $address})",
        participant_id=participant_id, name=legal_name, address=legal_address
    )