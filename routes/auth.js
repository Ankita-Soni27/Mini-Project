const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

const db = admin.firestore();

// Signup Route
router.post('/signup', async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
    });

    await db.collection('users').doc(userRecord.uid).set({
      name: name,
      email: email,
    });

    res.status(201).json({ message: 'User created successfully', uid: userRecord.uid });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    // Implement your own logic for verifying the password
    // For simplicity, we are not checking the password here
    // In a real application, you should use a library like bcrypt to hash and compare passwords
    res.status(200).json({ message: 'Login successful', uid: userRecord.uid });
  } catch (error) {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

module.exports = router;
