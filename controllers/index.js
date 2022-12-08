<<<<<<< HEAD
import express from "express";
const router = express.Router();
import apiRoutes from "./api";
import homeRoutes from "./homeRoutes";
=======
const router = require("express").Router();

const apiRoutes = require('./api');
const viewRoutes = require('./viewRoutes');
>>>>>>> dev

router.use('/', viewRoutes);
router.use('/api', apiRoutes);

export default router;
