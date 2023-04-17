# `API Template` ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

## Project Setup

### Prerequisite
1) Create .env file based on .env.example with your own values
2) MySQL database
    - start a local MySql server
        - Wamp (Windows)
        - Mamp (Mac)
    - create a new database named the same as the env file

### Start Application
- Build application
```bash
npm run build
```
- Run in local
```bash
npm run dev
```
- Run in production
```bash
npm run build
npm run start
```

- with Docker
```bash
docker build .
```

### API Documentation
API documentation can be viewed on [ApiFox](https://apifox.com/apidoc/shared-ede8c92e-d7f4-4995-90e0-46ac2d0a34f5/api-71297034)

## Blockchain

### Testnet - Goerli
```dotenv
COLLECTION_WORD_ADDRESS=0x8186b1b1397acd543a990347b01d5ccf29490a66
COLLECTION_ART_ADDRESS=0xe4A4786956B7643b05642f3c3fE10d9298c65E48
```
### Mainnet
```dotenv
COLLECTION_WORD_ADDRESS=0xd5e5a0d5ad5048af6e0f9479603eacbdbcf400ce
COLLECTION_ART_ADDRESS=0x29434F7628864Ef44fc6Ce20A2f9D28f90Bb85ac
```

## Branch Workflow

### Gitflow

- Standard branch iterative process：`{jira_number}/{branch_name}` -> `dev` & developer test -> `staging` & QA test -> `main`
- Fixing high-priority bugs：`hotfix/{jira_task_number}>{branch_name}` -> `staging` & QA test -> `main`

> `<BRANCH_NAME>` should be replaced with a short description of the changes on your branch.

### Branches
- `main`：Host the latest stable code. Deployment to production should be triggered by creating a new GitHub TAG.
- `staging`: Test environment branch in order to test Release branch by QA.
- `dev`: Dev environment branch in order to test Release branch by Developers.
- `{jira_number}/{branch_name}`： Release branch. Responsible for development destined to a specific release.
- `{jira_number}/{jira_task_number}_{sub_branch_name}`： SubRelease branch. Responsible for split heavy workload for multiple developers within a Release branch.
- `hotfix/{jira_task_number}_{branch_name}`: HotFix branch. Responsible for fixing issues from Main branch.

This project follows these [documented guidelines](https://github.com/Draym/git-guidelines)
