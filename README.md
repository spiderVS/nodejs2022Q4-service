# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker [Download & Install Docker](https://docs.docker.com/engine/install/)

**!!! Required Node.js 18 LTS**

## Downloading

```bash
git clone {repository URL}
```

## Add .env file
You can change the environment variables if you need.

> Copy `.env.example`  and rename `.env.example` -> `.env`

## Building Docker images and running application

> After building application starts automatically.
>
> Migrations will be generated and applied to the database automatically.
>
> Container auto restarting after crash
>
> Application is restarting upon changes implemented into `src` folder

**(Re)build images, create and start containers:**
```bash
npm run docker:compose-rebuild
```

If you need to stop the application use `CTRL + C`

You can re-launch the application using (**Images are not re-built, only create and start containers**):
```
npm run docker:compose
```

If you no longer need the containers, run a command that will stop the containers and remove them (**only containers, not images**)
```
docker compose down
```

## Vulnerabilities scanning
```
npm run docker:scan-nest
npm run docker:scan-pg
```

## Testing

### Prerequisites

 - For testing you can add dependencies to project (`jest` required )

Open new terminal and install NPM modules:

```
npm install
```

To run all tests use:

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```
## Additional info

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

You can us that for add/delete entities to/from DB.

Docker images are available on Docker Hub into `spidervs/nodejs2022q4` private repository.

> DB is stored in volume. In the same place in the `log` folder you can find the database logs.

### NPM scripts
- `docker:build-nest` - build app image
- `docker:build-pg` - build postgres image
- `docker:compose-rebuild` - (re)build images, create and start containers
- `docker:compose` - create and start containers
- `docker:scan-nest` - vulnerabilities scanning app
- `docker:scan-pg` - vulnerabilities scanning postgres
- `typeorm` - script for start `typeorm`
- `migrations:create` - create new migration
- `migrations:generate` - generate migration
- `migrations:run` - applied migration
- `migrations:down` - revert migration
### Auto-fix

```
npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
