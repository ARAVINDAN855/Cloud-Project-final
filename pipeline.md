A. CI/CD Pipeline Stages (GitHub Actions)
Our continuous integration and deployment pipeline is fully automated using GitHub Actions. It triggers automatically upon any code push to the main branch.

Build Stage: The pipeline checks out the latest React source code and triggers a Docker build process using our Dockerfile. It creates an optimized, lightweight Alpine Linux container image containing our compiled frontend assets.

Test Stage: (Currently handled locally prior to commit). Future iterations of this pipeline will integrate npm run test and ESLint checks to prevent broken code from building.

Deploy Stage: The pipeline authenticates securely with our Azure Container Registry (ACR) using encrypted GitHub Secrets. It tags the newly built image and pushes it to ACR. Our Azure Web App is configured with a Webhook to automatically pull this new image and restart the server, achieving zero-touch continuous deployment.

B. Environment Promotion Strategy (Dev → Test → Prod)
To ensure high availability and bug-free releases for the Translation Platform, we utilize a structured environment promotion strategy leveraging Azure App Service Deployment Slots.

Development (Dev): Developers run the application locally using standard Docker containers. Feature branches are tested in isolated local environments before creating a Pull Request.

Testing/Staging (Test): When a Pull Request is merged into the staging branch, the CI/CD pipeline deploys the container to a "Staging Slot" on our Azure Web App. This provides an exact replica of the production environment for QA testing, without impacting real users.

Production (Prod): Once the QA team approves the staging environment, we perform a "Slot Swap" in Azure. This instantly routes production traffic to the new container with zero downtime. If an issue is detected, we can instantly swap back to the previous stable container.