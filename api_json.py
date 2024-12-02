import json

# Cargar el archivo JSON
with open('vp_serviceOffering_repsol1.json', 'r') as file:
    data = json.load(file)

# Inicializar variables para los campos requeridos
legal_name = None
product_officer = None
product_description = None
data_resource = None
access_point = None

# Procesar las credenciales verificables
for credential in data.get("verifiableCredential", []):
    credential_subject = credential.get("credentialSubject", {})

    # gx:legalName
    if credential_subject.get("type") == "gx:LegalParticipant":
        legal_name = credential_subject.get("gx:legalName")

    # Product officer y descripción
    if credential_subject.get("type") == "gx:ServiceOffering":
        product_officer = credential_subject.get("gx:serviceOffering:name")
        product_description = credential_subject.get("gx:serviceOffering:description")

    # Data resource
    if credential_subject.get("type") == "gx:DataResource":
        data_resource = {
            "name": credential_subject.get("gx:name"),
            "description": credential_subject.get("gx:description")
        }

    # Access point
    if credential_subject.get("type") == "gx:ServiceOffering":
        access_point = credential_subject.get("gx:openAPI")

# Imprimir resultados
print("gx:legalName:", legal_name)
print("Product Officer Name:", product_officer)
print("Product Description:", product_description)
print("Data Resource:", data_resource)
print("Access Point:", access_point)
