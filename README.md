# DrivenPass API 💳

## Table of Contents
- [Project Description](#project-description)
- [Technologies](#technologies)
- [Running the project](#running-the-project)
- [Features](#features)

## Project Description
**DrivenPass** is a password manager API.
The API is responsible for creating, reloading, as well as managing passwords.

![status-finished](https://user-images.githubusercontent.com/97575616/152926720-d042178b-24c0-4d6b-94fb-0ccbd3c082cc.svg)

## Technologies
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

## Running the project

1. Clone the repository:

    ```bash
    git clone https://github.com/AlineCantalice/projeto19-drivenpass.git
    ```
2. Navigate to the project directory:
    
    ```bash
    cd projeto19-drivenpass
    ```
3. Install the dependencies:
    
    ```bash
    npm install
    ```
4. Set your environment variables following the .env.sample file:

   **Notes**: `PORT` must be a number, `DATABASE_URL`, `CRYPT_SECRET`, `TOKEN_SECRET_KEY` and `TOKEN_EXPIRES_IN` must be strings

   ```ts
    DATABASE_URL=
    PORT=
    TOKEN_SECRET_KEY=
    TOKEN_EXPIRES_IN=
    CRYPT_SECRET=
   ```
5. Generate prisma models that could exist in database:

  ```
  npx prisma db pull
  ```
  **Notes**: If there are no models, run the following to generate the models from prisma:
  ```
  npx prisma migrate dev
  ```

6. Run the project on dev mode

   ```bash
   npm run dev
   ```

## Features

**Notes:**


