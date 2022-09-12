# DrivenPass API 💳

## Table of Contents
- [Project Description](#project-description)
- [Technologies](#technologies)
- [Running the project](#running-the-project)
- [Routers](#routers)

## Project Description
**DrivenPass** is a password manager API.
The API is responsible for creating, loading, as well as managing passwords.

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

## Routers
- **Notes**: All routes, besides signup and signin, must have the token in the header of the request.

### Authorization Router:

#### Create Account

- **Notes**:
- `Header`: should not send
- `Response`: there is no response

- **Endpoint**:
```http
POST /signup
```
- **Request body**
```json
    {
       "email": "******@*.com",
       "password": "**********" min=10
    }
```

#### Login

- **Notes**:
- `Header`: should not send
- `Response`: get token from response

- **Endpoint**:
```http
POST /signin
```
- **Request body**
```json
    {
       "email": "******@*.com",
       "password": "**********" min=10
    }
```

### Credentials Router:
- **Notes**:
- `Header`: must send the token (it can be with or without Bearer)

#### Create credential

- **Endpoit**:
```http
POST /credentials/{userId}
```

- **Notes**: 
- `Params`: must have userId as params

- **Request Body**:
```json
    {
        "title": "teste",
        "url": "https://*****", Link válido
        "username": "****",
        "password": "****"
    }
```

#### Get All user's credentials

- **Endpoit**:
```http
GET /credentials/{userId}
```

- **Notes**: 
- `Params`: must have userId as params

- **Response example**:
```json
[
  {
    "id": 2,
    "userId": 1,
    "title": "teste decriptografando",
    "url": "https://www.google.com/",
    "password": "1234",
    "username": "teste"
  },
  {
    "id": 3,
    "userId": 1,
    "title": "teste criando",
    "url": "https://www.google.com/",
    "password": "1234",
    "username": "teste"
  }
]
```

#### Get user's credential by id

- **Endpoit**:
```http
GET /credentials/{id}/{userId}
```

- **Notes**: 
- `Params`: must have id and userId as params

- **Response example**:
```json
  {
    "id": 2,
    "userId": 1,
    "title": "teste decriptografando",
    "url": "https://www.google.com/",
    "password": "1234",
    "username": "teste"
  }
```

#### Remove credential by id

- **Endpoit**:
```http
DELETE /credentials/{id}/{userId}
```

- **Notes**: 
- `Params`: must have id and userId as params

### SafeNotes Router:
- **Notes**:
- `Header`: must send the token (it can be with or without Bearer)

#### Create safeNote

- **Endpoit**:
```http
POST /safenotes/{userId}
```

- **Notes**: 
- `Params`: must have userId as params

- **Request Body**:
```json
    {
        "title": "*****", max=50
        "note": "*****" max=1000
     }
```

#### Get All user's safenotes

- **Endpoit**:
```http
GET /safenotes/{userId}
```

- **Notes**: 
- `Params`: must have userId as params

- **Response example**:
```json
[
  {
   "id": 2,
    "userId": 1,
    "title": "safe note teste",
    "note": "Esse é um teste"
  },
  {
    "id": 3,
    "userId": 1,
    "title": "safe note teste deletar",
    "note": "Esse é um teste"
  }
]
```

#### Get user's safenote by id

- **Endpoit**:
```http
GET /safenotes/{id}/{userId}
```

- **Notes**: 
- `Params`: must have id and userId as params

- **Response example**:
```json
  {
     "id": 3,
     "userId": 1,
     "title": "safe note teste deletar",
     "note": "Esse é um teste"
  }
```

#### Remove safenote by id

- **Endpoit**:
```http
DELETE /safenotes/{id}/{userId}
```

- **Notes**: 
- `Params`: must have id and userId as params


### Cards Router:
- **Notes**:
- `Header`: must send the token (it can be with or without Bearer)

#### Create card

- **Endpoit**:
```http
POST /cards/{userId}
```

- **Notes**: 
- `Params`: must have userId as params
- `Type`: The cards only can have types CREDIT, DEBIT or BOTH, and it must be in capital letters

- **Request Body**:
```json
    {
      "cardName": "card test",
      "title": "*****",
      "cardNumber": "*****",
      "securityCode": "***", length=3
      "expirationDate": "*****",length=5
      "password": "****",length=4
      "isVirtual": false || true,
      "type": DEBIT || CREDIT || BOTH
    }
```

#### Get All user's cards

- **Endpoit**:
```http
GET /cards/{userId}
```

- **Notes**: 
- `Params`: must have userId as params

- **Response example**:
```json
[
  {
    "id": 1,
    "userId": 1,
    "cardName": "card test",
    "cardNumber": "123456789",
    "password": "1234",
    "securityCode": "123",
    "expirationDate": "09/27",
    "isVirtual": true,
    "type": "BOTH",
    "title": "cartão teste"
  },
  {
     "id": 2,
    "userId": 1,
    "cardName": "card test",
    "cardNumber": "123456789",
    "password": "1234",
    "securityCode": "123",
    "expirationDate": "09/27",
    "isVirtual": true,
    "type": "BOTH",
    "title": "cartão teste deletar"
  }
]
```

#### Get user's card by id

- **Endpoit**:
```http
GET /cards/{id}/{userId}
```

- **Notes**: 
- `Params`: must have id and userId as params

- **Response example**:
```json
  {
      "id": 2,
    "userId": 1,
    "cardName": "card test",
    "cardNumber": "123456789",
    "password": "1234",
    "securityCode": "123",
    "expirationDate": "09/27",
    "isVirtual": true,
    "type": "BOTH",
    "title": "cartão teste deletar"
  }
```

#### Remove card by id

- **Endpoit**:
```http
DELETE /cards/{id}/{userId}
```

- **Notes**: 
- `Params`: must have id and userId as params

### Wifi Router:

- **Endpoit**:
```http
POST /wifi/{userId}
```

- **Notes**: 
- `Params`: must have userId as params

- **Request Body**:
```json
    {
       "title": "****",
       "wifiName": "****",
       "password": "****"
    }
```

#### Get All user's wifi

- **Endpoit**:
```http
GET /wifi/{userId}
```

- **Notes**: 
- `Params`: must have userId as params

- **Response example**:
```json
[
  {
    "id": 2,
    "userId": 1,
    "title": "wifi teste",
    "password": "1234",
    "wifiName": "wifi teste"
  },
  {
    "id": 4,
    "userId": 1,
    "title": "wifi teste",
    "password": "1234",
    "wifiName": "wifi teste"
  }
]
```

#### Get user's card by id

- **Endpoit**:
```http
GET /wifi/{id}/{userId}
```

- **Notes**: 
- `Params`: must have id and userId as params

- **Response example**:
```json
 {
    "id": 4,
    "userId": 1,
    "title": "wifi teste",
    "password": "1234",
    "wifiName": "wifi teste"
  }
```

#### Remove card by id

- **Endpoit**:
```http
DELETE /wifi/{id}/{userId}
```

- **Notes**: 
- `Params`: must have id and userId as params
