## About

Sample serverless AppSync project

2 handlers :
- handler.js Main Lambda with a simple fetch() to GraphQL Endpoint, Datadog & xRay added manually
- getHeadlines Second Lambda with "got" as HTTP Client, Datadog & xRay added from handlers files and from cleo-toolkit

Added handler for Datadog & xRay

## Problems

No AppSync Elastic queries tracing show in APM (instead of a local Elasticsearch client)

- [x] Amazon headers is present in the request
- [x] Datadog headers is present in the request
