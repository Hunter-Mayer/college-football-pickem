import express from "express";
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
    } catch (err) {
        console.error(err);
        res.status(500).send(`<h1>500 Internal Server Error</h1>`);
    }
}

router.get("/:id", async (req, res) => {
    // find one date by its `id` value
    const dateIds = (await Date.findAll({ attributes: ["id"] })).map(
        (element) => element.dataValues.id
    );
    if (!dateIds.includes(Number(req.params.id))) {
        res.status(400).send(`<h1>400 Bad Request!</h1>
	<h3>Specified id does not exist.</h3>`);
        return;
    }

    try {
        const date = await Date.findByPk(req.params.id);
        res.status(200).json(date).send();
    } catch (err) {
        console.error(err);
        res.status(500).send(`<h1>500 Internal Server Error</h1>`);
    }
})

router.post("/", async (res, req) => {
    try {
        const newDate = await Date.create(req.body);
        res.statusCode(200).json(newDate).send();
    }
})

export default router;
