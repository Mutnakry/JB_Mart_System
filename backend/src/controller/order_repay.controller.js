const db = require("../utile/db");

// show data order
exports.GetAllOrder = (req, res) => {
    const { id } = req.params;
    const sql = `SELECT c.business_names,c.full_names,vp.*,o.*,o.discount as totalDiscount,od.*,od.create_at as date_order FROM \`order\` o
INNER JOIN order_detail od ON od.id = o.order_detail_id
INNER  JOIN v_nameproducts vp ON vp.id = o.product_id
INNER JOIN customer c on c.id = o.customer_id
WHERE o.order_detail_id = ?`;
    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
}


// show data All data order
exports.GetOrder = (req, res) => {
    const { id } = req.params;
    const sql = `SELECT 
    c.business_names,
    c.full_names,
    vp.*, 
    o.*, 
     SUM(o.qty) as totalqty,
    o.discount AS totalDiscount, 
    od.*, 
    od.create_at AS date_order
FROM 
    \`order\` o
INNER JOIN 
    order_detail od ON od.id = o.order_detail_id
INNER JOIN 
    v_nameproducts vp ON vp.id = o.product_id
INNER JOIN 
    customer c ON c.id = o.customer_id
GROUP BY 
    o.order_detail_id
    ORDER BY o.order_detail_id DESC;`;
    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
}