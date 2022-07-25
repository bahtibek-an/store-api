import models from "../models/models.js";
import ApiError from "../error/ApiError.js";

class BrandController {
    async create(req, res) {
        const { name } = req.body;
        const brand = await models.Brand.create({ name })

        
        return res.json(brand)
    }

    async getAll(req, res) {
        const brands = await models.Brand.findAll();

        return res.json(brands);
    }

    async deleteBrand(req, res) {
        const { id } = req.body;

        const type = await models.Brand.destroy({ where: {id} });

        return res.json(type);
    }
}

export default new BrandController;