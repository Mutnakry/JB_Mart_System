const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const db = require('./src/utile/db'); // Your database utility file
const app = express();
const port = 6700;

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors()); // Middleware to handle CORS

// Connect to the database
db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});
// Import and use the authentication routes
const authRoutes = require('./src/route/authRoute');
app.use('/api/auth', authRoutes);


// Import and use the category routes
const categoryRoutes = require('./src/route/category.route');
app.use('/categories', categoryRoutes); 



// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
