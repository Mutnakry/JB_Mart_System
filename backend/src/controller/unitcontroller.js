const db = require("../utile/db");

// show data unit
exports.GetAll = (req, res) => {
    const sql = "SELECT * FROM unit";
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
}


// get data to frontend ->  in backend
exports.GetAllData = (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const searchQuery = req.query.search_query || "";
    const offset = (page - 1) * limit;
  
    // Query to get the total number of items that match the search query
    const countQuery = `
        SELECT COUNT(*) AS total 
        FROM unit 
        WHERE names LIKE ?
    `;
    db.query(countQuery, [`%${searchQuery}%`], (err, results) => {
        if (err) {
            console.error('Error fetching count:', err);
            return res.status(500).json({ error: 'Database query error' });
        }
  
        const totalCategory = results[0].total;
        const totalPages = Math.ceil(totalCategory / limit);
  
        // Query to get the paginated and filtered data
        const selectQuery = `
            SELECT * 
            FROM unit 
            WHERE names LIKE ?
            ORDER BY id DESC
            LIMIT ? OFFSET ?
        `;
        db.query(selectQuery, [`%${searchQuery}%`, limit, offset], (err, results) => {
            if (err) {
                console.error('Error fetching data:', err);
                return res.status(500).json({ error: 'Database query error' });
            }
            res.json({
                unit: results,
                totalPages,
                currentPage: page,
                totalCategory,
            });
        });
    });
  };
  

// Create data unit
exports.Create = (req, res) => {
    const {names,description}=req.body;
    const sql = "INSERT INTO unit (names,description) VALUES (?,?)";
    db.query(sql,[names,description], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
}

// update data unit
exports.Update = (req, res) => {
    const {id} = req.params;
    const {names,description}=req.body;
    const sql = "UPDATE unit set names=?,description=? where id=?";
    db.query(sql,[names,description,id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
}

// GEt Data Single unit
exports.GetSingle = (req, res) => {
    const {id} = req.params;
    const sql = "SELECT * From unit  where id=?";
    db.query(sql,[id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
}

// DElete unit
exports.Delete = (req, res) => {
    const {id} = req.params;
    const sql = "Delete from unit  where id=?";
    db.query(sql,[id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
}