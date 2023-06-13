const Category = require("../../models/category");
let routes = (app) => {
	// CREATE ADMIN
	app.post("/category", async (req, res) => {
		try {
			let category = new Category(req.body)
			await category.save();
			res.json(category);
		}
		catch (error) {
			if (error.code == 11000) {
				return res.json({ status: "error", error: "category name already taken" })
			}
		}
	});
	// get all users
	app.get("/category", async (req, res) => {
		try {
			let category = await Category.find();
			res.json(category);
		}
		catch (err) {
			res.status(500).send(err)
		} 
	})

}
module.exports = routes;