# PING Auth Service

## Technology Stack

- Node
- Prisma (ORM)
- PostgreSQL
- Docker

## Architecture

## Running Locally

To run this service locally, you must have the following preresiquites installed and ensure that port `3000` is available on your machine.

### Preresiquites

- Node
- Docker

### Starting Up Containers

Once you have the preresiquites installed, simply run `npm run docker:up` from within the project. This will start up two containers, one for the **PostgreSQL** database and another for the **PING Auth Service** itself.

> You do not need to manually run `npm install`, as the **PING Auth Service** image will do it for you.

The serivce should now be accessible at `http://localhost:3000`.

To test if the service is up and running, run `curl http://localhost:3000/api/status` from your terminal. You should see the following output or something similar.

```bash
{ "status": "ONLINE" }
```

> To enable full access to all API's you will need to initialise the **PostgreSQL** database schema.

### Initialising Datbase Schema

After starting up the **PING Auth Service** containers for the **first** time on your machine, you will need to initialise the **PostgreSQL** database schema before being able to use any API's that depend on it.

This service uses **Prisma** to help define and interact with the database. Run `npm run prisma:migrate:dev -- --name <migration-name>`, to initialise the **PostgreSQL database. Where `<migration-name>` should be replaced with the name of the migration, which is usually `init` for the initial migration.

With the database initialised, you are now ready to use the **PING Auth Service**. Optionally, you can seed the database with some initial data by running `npm run prisma:db:seed`.

### Tearing Down Containers

Once you are finished with the **PING Auth Service**, make sure to tear it down by running `npm run docker:down` from within project.

## Testing

### Integration Testing

To run integration tests for this project. Simply run `npm run test:integration` from wihtin the project.
