# Create Web DID FLow

```
@startuml
"User" -> "Signer tool": create web DID request
"Signer tool" -> "DID Domain": Get x509CertificateChain
"Signer tool" <-- "DID Domain": x509CertificateChain.pem
"User" <-- "Signer tool": generated web did
@enduml
```
# Verify Web DID FLow

```
@startuml
"User" -> "Signer tool": verify web DID request
"Signer tool" -> "DID Domain": Get did.json
"Signer tool" <-- "DID Domain": did.json
"Signer tool" -> "Signer tool": Sign sample text with private key
"Signer tool" -> "Signer tool": Verify sample text hash with verification method
"User" <-- "Signer tool": result verify web DID
@enduml
```

# Sign VC and Compliance to Gaia-X

```
@startuml
"User" -> "Signer tool": request creds with issuer, verification method and private key
"Signer tool" -> "Signer tool": Fetch depended all credentials
alt registrationNumber vc
"Signer tool" -> "Gaia-x registrationNumber": legalRegistrationNumber vc get issued though notarization api
"Signer tool" <-- "Gaia-x registrationNumber": Credential issued
end
"Signer tool" -> "Signer tool": Combined all vcs
alt proof not available in vc
group "Self-sign the credential and attach a proof"
loop
"Signer tool" -> "Signer tool": Normalize the credential
"Signer tool" -> "Signer tool": Hash the credential
"Signer tool" -> "Signer tool": Sign the credential with Private Key
end
end
group "Verify the proof"
loop
"Signer tool" -> "Signer tool": Fetch certificate chain from x5u URL
"Signer tool" -> "Signer tool": Generate Public Key from certificate
"Signer tool" -> "Signer tool": Verify the attached proof
end
end
end
"Signer tool" -> "Gaia-x Compliance": req for compliance credential with Self-description vp
"Signer tool" <-- "Gaia-x Compliance": complianceCredential issued
"User" <-- "Signer tool": Send Self-description vp and Compliance Credential
@enduml
```

# verify-Signatuer FLow

```
@startuml
"User" -> "Signer tool": User request vc url with policies
"Signer tool" -> "Signer tool": fetch vc from vc url and check each policy with all vcs
group "Verify integrityCheck policy"
loop
"Signer tool" -> "Signer tool": Each vc sha256 hash generated and check against complianaceCredentail credentialSubject integrity hash
end
end
group "Verify issuerSignature and complianceSignature policy"
loop
"Signer tool" -> "Signer tool": Fetch the DDO from vc issuer did
"Signer tool" -> "Signer tool": Find verification method from DDO
"Signer tool" -> "Signer tool": Get x5u from from verification method
"Signer tool" -> "Gaia-x Registry": Validate the x5u url with trustAnchor/chain/file registry app
"Signer tool" <-- "Gaia-x Registry": Validation status
"Signer tool" -> "Signer tool": match public key from DDO and certificates of x5u
"Signer tool" -> "Signer tool": Normalize,Hash & verify proof
end
end
group "Verify complianceCheck policy"
"Signer tool" -> "Signer tool": Get complianaceCredentail issuer did 
"Signer tool" -> "Gaia-x Registry": req api/complianceIssuers did from registry app 
"Signer tool" <-- "Gaia-x Registry": return complianace did 
"Signer tool" -> "Signer tool": Match compliance issuer did with complianaceCredentail issuer did 
end
group "Verify complianceExpired policy"
"Signer tool" -> "Signer tool": Get complianaceCredentail expirationDate
"Signer tool" -> "Signer tool": check expirationDate with currentDate
end
"User" <-- "Signer tool": Validation result
@enduml
```
