import express from "express";
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) { // eslint-disable-line no-unused-vars
	res.render("index", { title: "Express" });
});

export default router;
