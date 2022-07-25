import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

export default function(req, res, next) {
    if (req.method === "OPTIONS") {
        next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            res.status(401).json({message: "Not authorized"});
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        req.user = decoded;

        next();
    } catch (error) {
        res.status(401).json({message: "Not authorized"});
    }
}