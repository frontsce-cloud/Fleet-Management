const express = require('express');
const router = express.Router();

// Import route modules
const gpsRoutes = require('./gps');
const vehicleRoutes = require('./vehicles');
const convoyRoutes = require('./convoys');

// Mount routes
router.use('/gps', gpsRoutes);
router.use('/vehicles', vehicleRoutes);
router.use('/convoys', convoyRoutes);

module.exports = router;