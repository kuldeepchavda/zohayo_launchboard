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

#### 2.1 Add an email

- **Endpoint**: `/add`
- **Method**: `POST`
- **Description**: add a new email address.
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
- **Description**: get all emails.

#### 2.3 delete single email

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

- **EndPoint**:`/getall`
- **Method** : `get`
- **Desc** :get all the experiences

#### 4.3 get experience by experience id

- **EndPoint**:`/get/experience/:id`
- **Method** : `get`
- **Desc** :get experience by experience id

#### 4.4 get experience by user id

- **EndPoint**:`/get/user/:id`
- **Method** : `get`
- **Desc** :get experience by user id

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
- **Desc** :DELETE experience by user id

### 5. Base URL: `/projects`

## here 5.1 refers to projects data

## AND 5.2 refers to projects collaborators.

## 5.1 projects details

#### 5.1.1 add projects

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

#### 5.1.2 GET ALL projects

- **EndPoint**:`/getall`
- **Method** : `get`
- **Desc** :get all the projects

#### 5.1.3 get project by project id

- **EndPoint**:`/get/project/:id`
- **Method** : `get`
- **Desc** :get project by project id

#### 5.1.4 get projects by user id

- **EndPoint**:`/get/user/:id`
- **Method** : `get`
- **Desc** :get project by user id

#### 5.1.5 update project by project id

- **EndPoint**:`/update/:id`
- **Method** : `PUT`
- **Desc** :UPDATE project

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

#### 5.1.6 delete project by project id

- **EndPoint**:`/delete/:id`
- **Method** : `DELETE`
- **Desc** :DELETE project by user id

#### 5.2 COLLABORATORS

#### 5.2.1 add collaborator

- **EndPoint**:`/collaborator/create/:projectId`
- **Method** : `POST`
- **Desc** :to add user with userId in `projectId` (provide userId in req.body)

- **Request Headers**:
  - `Content-Type: multipart/formdata`
  - **request file**
    -- an image with file named "image" ,5 requirements
- **Request Body**:
  ```json
  -userId
  -name
  -role
  -tenure
  -joiningDate
  -leavingDate
  -workingCurrently
  -taskAssigned
  ```
  or as of requirements as body for upload

#### 5.2.2 GET ALL projects particular user with userId `userId` is part of

- **EndPoint**:`/collaborator/get/:userId`
- **Method** : `get`
- **Desc** :get all the projects with particular userId in collaborators


#### 5.2.3 update informations of particular collaborator in particular `projectId` 

- **EndPoint**:`/collaborator/update/:projectId/:userId`
- **Method** : `PUT`
- **Desc** :UPDATE information of particular collaborator in particular project

- **Request Headers**:
  - `Content-Type: multipart/formdata`
  - **request file**
    -- an image with file named "image"
- **Request Body**:
as of in create , but only the fields which are need to be changed
  ##as required##


#### 5.2.4 delete collaborator from particular project

- **EndPoint**:`/collabprator/delete/:projectId/:userId`
- **Method** : `DELETE`
- **Desc** :DELETE collaboratoe in projec id

### 6. Base URL: `/job`

#### 6.1 add job

- **EndPoint**:`/create`
- **Method** : `POST`
- **Desc** :add project

- **Request Headers**:
  - `Content-Type: multipart/formdata`
  - **request file**
    -- an image with file named "image"
- **Request Body**:
  ```json
  form data with fields
  -jobId,
  -userId
   -title,
  -subheading,
  -projectLink,
  -jobType,
  -submissionDate,
  -compensationType,
  -compensationDetails,
  -socials,
  -description,
  -descriptionHeading,
  ```
  or as of requirements as body for upload

#### 6.2 GET ALL job

- **EndPoint**:`getall`
- **Method** : `get`
- **Desc** :get all the job

#### 6.3 get job by job id

- **EndPoint**:`/get/jobid/:id`
- **Method** : `get`
- **Desc** :get job by job id

#### 6.4 get job by user id

- **EndPoint**:`/get/userid/:id`
- **Method** : `get`
- **Desc** :get job by user id

#### 6.5 update job by job id

- **EndPoint**:`/update/:id`
- **Method** : `PUT`
- **Desc** :UPDATE job

- **Request Headers**:
  - `Content-Type: multipart/formdata`
  - **request file**
    -- an image with file named "image"
- **Request Body**:

```json
 form data with fields
  -title,
 -subheading,
 -projectLink,
 -jobType,
 -submissionDate,
 -compensationType,
 -compensationDetails,
 -socials,
 -description,
 -descriptionHeading,
 -jobId,
 -userId
 ## as required ##
```

#### 6.6 delete job by job id

- **EndPoint**:`/delete/:id`
- **Method** : `DELETE`
- **Desc** :DELETE job by user id
