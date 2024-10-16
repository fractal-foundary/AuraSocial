const express = require('express');
const axios = (...args) =>
	import('axios').then(({ default: axios }) => axios(...args));

const router = express.Router();

router.post('/api/users/register', async (req, res) => {
	const { username, first_name, last_name, email } = req.body;

	const body = {
		username,
		first_name,
		last_name,
		email,
	};

	try {
		const apiRes = await axios.post("/api/users/register", body, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
		});

		const data = await apiRes.json();

		return res.status(apiRes.status).json(data);
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			error: 'Something went wrong when registering account',
		});
	}
});

module.exports = router;
