import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

export default function(role) {
    return function(req, res, next) {
        if (req.method === "OPTIONS") {
            next();
        }
    
        try {
            const token = req.headers.authorization.split(' ')[1];
    
            if (!token) {
                res.status(401).json({message: "Not authorized"});
            }
    
            const decoded = jwt.verify(token, process.env.SECRET_KEY);

            if (decoded.role !== role) {
                res.status(401).json({message: "No access"});
            }
    
            req.user = decoded;
    
            next();
        } catch (error) {
            res.status(401).json({message: "Not authorized"});
        }
    }
}


