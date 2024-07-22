# API Documentation

## Contact Routes

### 1. Base URL: `/contact`

#### 1.1 Create a Contact

- **Endpoint**: `/create`
- **Method**: `POST`
- **Description**: Create a new contact.
- **Request Headers**:
  - `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "name": "Kuldeep Chavda",
    "email": "summy@gmail.com",
    "subject": "This is heading",
    "message": "This is a message"
  }
#### 1.2 get all Contacts

- **Endpoint**: `/getall`
- **Method**: `get`
- **Description**: get all contacts.
#### 1.3 get single Contacts

- **Endpoint**: `/get/:email`
- **Method**: `get`
- **Description**: get contacts by email.

      


###  2. Base URL: `/newsletter`

#### 2.1 Create a Contact

- **Endpoint**: `/add`
- **Method**: `POST`
- **Description**: add a new email add.
- **Request Headers**:
  - `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "email": "summy@gmail.com"
  }
#### 2.2 get all emails for newsletter

- **Endpoint**: `/getall`
- **Method**: `get`
- **Description**: get all contacts.
#### 2.3 get single Contacts 
 
- **Endpoint**: `/delete/:email`
- **Method**: `delete`
- **Description**: delete email.

### 3. Base URL: `/profile`
#### 3.1 Create a Profile

- **Endpoint**: `/upload`
- **Method**: `POST`
- **Description**: add a new profile .
- **Request Headers**:
  - `Content-Type: multipart/formdata`
- **Request Body**:
  ```json
  {
    "image":"image",
    "id": "user5",
    "name":"name",
    "bio":"bio data",
    "socials":"Array",
    "projectLink":"URL"
  }
#### 3.2 get all Profile Data
 
- **Endpoint**: `/getall`
- **Method**: `GET`
- **Description**: GET all profile .

#### 3.3 get profile by userId

- **Endpoint**: `/get/:id`
- **Method**: `GET`
- **Description**: get profile by userId .
#### 3.4 update profile by id

- **Endpoint**: `/update/:id`
- **Method**: `put`
- **Description**: update profile by id .
- **Request Headers**:
  - `Content-Type: multipart/formdata`
- **Request Body**:
  ```json
  {
    "image":"image",
    "id": "user5",
    "name":"name",
    "bio":"bio data",
    "socials":"Array",
    "projectLink":"URL"
  }  add as per the requirements
#### 3.5 delete profile by userId

- **Endpoint**: `/delete/:id`
- **Method**: `DELETE`
- **Description**: DELETE profile by userId.