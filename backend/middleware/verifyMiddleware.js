const jwt = require('jsonwebtoken');

const verify = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        res.status(200).json({ authorisation: false });
    }
    else {
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                res.status(200).json({ authorisation: false });
            } else {
                req._id = decoded._id;
                next();
            }
        })
    }
}

module.exports = verify;