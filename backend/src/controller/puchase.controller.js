const db = require("../utile/db");



exports.CreatePurchase = async (req, res) => {
    try {
      const { customerId, products } = req.body;

      let customerIdFromDB = customerId;
      if (!customerId) {
        const {paymenttype_id, account_id, amount_total, amount_discount, amount_pay, pay_date} = req.body;
        const sqlCustomer = "INSERT INTO `purchase_detail` (paymenttype_id,account_id,amount_total,amount_discount,amount_pay,pay_date) VALUES (?,?,?,?,?,?)";
        const customerValues = [paymenttype_id, account_id, amount_total, amount_discount, amount_pay, pay_date];
        const [customerResult] = await db.promise().query(sqlCustomer, customerValues);
        customerIdFromDB = customerResult.insertId;
      }
  
      // Calculate total and insert orders
      for (const product of products) {
        const { supplier_id, product_id, date_by, qty, discount, cost_price, included_tax, excluded_tax, total, status, expiry, user_at } = product;
  
        // Insert order details into the 'order' table
        const sqlOrder = "INSERT INTO `purchase` (supplier_id,product_id,purchasedetail_id,date_by,qty,discount,cost_price,included_tax,excluded_tax,total,status,expiry, user_at) VALUES (?, ?, ?, ?, ?,?,?, ?, ?, ?, ?,?,?)";
        const orderValues = [supplier_id, product_id,customerIdFromDB, date_by, qty, discount, cost_price, included_tax, excluded_tax, total, status, expiry, user_at];
        await db.promise().query(sqlOrder, orderValues);
      }
  
      // Respond with success message
      res.status(201).json({ message: 'Order created successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while creating the order' });
    }
  };
