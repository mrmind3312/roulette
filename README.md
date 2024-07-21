# Documentation for Cloning and Running a Roulette Application

## Overview

This guide provides step-by-step instructions for cloning and running a Nuxt.js application. Follow the instructions to set up the project on your local machine.

## Prerequisites

Ensure you have the following installed on your machine:
- Node.js (version 18.x or later)
- npm (version 10.x or later) or yarn (version 1.x or later)
- Git

## Steps

### 1. Clone the Repository

First, clone the repository from GitHub:

```bash
git clone https://github.com/mrmind3312/roulette.git
```

### 2. Navigate to the Project Directory

Change to the project's directory:

```bash
cd roulette
```

### 3. Install Dependencies

Install the project dependencies using npm or yarn:

```bash
# Using npm
npm install

# Using yarn
yarn install
```

### 4. Create the `.env` File

Create a `.env` file in the root directory of the project with the following contents:

```
NUXT_PORT=5000
NUXT_PUBLIC_API_URL=http://localhost:3000/api/
```

This file sets environment variables needed for the application to run.

### 5. Run the Application

Start the development server:

```bash
# Using npm
npm run dev

# Using yarn
yarn dev
```

The application will start on port 5000 as specified in the `.env` file. You can access it at `http://localhost:5000`.

### Additional Information

- To build the application for production, use the following command:

  ```bash
  # Using npm
  npm run build

  # Using yarn
  yarn build
  ```

- To start the production server, use the following command:

  ```bash
  # Using npm
  npm run start

  # Using yarn
  yarn start
  ```

- For more detailed information on using Nuxt.js, refer to the [Nuxt.js Documentation](https://nuxtjs.org/docs/2.x/get-started/installation).

## Application Features

The purpose of this application is to manage user availabilities and auto-assign them based on service times and user availability by week, day of the week, and hour. Internally, it considers both the month and the day of the month. The key features of this application include:

- **User Availability Management**: Users can define their availability by specifying the days of the week and hours they are available.
- **Service Time Management**: Services can be defined with specific times, and the application will match these times with user availability.
- **Auto-Assignment**: The application automatically assigns users to services based on their availability and the defined service times.
- **Time Consideration**: The system takes into account both the month and the specific day of the month when managing availability and assignments.

By leveraging these features, the application ensures efficient and optimized scheduling of users for various services.

## Conclusion

By following these steps, you should be able to clone and run the Nuxt.js application successfully. If you encounter any issues, refer to the project's README file or the Nuxt.js documentation for further assistance.

---

Feel free to reach out if you have any questions or need further assistance. Happy coding!
