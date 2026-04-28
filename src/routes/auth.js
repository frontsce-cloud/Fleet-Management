const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/database');
const logger = require('../utils/logger');

const router = express.Router();

// 🚨 AUTHENTICATION BYPASSED FOR DEVELOPMENT 🚨
// All auth routes return success without validation
// TODO: Re-enable proper authentication later

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

// REGISTER - TEMPORARILY BYPASSED FOR DEVELOPMENT
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  // TEMPORARY BYPASS - Always return success
  console.log("🔓 AUTH BYPASSED - Register attempt:", email);
  res.json({
    message: "User created (bypassed)",
    user: { id: Date.now(), email: email || "dev@example.com" }
  });
});

// LOGIN - TEMPORARILY BYPASSED FOR DEVELOPMENT
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // TEMPORARY BYPASS - Always return success
  console.log("🔓 AUTH BYPASSED - Login attempt:", email);
  res.json({
    token: "dev-bypass-token",
    user: { id: 1, email: email || "dev@example.com" }
  });
});

module.exports = router;
