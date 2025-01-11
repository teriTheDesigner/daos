# 🎵 Ensemble Management Project

Welcome to the **Ensemble Management Application**, a full-stack project split into two parts:

1. **Backend** - **NestJS** REST API.
2. **Frontend** - **Next.js** application styled with **Tailwind CSS**.

## ✨ Features

- **Create a User Profile:** Set up a personalized user profile.
- **Log in to Your Profile:** Log in to see your information and ensembles you joined.
- **Update Your Profile:** Have you learned to play a new instrument? Great! Simply update your profile.
- **Create Ensembles:** Start a new music ensemble as a logged-in user.
- **Join Ensembles:** Become a member of an ensemble.
- **See Your Ensembles:** View all the ensembles you have joined.
- **Leave Ensembles:** Leave an ensemble at any time.
- **View Ensembles:** Browse through the list of available ensembles.
- **Delete Profile:** If you are not happy with the app, you can delete your profile. This action will also remove you from all ensembles you joined.
- **Secure User Authentication:** JWT-based authentication ensures data security.

## ⚙️ Prerequisites

Before starting, ensure you have the following installed:

- **Node.js** (v18+ recommended)
- **npm** or **yarn**
- **MongoDB**

## Project setup

### Step 1: Clone the Repository

Clone the project repository:

```bash
$ git clone https://github.com/teriTheDesigner/daos.git
$ cd daos
```

### Step 2: Install Backend Dependencies

Navigate to the backend folder and install the dependencies:

```bash
$ cd backend
$ npm install
```

### Step 3: Set up MongoDB

Make sure you have MongoDB running on your local machine.

### Step 4: Compile and run the project

```bash
$ npm run start:dev
```

### Step 5: Check that backend is running

The backend should now be running at [http://localhost:3000](http://localhost:3000).

## User Management

| Method | Endpoint   | Description                                      |
| ------ | ---------- | ------------------------------------------------ |
| POST   | /users     | Create a new user                                |
| GET    | /users     | Get all users                                    |
| PATCH  | /users/:id | Update user profile                              |
| DELETE | /users/:id | Delete a user and remove them from all ensembles |

## Ensemble Management

| Method | Endpoint                             | Description                    |
| ------ | ------------------------------------ | ------------------------------ |
| GET    | /ensembles                           | Get all ensembles              |
| POST   | /ensembles                           | Create a new ensemble          |
| POST   | /ensembles/:id/join                  | Join an ensemble               |
| GET    | /ensembles/:id                       | Get a specific ensemble        |
| DELETE | /ensembles/:userId/leave/:ensembleId | Remove a user from an ensemble |

## Frontend Setup

Now, let's set up the frontend on a different terminal.

### Step 1: Install Frontend Dependencies

Navigate to the frontend folder and install the dependencies:

```bash
$ cd frontend
$ npm install
```

### Step 2: Start the Frontend Server

Run the frontend in development mode:

```bash
$ npm run dev
```

### Step 3: Check that frontend is running

The frontend should now be running at [http://localhost:3001](http://localhost:3001).

## Running Both Backend and Frontend

To run both the backend and frontend servers simultaneously, open two separate terminal windows or tabs:

### Terminal 1 (Backend):

```bash
$ cd backend
$ npm run start:dev
```

### Terminal 2 (Frontend)::

```bash
$ cd frontend
$ npm run dev
```
