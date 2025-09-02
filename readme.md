


```markdown
# Onrtech Website

## Overview
The Onrtech Website project consists of two parts:
- **Frontend**: Built with React (Vite).
- **Backend**: Built with Express.js, serving APIs consumed by the frontend.

---

## Project Structure
```

/srv/apps/onrtech_website/  
│── backend/ # Express.js backend  
│── frontend/ # React (Vite) frontend

```

---

## Setup & Installation

### Backend
1. Navigate to backend:
   ```bash
   cd backend
```

2. Install dependencies:
    
    ```bash
    npm install
    ```
    

### Frontend

1. Navigate to frontend:
    
    ```bash
    cd frontend
    ```
    
2. Install dependencies:
    
    ```bash
    npm install
    ```
    

---

## Running the Project

### Backend

- Start the backend:
    
    ```bash
    npm start
    ```
    
- Runs by default on **[http://localhost:5000](http://localhost:5000/)**
    


### Frontend

- Start the frontend (Vite dev server):
    
    ```bash
    npm run dev
    ```
    
- Runs by default on **[http://localhost:5173](http://localhost:5173/)**
    
- Build for production:
    
    ```bash
    npm run build
    ```
    

---

## Environment Variables

### Backend `.env`

```
MongoDB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority&appName=onrtechV0
NODE_ENV=development
JWT_SECRET=your_jwt_secret

# Optional: SMTP configuration
# SMTP_HOST=smtp-mail.outlook.com
EMAIL_USER=your_email
EMAIL_PASS=your_email_password

FRONTEND_URL=http://localhost:5173
```

### Frontend `.env`

```
VITE_APP_API_BASE_URL=http://localhost:5000/api
VITE_APP_CLOUD_NAME=your_cloudinary_name
VITE_APP_UPLOAD_PRESET=onrtech_pf
VITE_APP_GOOGLE_CLIENT_ID=your_google_client_id
VITE_APP_GOOGLE_CLIENT_SECRET=your_google_client_secret
CRYPTR_KEY=mycryptrkey

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

    

---

## Deployment

1. Install backend and frontend dependencies.
    
2. Run backend with `npm start`.
    
3. Build frontend with `npm run build` and serve using **Nginx** or another web server.
    
4. Ensure environment variables are configured correctly for production.
    
