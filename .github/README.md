# GitHub Actions

Numeraid is a cloud-native **microservices** platform deployed on **AWS** and managed through **Terraform** and **GitHub Actions**.

This repository is still under active development, so the workflow documentation is intentionally minimal and focused on the current automation basics.

---

## 1. Terraform with AWS

[![Numeraid Terraform - Continuous Integration](https://github.com/devzwide/numeraid-platform-microservice-migration/actions/workflows/numeraid-terraform-continuous-integration.yaml/badge.svg)](https://github.com/devzwide/numeraid-platform-microservice-migration/actions/workflows/numeraid-terraform-continuous-integration.yaml)

Current behavior:

- runs on changes under `aws/terraform/**`
- validates formatting, init, and plan on pull requests and pushes
- authenticates to AWS using GitHub OIDC
- uses a protected GitHub environment for the apply job

Important:

- the `apply` job is guarded by the `development` environment
- configure manual approval and reviewers in GitHub repository settings for that environment before production-like changes are applied

## 2. IAM Service

[![Numeraid IAM Service - Continuous Integration](https://github.com/devzwide/numeraid-platform-microservice-migration/actions/workflows/numeraid-iam-service-continuous-integration.yaml/badge.svg)](https://github.com/devzwide/numeraid-platform-microservice-migration/actions/workflows/numeraid-iam-service-continuous-integration.yaml)

Builds and publishes the IAM service container image when relevant code changes are pushed.

## 3. User Interface

[![Numeraid User Interface - Continuous Integration](https://github.com/devzwide/numeraid-platform-microservice-migration/actions/workflows/numeraid-ui-continuous-integration.yaml/badge.svg)](https://github.com/devzwide/numeraid-platform-microservice-migration/actions/workflows/numeraid-ui-continuous-integration.yaml)

Validates and publishes the React user interface container image for the main and development branches.

---
