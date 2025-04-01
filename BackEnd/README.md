# FIT5120 Backend Service

This is the backend service for the FIT5120 group project, built with Node.js, Express, and MongoDB Atlas.
To run this backend locally, first clone the repository and navigate to the `BackEnd` directory.
Run `npm install` to install dependencies.
Then, create a `.env` file in the root of the `BackEnd` folder with the following content: `PORT=5000` and `MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/fit5120db?retryWrites=true&w=majority&appName=FIT5120` (replace with actual credentials, ask XUANHUI WU for USERNAME and PASSWORD).
Start the server using `npm run dev` or `node src/index.js`.
If successful, the server will connect to MongoDB Atlas and run on port 5000 and show
"🚀 Server running on port 5000
✅ MongoDB Connected"
The backend exposes RESTful APIs such as `POST /api/screen`(At least now) to receive user screen usage data in JSON format. Make sure your IP is whitelisted in the MongoDB Atlas IP Access List (you can use `0.0.0.0/0` for development).
Do not upload your or my `.env` file to GitHub. For any issues, contact the project maintainer.
