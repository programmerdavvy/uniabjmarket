const Account = require("../../models/user");
const nodemailer = require("nodemailer");
const dotenv = require('dotenv').config()
let routes = (app) => {
	// create a user
	app.post("/register", async (req, res) => {
		const { username, phone, password } = req.body;
		if (!username || typeof username !== "string") {
			return res.json({ status: "error", error: "Invalid Username" })
		}
		if (!password || !username || !phone) {
			return res.json({ status: "error", error: "Fill in your Details" })
		}
		if (!password || typeof password !== "string") {
			return res.json({ status: "error", error: "Invalid Password" })
		}
		if (password.length < 4) {
			return res.json({ status: "error", error: "Password length too short, should be at least  4 character" })
		}

		try {
			let account = new Account(req.body)
			await account.save();
			res.json({ status: "ok", data: account });
		}
		catch (error) {
			if (error.code == 11000) {
				console.log(error.message)
				return res.json({ status: "error", error: "Username or Phone Number  already in use" })
			}
			res.status(500).send(error)
		}
	});

	// get all users
	app.get("/users", async (req, res) => {
		let { q, perPage, page, userId } = req.query;

		try {
			if (q) {
				let accounts = await Account.find({ username: q })
				return res.json(accounts);
			}else{
				let accounts = await Account.find();
				return res.json(accounts);
			}
		}
		catch (err) {
			res.status(500).send(err)
		}
	})

	// login a user
	app.post("/login", async (req, res) => {
		try {
			let { username, password } = req.body;
			let account = await Account.findOne({ username, password });
			if (!account) return res.json({ status: "error", error: "Invalid username or password" });
			account.active = "true"
			await account.save();
			res.json({ status: "ok", data: account })

		}
		catch (err) {
			res.status(500).send(err);
		}
	});

	// update a user
	app.put("/users/:id", async (req, res) => {
		try {
			let account = await Account.updateOne({ _id: req.params.id }, req.body);
			res.json({ status: 'ok' });

		}
		catch (err) {
			res.status(500).send(err)
		}
	});

	// get a single user
	app.get("/users/:id", async (req, res) => {
		try {
			let account = await Account.findOne({ _id: req.params.id })
			res.json(account);

		}
		catch (err) {
			res.status(500).send(err)
		}
	});

	// delete a single user
	app.delete("/users/:id", async (req, res) => {
		try {
			let account = await Account.deleteOne({ _id: req.params.id });
			res.json(account);

		}
		catch (err) {
			res.status(500).send(err)
		}
	});
// forgot-password
app.post("/forgot-password", async (req, res) => {
	const {email,user} = req.body;
	try {
		let user = await Account.findOne({ email: email });
	if(user){
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
			  user: process.env.EMAILUSER, // generated ethereal user
			  pass: process.env.EMAILPASSWORD, // generated ethereal password
			},
		  });
		  
		  const mailOptions = {
			from: process.env.EMAILUSER,
			to: email,
			subject: `Reset Password Link`,
			html: `<div style="padding:20px;background-color:#fff;border-radius:5px;text-capitalise:sentence-case">
					<div>
					<h5>Hey ${user.username}</h5>
					<p>
					You request to reset password was received from your uniAbjMarket Account -${email}
					</p>
					<p>Use this link to reset your password and login.</p>
					<a href='http://localhost:3000/reset-password/?id=${user._id}' target='_blank'>http://localhost:3000/reset-password</a>

					<br/>
					<button style="padding:10px; background-color:#7367f;c olor:#fff; text-decoration:none;font-weight:600;font-size:14px;">
					<a href='http://localhost:3000/reset-password target='_blank'>Reset Password</a>
					</button>

					<br/>
					<p>Thanks,</p>
					<p>The Management.</p>

					</div>
			</div>`
		  };
		  
		  transporter.sendMail(mailOptions, function(error, info){
			if (error) {
		   console.log(error);
		   res.json({ message: "failed to send mail", status:'false' });

			} else {
			  console.log('Email sent: ');
			  res.json({ message: "mail sent! kindly check your mail", status:'ok' });
			  // do something useful
			}
		  });
	}	else{
		res.json({ message: "account not found! kindly check your mail and try again later ", status:'false' });

	}	
	
	  

	}
	catch (err) {
		res.status(500).send(err)
	}
});
}
module.exports = routes;