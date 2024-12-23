const db = require("../utile/db");

// show data supplier
exports.GetAll = (req, res) => {
    const sql = "SELECT * FROM supplier";
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
}

// get data to frontend ->  in backend
exports.GetAllsupplier = (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const searchQuery = req.query.search_query || "";
    const offset = (page - 1) * limit;
  
    // Query to get the total number of items that match the search query
    const countQuery = `
        SELECT COUNT(*) AS total 
        FROM supplier 
        WHERE full_names LIKE ? OR business_names LIKE ?
    `;
    db.query(countQuery, [`%${searchQuery}%`, `%${searchQuery}%`], (err, results) => {
        if (err) {
            console.error('Error fetching count:', err);
            return res.status(500).json({ error: 'Database query error' });
        }
        const totalCategory = results[0].total;
        const totalPages = Math.ceil(totalCategory / limit);
  
        // Query to get the paginated and filtered data
        const selectQuery = `
            SELECT *
            FROM supplier 
            WHERE full_names LIKE ? OR business_names LIKE ?
            ORDER BY supplier.id DESC
            LIMIT ? OFFSET ?
        `;
        db.query(selectQuery, [`%${searchQuery}%`, `%${searchQuery}%`, limit, offset], (err, results) => {
            if (err) {
                console.error('Error fetching data:', err);
                return res.status(500).json({ error: 'Database query error' });
            }
            res.json({
                supplier: results,
                totalPages,
                currentPage: page,
                totalCategory,
            });
        });
    });
};

// Create data Category
exports.Create = (req, res) => {
    const {contect_type,contect_phone,mobile_phone,business_names,full_names,half_names,description,email,user_at}=req.body;
    const sql = "INSERT INTO supplier (contect_type,contect_phone,mobile_phone,business_names,full_names,half_names,description,email,user_at) VALUES (?,?,?,?,?,?,?,?,?)";
    db.query(sql,[contect_type,contect_phone,mobile_phone,business_names,full_names,half_names,description,email,user_at], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
}

// update data supplier
exports.Update = (req, res) => {
    const {id} = req.params;
    const {contect_type,contect_phone,mobile_phone,business_names,full_names,half_names,description,email,user_at}=req.body;
    const sql = "UPDATE supplier set contect_type=?,contect_phone=?,mobile_phone=?,business_names=?,full_names=?,half_names=?,description=?,email=?,user_update=? where id=?";
    db.query(sql,[contect_type,contect_phone,mobile_phone,business_names,full_names,half_names,description,email,user_at,id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
}

// GEt Data Single supplier
exports.GetSingle = (req, res) => {
    const {id} = req.params;
    const sql = "SELECT * From supplier  where id=?";
    db.query(sql,[id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
}

// DElete supplier
exports.Delete = (req, res) => {
    const {id} = req.params;
    const sql = "Delete from supplier  where id=?";
    db.query(sql,[id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
}