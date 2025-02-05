const db = require("../utile/db");

// // sum purchase Detail in year
exports.PurchaseDetailAll = (req, res) => {
    const sqlall = `SELECT 
  p.amount_total,
  p.amount_discount,
  p.amount_pay,
  (p.amount_total - p.amount_pay) AS amoun_di,
  p.pay_date,
  p.create_at
FROM purchase_detail p
GROUP BY p.amount_total, p.amount_discount, p.amount_pay`;
    const sqlyear = `SELECT 
    p.amount_total,
    p.amount_discount,
    p.amount_pay,
    (p.amount_total - p.amount_pay) AS amoun_di,
    p.pay_date,
    p.create_at
FROM purchase_detail p
WHERE YEAR(p.pay_date) = YEAR(CURDATE()) 
`
    db.query(sqlyear, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
}

// chart purchase sum sale in year
exports.PurchaseSale = (req, res) => {
    const sql = `
        SELECT SUM(p.total) AS total_amount, MONTH(p.create_at) AS month 
        FROM purchase p 
        WHERE YEAR(p.create_at) = YEAR(CURDATE()) 
        GROUP BY MONTH(p.create_at)
        ORDER BY MONTH(p.create_at);
    `;
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching purchase details:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json(results);
    });
};


// chart purchase in day on month
exports.PurchaseSaleInDay = (req, res) => {
    const sql = `
      SELECT SUM(p.total) AS total_amount, DAY(p.create_at) AS day,p.create_at
FROM purchase p
WHERE MONTH(p.create_at) = MONTH(CURDATE()) 
GROUP BY DAY(p.create_at)  
ORDER BY DAY(p.create_at);
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching purchase details:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json(results);
    });
};


// sum purchase product in year
exports.PurchaseProduct = (req, res) => {
    const sqlall = `SELECT 
        pro.pro_names, SUM(p.qty) AS total_quantity
    FROM purchase p
    INNER JOIN products pro ON p.product_id = pro.id
    GROUP BY pro.pro_names`;

    const sqlyear = `SELECT 
    pro.pro_names, 
    SUM(p.qty) AS total_quantity,
    p.date_by
FROM purchase p
INNER JOIN products pro ON p.product_id = pro.id
WHERE YEAR(p.date_by) = YEAR(CURDATE())
GROUP BY pro.pro_names;
`;

    db.query(sqlyear, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
};



// CostPrice
exports.CostPrice = (req, res) => {

    const sql = `SELECT 
  SUM(c.price) AS amount_price,
  SUM(c.payment) AS amount_payment
FROM 
  cost c
WHERE 
  YEAR(c.dob) = YEAR(CURDATE());
`;

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
};



// count product CountProduct
exports.CountProduct = (req, res) => {

    const sql = `
    SELECT 
  count(p.pro_names) as count_total
FROM 
  products p
`;

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
};


