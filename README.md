# Merchants Game - WebSocket Server


# Setup

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
