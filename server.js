// Import necessary modules
const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

// Set the port from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("MongoDB connected");
    
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1); 
});