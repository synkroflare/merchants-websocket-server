# Omnichannel System

Omnichannel system in development...

# Setup

Create a .env file on the root folder with a content like the following. Be aware that it's **very dangerous** to use a remove server with Prisma's setup functions, so it's recommended to always use a local database.

```
DB_HOST="localhost"
DB_NAME="omnichannel-system"
DB_USER="root"
DB_PASS="root"
```

- _This .env file is **not commited**, and should only be used for local, development variables._
- _Global variables that have the same value in all environments should be stored in `src/shared/constants/Global.ts`_
- _Global variables that have different values for different environments or that need to be present during **build-time**, besides being added to this `.env` file, should be stores in `env/.env.<environment>`_
- **Sensitive information**, besides being added to this `.env` file, needs to be dealt with separately, and added at infrastructure level, on AWS.

---

Install the dependencies

```
yarn
```

Run this command to setup Husky (pre-commit tasks) and the Database (with Prisma)

```
yarn setup
```

## Run the project locally

### Server

#### Run with watch mode

If you plan to modify the backend several times

```
yarn dev:server
```

#### Build and run

If you want to spare your RAM memory, just build the server once and then run it:

- Build only when you change your server code:

```
yarn build:server
```

- Run:

```
yarn start:server
```
