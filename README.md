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
  ```

#### 1.2 get all Contacts

- **Endpoint**: `/getall`
- **Method**: `get`
- **Description**: get all contacts.

#### 1.3 get single Contacts

- **Endpoint**: `/get/:email`
- **Method**: `get`
- **Description**: get contacts by email.

### 2. Base URL: `/newsletter`

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
  ```

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
    "image": "image",
    "id": "user5",
    "name": "name",
    "bio": "bio data",
    "socials": "Array",
    "projectLink": "URL"
  }
  ```

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
  ```

#### 3.5 delete profile by userId

- **Endpoint**: `/delete/:id`
- **Method**: `DELETE`
- **Description**: DELETE profile by userId.

### 4. Base URL: `/experience`

#### 4.1 add experience

- **EndPoint**:`create`
- **Method** : `POST`
- **Desc** :add experience

- **Request Headers**:
  - `Content-Type: multipart/formdata`
  - **request file**
    -- an image with file named "image"
- **Request Body**:
  ```json
  form data with fields
  **userId**
  **name**
  **bio**
  **link**
  **skills** ->array
  **job type**
  **fromDate**
  **toDate**
  **note**
  ```
#### 4.2 GET ALL experience

- **EndPoint**:`getall`
- **Method** : `get`
- **Desc** :get all  the experiences

#### 4.3 get experience by experience id
- **EndPoint**:`/get/experience/:id`
- **Method** : `get`
- **Desc** :get  experience by experience id


#### 4.4 get experience by user id
- **EndPoint**:`/get/user/:id`
- **Method** : `get`
- **Desc** :get  experience by user id

#### 4.5 update experience by experience id
- **EndPoint**:`/update/:id`
- **Method** : `PUT`
- **Desc** :UPDATE experience

- **Request Headers**:
  - `Content-Type: multipart/formdata`
  - **request file**
    -- an image with file named "image"
- **Request Body**:
  ```json
  form data with fields
  **userId**
  **name**
  **bio**
  **link**
  **skills** ->array
  **job type**
  **fromDate**
  **toDate**
  **note**
  ```
  ##as required##

#### 4.6 delete experience by experience id
- **EndPoint**:`/delete/:id`
- **Method** : `DELETE`
- **Desc** :DELETE  experience by user id



### 5. Base URL: `/projects`

#### 5.1 add experience

- **EndPoint**:`/create`
- **Method** : `POST`
- **Desc** :add project

- **Request Headers**:
  - `Content-Type: multipart/formdata`
  - **request file**
    -- an image with file named "image" ,5 requirements
- **Request Body**:
  ```json
  form data with fields
  **img url**,
  **projectId**,
  **userId**
  **name**
  **noVotes**
  **skills** ->array
  **job type**
  **note**
  ```
  or as of requirements as body for upload
#### 5.2 GET ALL experience

- **EndPoint**:`getall`
- **Method** : `get`
- **Desc** :get all  the experiences

#### 5.3 get experience by experience id
- **EndPoint**:`/get/project/:id`
- **Method** : `get`
- **Desc** :get  experience by experience id


#### 5.4 get experience by user id
- **EndPoint**:`/get/user/:id`
- **Method** : `get`
- **Desc** :get  experience by user id

#### 5.5 update experience by experience id
- **EndPoint**:`/update/:id`
- **Method** : `PUT`
- **Desc** :UPDATE experience

- **Request Headers**:
  - `Content-Type: multipart/formdata`
  - **request file**
    -- an image with file named "image"
- **Request Body**:
  ```json
  form data with fields
  **userId**
  **name**
  **bio**
  **link**
  **skills** ->array
  **job type**
  **fromDate**
  **toDate**
  **note**
  ```
  ##as required##

#### 5.6 delete project by experience id
- **EndPoint**:`/delete/:id`
- **Method** : `DELETE`
- **Desc** :DELETE  project by user id