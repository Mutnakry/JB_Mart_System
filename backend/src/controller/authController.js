
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../utile/db');
// Register user
exports.register = async (req, res) => {
  try {
    const { names, email, pass, rol } = req.body;

    // Check if email already exists
    const emailCheckQuery = 'SELECT user_email FROM users WHERE user_email = ?';
    db.query(emailCheckQuery, [email], async (err, results) => {
      if (err) {
        return res.status(500).send('Error checking email');
      }
      if (results.length > 0) {
        return res.status(400).send('Email already in use');
      }
      const hashedPassword = await bcrypt.hash(pass, 8);
      const insertQuery = 'INSERT INTO users (user_names, user_email, user_pass, user_rol) VALUES (?, ?, ?, ?)';
      db.query(insertQuery, [names, email, hashedPassword, rol], (err, result) => {
        if (err) {
          return res.status(500).send('Error registering user');
        }
        res.status(201).send('User registered successfully');
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error registering user');
  }
};

// Login user
exports.login = (req, res) => {
  const { email, pass } = req.body;

  const query = 'SELECT * FROM users WHERE user_email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      return res.status(500).send('Error logging in');
    }
    if (results.length === 0) {
      return res.status(404).send('User not found');
    }
    const user = results[0];
    const isPasswordValid = bcrypt.compareSync(pass, user.user_pass);

    if (!isPasswordValid) {
      return res.status(401).send('Invalid password');
    }

    const token = jwt.sign(
      { id: user.id, rol: user.user_rol },
      'your_jwt_secret',
      { expiresIn: 86400 }
    );
    res.status(200).send({
      auth: true,
      token,
      user_rol: user.user_rol,
      user_names: user.user_names,
      user_email: user.user_email,
    });
  });
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const { id, names, email, pass, rol } = req.body;

    // Check if user exists
    const userCheckQuery = 'SELECT * FROM users WHERE id = ?';
    
    // Execute the query
    const userResults = await db.query(userCheckQuery, [id]);

    // Assuming userResults is an array of results
    if (userResults.length === 0) {
      return res.status(404).send('User not found');
    }

    // Prepare the update query
    let updateFields = [];
    let updateValues = [];

    if (names) {
      updateFields.push('user_names = ?');
      updateValues.push(names);
    }
    if (email) {
      updateFields.push('user_email = ?');
      updateValues.push(email);
    }
    if (pass) {
      const hashedPassword = await bcrypt.hash(pass, 8);
      updateFields.push('user_pass = ?');
      updateValues.push(hashedPassword);
    }
    if (rol) {
      updateFields.push('user_rol = ?');
      updateValues.push(rol);
    }

    // If no fields to update, return a response
    if (updateFields.length === 0) {
      return res.status(400).send('No fields to update');
    }

    // Combine the fields and values
    const updateQuery = `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`;
    updateValues.push(id);

    // Execute the update query
    await db.query(updateQuery, updateValues);

    res.status(200).send('User updated successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating user');
  }
};


