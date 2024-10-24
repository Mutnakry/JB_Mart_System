const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const db = require('./src/utile/db'); // Your database utility file
const app = express();
const port = 6700;
const path = require('path');

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

// Import and use the brandsRoutes routes
const brandsRoutes = require('./src/route/brands.router');
app.use('/api/brands', brandsRoutes); 

// Import and use the unit routes
const UnitRoutes = require('./src/route/unit.router');
app.use('/api/unit', UnitRoutes); 

// Import and use the BankAount routes
const BankRoutes = require('./src/route/bank.router');
app.use('/api/bank', BankRoutes); 

// Import and use the account routes
const AccountRoutes = require('./src/route/account.router');
app.use('/api/account', AccountRoutes); 

// Import and use the cost routes
const CostRoutes = require('./src/route/cost.router');
app.use('/api/cost', CostRoutes); 
// Import and use the costtype routes
const CostTypeRoutes = require('./src/route/costtype.router');
app.use('/api/cost_type', CostTypeRoutes); 


// Import and use the group_customer routes
const Group_Customer_Routes = require('./src/route/group_customer.router');
app.use('/api/group_customer', Group_Customer_Routes); 

// Import and use the customer routes
const Customer_Routes = require('./src/route/customer.router');
app.use('/api/customer', Customer_Routes); 

// Import and use the BankAount routes
const Supplier_Routes = require('./src/route/supplier.router');
app.use('/api/supplier', Supplier_Routes); 


// Import and use the product routes
const Product_Routes = require('./src/route/product.router');
app.use('/api/product', Product_Routes); 
// get image static files show in front end
app.use('/image', express.static(path.join(__dirname, './src/public/image')));


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
