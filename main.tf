terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}

provider "azurerm" {
  features {}
}

# 1. Resource Group
resource "azurerm_resource_group" "rg" {
  name     = "Translation-rg"
  location = "centralindia"
}

# 2. ACR (Container Registry)
resource "azurerm_container_registry" "acr" {
  name                = "translatorregistry2026"
  resource_group_name = azurerm_resource_group.rg.name
  location            = "centralindia"
  sku                 = "Basic"
  admin_enabled       = true
}

# 3. Service Plan
resource "azurerm_service_plan" "plan" {
  name                = "ASP-Translationrg-80f5"
  resource_group_name = azurerm_resource_group.rg.name
  location            = "southeastasia"
  os_type             = "Linux"
  sku_name            = "F1"
}

# 4. Web App for Containers
resource "azurerm_linux_web_app" "webapp" {
  name                = "multilingual-translator"
  resource_group_name = azurerm_resource_group.rg.name
  location            = "southeastasia"
  service_plan_id     = azurerm_service_plan.plan.id
  https_only          = true

  site_config {
    always_on = false
    application_stack {
      docker_image     = "translatorregistry2026.azurecr.io/translator-frontend"
      docker_image_tag = "v1"
    }
  }
}