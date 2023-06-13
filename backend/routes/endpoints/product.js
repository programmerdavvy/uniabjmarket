const Product = require("../../models/product");
let routes = (app) => {

	//create a product 

	app.post("/product", async (req, res) => {
		try {
			let product = new Product(req.body)
			res.json({ status: "ok", data: product });
			await product.save();
		}
		catch (err) {
			res.status(500).send(err);
		}
	});

	// get all product

	app.get("/products", async (req, res) => {
		let { q, perPage, page, categoryId, userId } = req.query;
		try {
			if (q) {
				let product = await Product.find({ title: q })
					.populate("user")
				return res.json(product);
			} else if (categoryId) {
				let product = await Product.find({ category: categoryId })
					.populate("user")
				return res.json(product);
			}
			else if (userId) {
				let product = await Product.find({ user: userId })
					.populate("user")
					.populate("category")
				
				return res.json(product);
			}
			else{
				let products = await Product.find()
				.populate("user")
				
				return res.json(products);
			}

		}
		catch (err) {
			res.status(500).send(err)
		}
	});

	// get a single product

	app.get("/products/:id", async (req, res) => {
		try {
			let product = await Product.findOne({ _id: req.params.id })
				.populate("user")
				.populate("category")

			res.json(product);

		}
		catch (err) {
			res.status(500).send(err)
		}
	});

	// update a product
	app.put("/products/:id", async (req, res) => {
		try {
			let product = await Product.updateOne({ _id: req.params.id }, req.body);
			res.json({ status: "ok" });

		}
		catch (err) {
			res.status(500).send(err)
		}
	});

	// delete a product

	app.delete("/products/:id", async (req, res) => {
		try {
			let product = await Product.deleteOne({ _id: req.params.id });
			res.json({ status: "ok" });

		}
		catch (err) {
			res.status(500).send(err)
		}
	});

}
module.exports = routes;