import models from "../models/models.js"

class basketController{
    async create(req, res) {
        const { basketId, deviceId } = req.body;
        const basket = await models.BasketDevice.create({basketId, deviceId});

        return res.json(basket)
        
    }

    async getAll(req, res) {
        const {userId} = req.query;

        const basket = await models.Basket.findAll(
            {where: {userId},
            include: {model: models.BasketDevice}}
        )

        return res.json(basket);
    }
}

export default new basketController;