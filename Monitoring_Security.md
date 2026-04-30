System Monitoring & Security Architecture
Overview:
To ensure the Cloud-Based Multilingual Translation Platform is secure, highly available, and easily observable, we have integrated native Azure security protocols and observability metrics into our DevOps lifecycle.

Part 1: Security Implementation
Strict HTTPS Enforcement (Encryption in Transit):
We configured our Infrastructure as Code (Terraform) to enforce https_only = true on the Azure Web App. Any HTTP traffic is automatically dropped or redirected, ensuring that sensitive user text and translations cannot be intercepted.

Secure Credential Management (CI/CD):
No passwords or access keys are hardcoded in our repository. We utilize GitHub Encrypted Secrets (${{ secrets.ACR_USERNAME }}) to securely pass Azure Container Registry authentication tokens to our deployment pipeline.

Private Container Registry:
Our Docker images are not publicly accessible on DockerHub. They are hosted in a secure, private Azure Container Registry (ACR), preventing unauthorized access or tampering with our application images.

Part 2: Monitoring & Observability
Infrastructure Health Metrics:
We utilize Azure Monitor natively integrated into our Web App for Containers. This provides real-time telemetry on container health, tracking critical metrics such as CPU Utilization, Memory Working Set, and HTTP 5xx Server Errors.

Container Log Streaming:
Because we are using a containerized approach, we have enabled Docker log streaming within the Azure App Service. This allows us to view live stdout and stderr logs from the frontend container to instantly debug translation API failures or OCR processing errors in real-time.

Automated Health Checks (Future Scope):
Our platform is designed to scale, and future iterations will implement Azure Application Insights for deep Application Performance Monitoring (APM), tracking the exact latency of the GenAI translation calls.