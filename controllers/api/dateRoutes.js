import express from "express";
import { Sequelize } from "sequelize";
const router = express.Router();
import { Date } from "../../models";

router.get("/"), async (res, req) => {
    try {
        const allDates = await Date.findAll();
        if (allDates.length === 0) {
			res.status(404).send(`<h1>404 Data Not Found!</h1>
	<h3>No Dates Available</h3>`);
			return;
		}
        res.status(200).json(allDates).send();
    } catch(err) {
        console.error(err);
		res.status(500).send(`<h1>500 Internal Server Error</h1>`);
    }
}

router.post("/", async (res, req) => {
    try {
        const newDate = await Date.create(req.body);
        res.statusCode(200).json(newDate).send();
    }
})

export default router;
