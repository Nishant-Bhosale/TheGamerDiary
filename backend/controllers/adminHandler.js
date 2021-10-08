const adminProfileModel = require('../models/adminProfile');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const adminHandler = async (req, res) => {
    const { email, password } = req.body;
    const match = await adminProfileModel.findOne({ email: email })
    if (match) {
        try {
            if (await bcrypt.compare(password, match.password)) {
                const token = jwt.sign({ _id: match._id }, process.env.SECRET_KEY, {
                    expiresIn: (60 * 60 * 24)
                })
                res.status(200).json({ authentication: true, jwtToken: token, message: 'Login Success' })
            } else {
                res.status(404).send()
            }

        } catch (err) {
            console.log(err)
            res.status(500).send();
        }
    } else {
        res.status(404).send()
    }
}
module.exports = adminHandler;