## Create Service offering

```
@startuml
User -> SignerTool: Request with Private Key, Legal Participant Link & Service offering vcs 
SignerTool -> SignerTool: Validate the request
SignerTool -> SignerTool: Resolve LP link and fetch data
SignerTool -> SignerTool: Fetch Did document and Extract X5U URL

group "Self sign the credential and attach a proof"
SignerTool -> SignerTool: Normalize the credential
SignerTool -> SignerTool: Hash the credential
SignerTool -> SignerTool: Sign the credential with Private Key
end

SignerTool -> SignerTool: Collects dependsOn & aggregationOf resolvable links

loop
SignerTool -> SignerTool: Fetch VCs for dependsOn service and append in Service offering vcs
SignerTool -> SignerTool: Fetch VCs for aggregationOf resource and append in Service offering vcs
end

SignerTool -> SignerTool: Removes duplicate vcs from and Prepare Service offering VP
SignerTool -> Compliance: Req for compliance credential with Self-description vp
Compliance --> SignerTool: Compliance Credential issued
SignerTool -> SignerTool: Calculates Trust Index using Veracity & Transparency
SignerTool --> User: Responds with Service offering VP + compliance response + Trust Index data
@enduml
```

## Create Label Level

```
@startuml
User -> SignerTool: User will req with Private Key & Label level data
SignerTool -> SignerTool: Validate the request
SignerTool -> SignerTool: Fetch Did document and Extract X5U URL
SignerTool -> SignerTool: Calculate Label Level and prepares Label level unsigned JSON

group "Self sign the credential and attach a proof"
SignerTool -> SignerTool: Normalize the credential
SignerTool -> SignerTool: Hash the credential
SignerTool -> SignerTool: Sign the credential with Private Key
end

SignerTool -> Compliance: Request for compliance once support is available
Compliance --> SignerTool: Compliance credential
SignerTool --> User: Label level VC with compliance credential
@enduml
```