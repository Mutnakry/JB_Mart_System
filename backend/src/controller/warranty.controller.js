const db = require("../utile/db");

// show data GetAllWarranty
exports.GetAllWarranty = (req, res) => {
    const sql = "SELECT * FROM warranty";
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
}


exports.CreateWarranty = (req, res) => {
    const { product_id, duration, type, description } = req.body;
    const sql = "INSERT INTO warranty (product_id, duration, type, description) VALUES (?, ?, ?, ?)";
    
    db.query(sql, [product_id, duration, type, description], (err, results) => {
        if (err) {
            console.error("Database error:", err); // Log the error for debugging
            return res.status(500).json({ error: "Database error", details: err });
        }
        res.status(201).json({ message: "Warranty created successfully", data: results });
    });
};

