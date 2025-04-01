# User Management System Documentation

## Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Frontend Documentation](#frontend-documentation)
  - [User Component](#user-component)
  - [HTML Template](#html-template)
  - [Services](#services)
    - [User Service](#user-service)
  - [Global Styles](#global-styles)
- [Backend Documentation](#backend-documentation)
  - [Controllers](#controllers)
    - [UsersController](#userscontroller)
  - [Models](#models)
    - [User](#user)
  - [Services](#services-1)
    - [UserService](#userservice)
  - [Repository](#repository)
- [API Documentation](#api-documentation)
  - [Endpoints](#endpoints)
- [Setup Instructions](#setup-instructions)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)

---

## Overview

The User Management System is a web application that allows administrators to manage users. It provides functionality to:

- View a list of users.
- Add new users.
- Edit existing users.
- Delete users.

### Technologies Used

- **Frontend**: Angular with Angular Material and Bootstrap.
- **Backend**: ASP.NET Core Web API.

---

## Project Structure

### Frontend

- **Framework**: Angular
- **Styling**: Angular Material, Bootstrap

### Backend

- **Framework**: ASP.NET Core Web API

---

## Frontend Documentation

### User Component

- **Path**: `src/app/components/user/user.component.ts`
- **Purpose**: Handles user management functionality (view, add, edit, delete).
- **Key Methods**:
  - `fetchUsers()`: Fetches the list of users from the backend.
  - `openAddUserDialog()`: Opens a dialog to add a new user.
  - `addUser(user: User)`: Sends a POST request to add a new user.
  - `openEditUserDialog(user: User)`: Opens a dialog to edit an existing user.
  - `updateUser(user: User)`: Sends a PUT request to edit an existing user.
  - `deleteUser(user: User)`: Sends a DELETE request to delete a user.
  - `confirmDeleteUser(user: User)`: Opens a confirmation dialog to delete a user.

### HTML Template

- **Path**: `src/app/components/user/user.component.html`
- **Key Features**:
  - **Search Bar**: Allows filtering users by name or email.
  - **Table**: Displays the list of users with columns for name, email, role, and actions.
  - **Actions**: Buttons for editing and deleting users.

### Services

#### User Service

- **Path**: `src/app/services/user/user.service.ts`
- **Purpose**: Handles API calls to the backend for user operations.
- **Key Methods**:
  - `getUsers()`: Fetches the list of users.
  - `createUser(user: User)`: Sends a POST request to add a new user.
  - `updateUser(user: User)`: Sends a PUT request to update an existing user.
  - `deleteUser(id: number)`: Sends a DELETE request to remove a user.

### Global Styles

- **Path**: `src/styles.scss`
- **Purpose**: Defines global styles and includes Angular Material and Bootstrap themes.
- **Key Features**:
  - Uses the Azure-Blue Angular Material theme.
  - Includes Bootstrap for responsive design.

---

## Backend Documentation

### Controllers

#### UsersController

- **Path**: `Controllers/UsersController.cs`
- **Purpose**: Handles API endpoints for user management.
- **Endpoints**:
  - `GET /api/users`: Fetches the list of users.
  - `POST /api/users`: Adds a new user.
  - `PUT /api/users`: Updates an existing user.
  - `DELETE /api/users/{id}`: Deletes a user by ID.

### Models

#### User

- **Path**: `Models/User.cs`
- **Purpose**: Represents the user entity.
- **Fields**:
  - `Id`: Unique identifier for the user.
  - `Name`: Name of the user.
  - `Email`: Email address of the user.
  - `Role`: Role of the user (e.g., Admin, User).

### Services

#### UserService

- **Path**: `Services/UserService.cs`
- **Purpose**: Provides business logic for user operations.
- **Key Methods**:
  - `GetUsersAsync()`: Fetches the list of users.
  - `AddUserAsync(User user)`: Adds a new user.
  - `UpdateUserAsync(User user)`: Updates an existing user.
  - `DeleteUserAsync(int id)`: Deletes a user by ID.

### Repository

- **UserRepository**: Handles database operations for user management.

---

## API Documentation

- **Base URL**: `http://localhost:5211/api/users`

### Endpoints

1. **Get All Users**
   - **Method**: `GET`
   - **URL**: `/api/users`
   - **Response**:
     ```json
     [
       {
         "id": 1,
         "name": "John Doe",
         "email": "john.doe@example.com",
         "role": "Admin"
       }
     ]
     ```

2. **Add a User**
   - **Method**: `POST`
   - **URL**: `/api/users`
   - **Request Body**:
     ```json
     {
       "name": "Jane Doe",
       "email": "jane.doe@example.com",
       "role": "User"
     }
     ```
   - **Response**:
     ```json
     {
       "id": 2,
       "name": "Jane Doe",
       "email": "jane.doe@example.com",
       "role": "User"
     }
     ```

3. **Update a User**
   - **Method**: `PUT`
   - **URL**: `/api/users`
   - **Request Body**:
     ```json
     {
       "id": 2,
       "name": "Jane Doe Updated",
       "email": "jane.doe@example.com",
       "role": "Admin"
     }
     ```
   - **Response**:
     ```json
     {
       "id": 2,
       "name": "Jane Doe Updated",
       "email": "jane.doe@example.com",
       "role": "Admin"
     }
     ```

4. **Delete a User**
   - **Method**: `DELETE`
   - **URL**: `/api/users/{id}`
   - **Response**:
     ```json
     true
     ```

---

## Setup Instructions

### 1. Clone the Repository

```sh
git clone https://github.com/Kabir-Pandya29/User-Management.git
```

---

### Backend Setup

1. **Navigate to the Backend Directory**:
   ```sh
   cd app-backend
   ```

2. **Restore Dependencies**:
   ```sh
   dotnet restore
   ```

3. **Configure the Database**:
   - Ensure the **connection string** in `appsettings.json` is correctly set.

4. **Apply Existing Migrations and Create the Database**:
   ```sh
   dotnet ef database update
   ```

   > **Note**: If you need to reset the database, run:
   ```sh
   dotnet ef database drop --force
   dotnet ef database update
   ```

5. **Run the Backend Server**:
   ```sh
   dotnet run
   ```

---

### Frontend Setup

1. **Navigate to the Frontend Directory**:
   ```sh
   cd ../app-frontend
   ```

2. **Install Dependencies**:
   ```sh
   npm install
   ```

3. **Start the Frontend Server**:
   ```sh
   ng serve
   ```

---

Now your application should be running successfully! 🚀