from pydantic import BaseModel
from typing import List, Optional

# Schema para el Legal Participant
class ParticipantSchema(BaseModel):
    id: str
    type: str
    gx_legalName: Optional[str]

# Schema para el Service Offering
class ServiceOfferingSchema(BaseModel):
    id: str
    type: str
    gx_providedBy: dict
    gx_openAPI: Optional[str]
    gx_serviceOffering_name: Optional[str]
    gx_serviceOffering_description: Optional[str]
    gx_aggregationOf: Optional[List[dict]]

# Schema para el Data Resource
class DataResourceSchema(BaseModel):
    id: str
    type: str
    gx_name: Optional[str]
    gx_description: Optional[str]
    gx_exposedThrough: dict

# Schema para el Service Access Point
class ServiceAccessPointSchema(BaseModel):
    id: str
    type: str
    gx_api: Optional[str]

# Credential Subject: Puede ser de varios tipos
class CredentialSubjectSchema(BaseModel):
    id: str
    type: str
    gx_legalName: Optional[str]
    gx_providedBy: Optional[dict]
    gx_openAPI: Optional[str]
    gx_serviceOffering_name: Optional[str]
    gx_serviceOffering_description: Optional[str]
    gx_aggregationOf: Optional[List[dict]]
    gx_name: Optional[str]
    gx_description: Optional[str]
    gx_exposedThrough: Optional[dict]

# Verifiable Credential Schema
class VerifiableCredentialSchema(BaseModel):
    credentialSubject: CredentialSubjectSchema

# Entrada principal: lista de VerifiableCredential
class InputData(BaseModel):
    verifiableCredential: List[VerifiableCredentialSchema]
