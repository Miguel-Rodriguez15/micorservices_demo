<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```


# Microservices Demo - imafeberblue

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/imafeberblue/microservices-demo/actions)
[![License](https://img.shields.io/badge/license-MIT-blue)](https://opensource.org/licenses/MIT)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.1%20adopted-ff69b4.svg)](code_of_conduct.md)

This project is a demonstration of a microservices system built with NestJS and Java, designed to evaluate the ability to implement and manage a complete microservices architecture.

## 🎯 Objective

The main objective of this test is to demonstrate the ability to:

*   Design and build a scalable microservices system.
*   Implement TCP communication between microservices.
*   Implement an API Gateway as a single point of entry.
*   Handle authentication and authorization with JWT.
*   Manage PostgreSQL and MySQL databases.

## ✨ Features

The system includes the following microservices:

*   **API Gateway:** Single point of entry, JWT authentication, load balancing.
*   **User Authentication and Registration:** Registration, authentication, and JWT token generation (PostgreSQL).
*   **Inventory Management:** CRUD of products (MySQL).
*   **Supplier Management:** CRUD of suppliers (MySQL).
*   **Customer Management:** CRUD of customers (MySQL).
*   **Billing Management:** CRUD of invoices, returns management (MySQL).

## 🚀 Technologies Used

*   **Languages:**
    *   [NestJS](https://nestjs.com/) (API Gateway, Microservices)
*   **Databases:**
    *   [PostgreSQL](https://www.postgresql.com/) (Authentication and Users)
    *   [MySQL](https://www.mysql.com/) (Inventory, Suppliers, Customers, Billing)
*   **Communication:**
    *   TCP (JSON over TCP)
*   **Authentication:**
    *   JWT (JSON Web Tokens)

### Execution Steps

1.  **Clone the repository:**

    ```
    git clone https://github.com/imafeberblue/microservices-demo.git
    cd microservices-demo
    ```

4.  **Access the API Gateway:**

    Once all containers are running, you can access the API Gateway at `http://localhost:3000` (or the port you configured).

### Create a user or if you already have one please log in.

In every request you must be logged in and attach the token in bearer token to be able to access the rest of the
access to the rest of the endpoints
**User Registration:** `POST /user
* **Authentication:** `POST /login`


## 🌐 API Endpoints

This section details the API endpoints exposed by the API Gateway.  All endpoints, unless otherwise noted, require JWT authentication.

### User Service

*   **`POST /users`**: Create a new user.
    ```
    {
      "username": "newuser",
      "password": "password123",
      "email": "newuser@example.com"
    }
    ```
*   **`POST /login`**: Authenticate a user and receive a JWT.
    ```
    {
      "username": "existinguser",
      "password": "password123"
    }
    ```
*   **`POST /roles`**:  Create a new role (Admin Only).
    ```
    {
      "name": "administrator",
      "description": "Full access role"
    }
    ```
*   **`GET /roles/:id`**: Get a role by ID (Admin Only).
*   **`DELETE /roles/:id`**: Delete a role by ID (Admin Only).

### Billing Service

*   **`POST /billing`**: Create a new invoice.
    ```
    {
      "customerId": "customer123",
      "items": [
        {
          "productId": "product456",
          "quantity": 2
        }
      ]
    }
    ```
*   **`GET /billing`**: Get all invoices.
*   **`GET /billing/:id`**: Get an invoice by ID.
*   **`PATCH /billing/:id`**: Update an invoice by ID.
    ```
    {
      "status": "paid"
    }
    ```
*   **`DELETE /billing/:id`**: Delete an invoice by ID.

### Inventory Service

*   **`POST /inventory`**: Create a new product.
    ```
    {
      "name": "Awesome Product",
      "description": "A really cool item",
      "price": 29.99,
      "stock": 100
    }
    ```
*   **`GET /inventory`**: Get all products.
*   **`GET /inventory/:id`**: Get a product by ID.
*   **`PATCH /inventory/:id`**: Update a product by ID.
    ```
    {
      "price": 39.99
    }
    ```
*   **`DELETE /inventory/:id`**: Delete a product by ID.
*   **`PATCH /inventory/:id/stock`**: Update product stock.
    ```
    {
      "stock": 50
    }
    ```

### Customer Service

*   **`POST /customer`**: Create a new customer.
    ```
    {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone": "555-1234"
    }
    ```
*   **`GET /customer`**: Get all customers.
*   **`GET /customer/:id`**: Get a customer by ID.
*   **`PATCH /customer/:id`**: Update a customer by ID.
    ```
    {
      "email": "john.new@example.com"
    }
    ```
*   **`DELETE /customer/:id`**: Delete a customer by ID.

### Supplier Service

*   **`POST /supplier`**: Create a new supplier.
    ```
    {
      "name": "Acme Corp",
      "contactEmail": "sales@acme.com",
      "phoneNumber": "555-5678"
    }
    ```
*   **`GET /supplier`**: Get all suppliers.
*   **`GET /supplier/:id`**: Get a supplier by ID.
*   **`PATCH /supplier/:id`**: Update a supplier by ID.
    ```
    {
      "contactEmail": "support@acme.com"
    }
    ```
*   **`DELETE /supplier/:id`**: Delete a supplier by ID.

**Notes:**

*   The request body should be in JSON format.
*   Authentication is required for all endpoints except `POST /users` (user creation) and `POST /login` (authentication).
*   `HttpCode(HttpStatus.NO_CONTENT)` indicates a successful deletion.
*   Example request bodies are provided for clarity; adjust based on the actual DTO definitions.


### Role-Based Access Control (RBAC) Example

The `@Auth()` decorator is used to protect endpoints and restrict access based on user roles. Here's an example demonstrating how access can be controlled:

**1. Endpoint accessible to any authenticated user:**

```ruby
@Auth()
@Post('billing')
createInvoice(@Body() createInvoiceDto: CreateInvoiceDto) {
return this.billingService.send(
{ cmd: 'create_invoice' },
createInvoiceDto,
);
}
```


In this case, any user who is authenticated (has a valid JWT) can access the `createInvoice` endpoint.

**2. Endpoint accessible only to users with the 'admin' role:**

```ruby
@Auth('admin')
@Post('billing')
createInvoice(@Body() createInvoiceDto: CreateInvoiceDto) {
return this.billingService.send(
{ cmd: 'create_invoice' },
createInvoiceDto,
);
}
```


Here, only users who have the 'admin' role assigned to them will be authorized to access the `createInvoice` endpoint.  If a user without the 'admin' role attempts to access this endpoint, they will receive a `403 Forbidden` error.

**Explanation:**

*   The `@Auth()` decorator checks for the presence of a valid JWT in the request.
*   If a role is specified (e.g., `@Auth('admin')`), the decorator further validates that the user has the specified role.
*   This mechanism allows for fine-grained control over access to different parts of the API.

**Important:**

*   The exact implementation of role validation will depend on how you've configured your authentication and authorization logic.  This example assumes that user roles are stored and accessible from within the microservice context.
