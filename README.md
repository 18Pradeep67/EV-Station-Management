# EV Charging Station Management App

A full-stack web application to manage EV charging stations. Built with **Node.js**, **Express**, **MongoDB**, and **Vue.js**, deployed on the cloud using **Render**.

---

## Live Demo

- **Frontend:** [https://ev-station-management-ueig.onrender.com](https://ev-station-management-ueig.onrender.com)  
- **Backend API:** [https://ev-station-management-backend.onrender.com](https://ev-station-management-backend.onrender.com)

---


##  Features

### User Authentication
- User Signup
- Login with JWT token generation
- Protected routes to manage charging stations a

### Charging Station Management (CRUD)
- Create new charging stations
- View a list of all chargers
- Update charger details
- Delete a charger
- Fields include:
  - Name
  - Location (Latitude & Longitude)
  - Status (Active/Inactive)
  - Power Output (kW)
  - Connector Type

### Frontend UI (Vue.js)
- Login screen
- Charger listing with filters:
  - Status
  - Power output
  - Connector type
- Charger Add/Edit/Delete capabilities
- Map view to display charger locations using Google Maps/OpenStreetMap

### Deployment
- Backend and frontend deployed to the cloud using **Render**
- Public REST API for interaction also deployed to the cloud using **Render**

### Environment Variables in Backend
- PORT=5000
- MONGO_URI=your_mongodb_connection_string
- JWT_SECRET=your_secret_key
- SALT=<any_number>
- JWT_EXPIRES_IN=<any_number>h

## To run the project locally
- Clone the github repository using
  ``` git clone https://github.com/18Pradeep67/EV-Station-Management.git```
### Frontend Setup
- ```cd Frontend```
- ```npm install```
- Create .env file in /frontend with:
- ```VITE_API_URL=https://your-backend-api-url.com```
- ```npm run dev```

### Backend Setup
- ```cd Backend```
- ``` npm install```
- Create a .env file with the environment variables mentioned above
- ``` npm start```

### API Endpoints
| Method | Endpoint           | Description       |
| ------ | ------------------ | ----------------- |
| POST   | /api/v1/signup | User signup       |
| POST   | /api/v1/login    | User login (JWT)  |
| GET    | /api/v1/allChargingStations      | List all chargers |
| POST   | /api/v1/addChargingStation      | Add new charger   |
| PUT    | /api/v1/updateChargingStation/\:name | Update charger    |
| DELETE | /api/v1/deleteChargingStation/\:name | Delete charger    |



