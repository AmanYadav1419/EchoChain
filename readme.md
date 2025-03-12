# Echochain

Welcome to the Echochain project! This repository contains three main folders: `frontend`, `backend`, and `contract`. Follow the instructions below to set up and run the project.

## Prerequisites

Make sure you have the following installed on your machine:

- Node.js (v16 or higher)
- npm (v8 or higher)
- Hardhat (for smart contract development)

## Installation

1. Clone the repository:

```sh
git clone https://github.com/your-username/echochain.git
cd echochain
```

2. Install dependencies for each folder:

### Backend

```sh
cd backend
npm install
```

### Contract

```sh
cd ../contract
npm install
```

### Frontend

```sh
cd ../frontend
npm install
```

## Setup

### Backend

1. Create a `.env` file in the `backend` folder and add the necessary environment variables:

```
MONGO_URI=your_mongodb_uri
CLOUDINARY_URL=your_cloudinary_url
```

2. Run the backend server:

```sh
npm run dev
```

### Contract

1. Create a `.env` file in the `contract` folder and add the necessary environment variables:

```
PRIVATE_KEY=your_private_key
INFURA_PROJECT_ID=your_infura_project_id
```

2. Compile the smart contracts:

```sh
npx hardhat compile
```

3. Deploy the smart contracts:

```sh
npx hardhat run scripts/deploy.js --network your_network
```

### Frontend

1. Create a `.env.local` file in the `frontend` folder and add the necessary environment variables:

```
VITE_API_URL=your_backend_api_url
```

2. Run the frontend development server:

```sh
npm run dev
```

## Usage

- The backend server will be running on `http://localhost:5000`.
- The frontend development server will be running on `http://localhost:3000`.

## Features to Implement

- **Buy Music**: Implement functionality for users to purchase music tracks or albums.
- **Sell Music**: Implement functionality for artists to sell their music on the platform.
- **Chat Feature with Artist**: Implement a chat feature that allows users to communicate with artists directly.

## Contributing# Echochain






This project is licensed under the ISC License.## LicenseFeel free to open issues or submit pull requests if you have any improvements or bug fixes.
Welcome to the Echochain project! This repository contains three main folders: `frontend`, `backend`, and `contract`. Follow the instructions below to set up and run the project.

## Prerequisites

Make sure you have the following installed on your machine:

- Node.js (v16 or higher)
- npm (v8 or higher)
- Hardhat (for smart contract development)

## Installation

1. Clone the repository:

```sh
git clone https://github.com/your-username/echochain.git
cd echochain
```

2. Install dependencies for each folder:

### Backend

```sh
cd backend
npm install
```

### Contract

```sh
cd ../contract
npm install
```

### Frontend

```sh
cd ../frontend
npm install
```

## Setup

### Backend

1. Create a `.env` file in the `backend` folder and add the necessary environment variables:

```
MONGO_URI=your_mongodb_uri
CLOUDINARY_URL=your_cloudinary_url
```

2. Run the backend server:

```sh
cd backend
npm run dev
```

### Contract

1. Create a `.env` file in the `contract` folder and add the necessary environment variables:

```
PRIVATE_KEY=your_private_key
INFURA_PROJECT_ID=your_infura_project_id
```

2. Compile the smart contracts:

```sh
npx hardhat compile
```

3. Deploy the smart contracts:

```sh
npx hardhat run scripts/deploy.js --network your_network
```

### Frontend

1. Create a `.env.local` file in the `frontend` folder and add the necessary environment variables:

```
VITE_API_URL=your_backend_api_url
```

2. Run the frontend development server:

```sh
cd frontend
npm run dev
```

## Usage

- The backend server will be running on `http://localhost:5000`.
- The frontend development server will be running on `http://localhost:5173`.

## Features to Implement

- **Buy Music**: Implement functionality for users to purchase music tracks or albums.
- **Sell Music**: Implement functionality for artists to sell their music on the platform.
- **Chat Feature with Artist**: Implement a chat feature that allows users to communicate with artists directly.

## Contributing

Feel free to open issues or submit pull requests if you have any improvements or bug fixes.

## License

This project is licensed under the ISC License.