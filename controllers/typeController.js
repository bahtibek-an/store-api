import models from "../models/models.js";
import ApiError from "../error/ApiError.js";

class TypeController{
    async create(req, res) {
        const { name } = req.body;
        const type = await models.Type.create({ name })

        return res.json(type)
    }

    async getAll(req, res) {
        const types = await models.Type.findAll();

        return res.json(types);
    }

    async deleteType(req, res) {
        const { id } = req.body;
        

        const type = await models.Type.destroy({ where: {id} });

        return res.json(type);
    }
}

export default new TypeController;