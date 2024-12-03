# Gaia-X-Signer-Tool by smartSense

The Gaia-X-Signer-Tool by smartSense is a powerful application designed to facilitate seamless onboarding into the Gaia-X ecosystem. This tool empowers users to interact with the Gaia-X framework through a variety of essential use cases.

## Use Cases

The Gaia-X-Signer-Tool covers the following vital use cases:

1. **Create Web Decentralized Identifiers (DID):** Generate decentralized identifiers for web domains, enabling easy integration with the Gaia-X ecosystem.

2. **Verify Web Decentralized Identifiers (DID):** Verify the authenticity of web-based decentralized identifiers, ensuring robust data security.

3. **Create Legal Participants on Gaia-X:** Streamline the process of registering legal participants within the Gaia-X network.

4. **Create Service Offers on Gaia-X:** Effortlessly create and manage service offerings as integral components of the Gaia-X ecosystem.

5. **Create Resources on Gaia-X:** Simplify the creation and management of resources within the dynamic Gaia-X environment.

6. **Create Label Levels on Gaia-X:** Generate label levels to enhance categorization and organization within the Gaia-X ecosystem.

7. **Verify Self-Description and Gaia-X Compliance:** Verify the credibility of self-descriptions within Gaia-X and assess Gaia-X Compliance Credentials.

## Getting Started

To run the Gaia-X-Signer-Tool application, follow these steps:

1. Make sure you have Node.js version 18.17.0 installed.

2. Copy the example environment file and configure your environment settings:
   
```bash
cp env-example .env
```

3. Install the required dependencies:
```bash
npm ci
```
4. Launch the development server:
```bash
npm run dev
```
5. Access Swagger Documentation
```bash
http://localhost:8000/docs/
```
## Tools and Technologies

1. NodeJS
2. ExpressJS
3. Swagger Doc

## Flow

### Create a Web DID

- First User will need a domain setup for which you want to create a did.
- User will also need a ssl certificate setup for the same domain.
- User certificate chain should be accessible at your provided url else system will fetch from "https://your-domain/.well-known/x509CertificateChain.pem" or "https://domain/tenant/x509CertificateChain.pem"
- The create did api will make a did.json for the provided domain name.
- User will have to host this did.json on "https://your-domain/.well-known/did.json" or "https://domain/tenant/did.json"

![Create Web DID Flow](docs/create-did.png?raw=true)

### Verify a Web DID
- User need to provide web did, verification method and private key for verify
- System will resolve did.json from provided did
- System will find provided verification method in did.json
- System will sign sample text with private key
- After that system will verify sample text hash with verification method
- System will share result of verification

![Verify Web DID Flow](docs/verify-web-did.png?raw=true)
### Sign VC and Compliance to Gaia-X
- User will request vcs with issuer, verification method and private key
- System will fetch all depended vcs 
- System will sign vcs
- System will also verify signature with verification method
- System will req for compliance credentials with all vcs
- Compliance service will response with compliance credential
- System will return self-description vcs and compliance credential to user
-  User will have to host this self-description vcs and compliance credential at credential subject id url which is mentioned in requested vc.


![onBoardToGaiax](docs/issue-creds.png?raw=true)

### Verify a Self Description and Compliance Credential
- User will request with vc url and policies
- System will validate vc type with allowed types (gx:LegalParticipant,gx:ServiceOffering,gx:VirtualDataResource,gx:PhysicalResource,gx:VirtualSoftwareResource) 
- System will validate policy with allowed policies (integrityCheck,issuerSignature,complianceSignature,complianceCheck,complianceExpired)
- After that system will check each policy individually
- System will share result of verification
![verify-signature](docs/verify-vc.png?raw=true)

### Service Offering VC and Compliance
- User will request Signer Tool Private Key, and service offering data to create service offering.
- Signer tool will,
        <ol>
            <li> Validate the request</li> 
            <li> Resolve LP link and fetch data</li> 
            <li> Fetch Did document and Extract X5U URL</li> 
            <li> Decode PrivateKey and Self sign service offering unsigned json</li>
            <li> Validates dependsOn & aggregationOf vc type with allowed types(gx:ServiceOffering,gx:VirtualDataResource,gx:PhysicalResource) and prepares Service offering VP</li>
        </ol>
- Request compliance service for compliance with VP(verifiable presentation) of service offering
- Once the compliance is done, System  will respond User with Self Signed Service offering VP & Compliance credential for the service offering.
-  User will have to host this self-description vcs and compliance credential at credential subject id url which is mentioned in requested vc.

![create-label-level](docs/create-service-offering.png?raw=true)

### Label Level VC and Compliance
- User will request SignerTool with Private Key and Label Level data
- Signer Tool will,
        <ol>
            <li> Validate the request</li> 
            <li> Fetch Did document and Extract X5U URL</li> 
            <li> Calculate Label Level and prepares Label level unsigned JSON</li> 
            <li> Decode PrivateKey and Self sign Label level unsigned JSON (unsigned → signed)</li> 
        </ol>
- Then signer tool will request Compliance service for compliance once the support is there.
- Once the compliance is done, SignerTool will respond User with Label Level VC & Compliance Data.
- At present SignerTool will return self signed VC
![create-label-level](docs/create-label-level.png?raw=true)

### Get Trust Index

- Signer tool will calculate Trust Index Using *Veracity* and *Transparency*.
- The formula for calculating trust index is
```
   trust_index = mean(veracity, transparency)
```
- Veracity will be calculated by the sum of length of keychain of holder,
- The formula for calculating veracity is,
```
    veracity = sum(len(keychain)
```
- Transparency will be calculated using the number of optional and mandatory fields present in the service offering credential subject,
- The formula for calculating transparency is,
```
    transparency = count(properties) / count(mandatoryproperties)
```
- Using the value of veracity and transparency, we'll calculate trust index.

## Known issue or improvement

1. Resource Compliance support pending
2. Label-level Compliance support pending 
