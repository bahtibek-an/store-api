import ApiError from "../error/ApiError.js";
import bcrypt from "bcrypt";
import models from "../models/models.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: "10m"},
        );
}

class UserController {
    async sign_up(req, res, next) {
        const {email, password, role} = req.body;

        if ( !(email || password) ) {
            next(ApiError.badRequest("Wrong password or login"));
        }

        const candidate = await models.User.findOne({where:{email}});

        if (candidate) {
            next(ApiError.badRequest("User with this name already exists"));
        }

        const hashPassword = await bcrypt.hash(password, 5);

        const user   = await models.User.create({email, password: hashPassword, role});
        const basket = await models.Basket.create({userId: user.id});

        const token = generateJwt(user.id, user.email, user.role);

        return res.json({token});
    }

    async sign_in(req, res, next) {
        const {email, password} = req.body;

        const user = await models.User.findOne({where: {email}});

        if (!user) {
            return next(ApiError.badRequest("User not found"));
        }

        const comparePassword = bcrypt.compareSync(password, user.password);

        if (!comparePassword) {
            return next(ApiError.badRequest("User not found"));
        }

        const token = generateJwt(user.id, user.email, user.role);

        return res.json({token});
    }

    async allUsers(req, res) {
        const users = await models.User.findAll();

        return res.json(users);
    }

    async deleteUser(req, res) {
        const { id } = req.body;

        const user = await models.User.destroy({where: {id}});

        return res.json(user);
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role);

        return res.json({token});
    }
}

export default new UserController;