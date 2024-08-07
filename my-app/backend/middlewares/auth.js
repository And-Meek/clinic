const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../consts");

async function auth(req, res, next) {
	const token = await req.cookies.token;

	try {
		const verifyResult = await jwt.verify(token, JWT_SECRET);

		next();
	} catch (e) {
		console.log(e);
		res.json({ error: e.message });
	}
}

module.exports = auth;
