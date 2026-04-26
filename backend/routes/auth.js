const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

const sign = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: 'Alle velden zijn verplicht.' });
    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(400).json({ message: 'E-mail al in gebruik.' });
    const user = await User.create({ name, email, password });
    res.status(201).json({ token: sign(user.id), user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Serverfout.' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await user.matchPassword(password)))
      return res.status(401).json({ message: 'Ongeldige inloggegevens.' });
    res.json({ token: sign(user.id), user: { id: user.id, name: user.name, email: user.email } });
  } catch {
    res.status(500).json({ message: 'Serverfout.' });
  }
});

module.exports = router;
