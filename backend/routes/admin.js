const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');

// Create a new admin
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newAdmin = new Admin({ name, email, password });
    await newAdmin.save();
    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
