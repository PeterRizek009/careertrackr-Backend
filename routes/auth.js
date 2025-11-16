const express = require('express');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const router = express.Router();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/google', async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ message: "Token missing" });

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();

    const { email, name, picture, sub } = payload;

    const appToken = jwt.sign(
      { userId: sub, email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token: appToken,
      user: { name, email, picture }
    });

  } catch (error) {
    console.error("Google Auth ERROR:", error);
    res.status(401).json({ message: "Invalid Google Token" });
  }
});

module.exports = router;
