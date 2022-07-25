import models from "../models/models.js";
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from "fs";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import ApiError from "../error/ApiError.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

class DeviceController {
    async create(req, res, next) {
        try {
            const {name, price, brandId, typeId, info} = req.body;
            const { img } = req.files
            const fileName = uuidv4() + ".jpg";

            img.mv(path.resolve(__dirname, "../static", fileName));
    
            const device = await models.Device.create({ name, price, brandId, typeId, img: fileName });

            if (info) {
                const jInfo = JSON.parse(info);

                jInfo.forEach(i => 
                    models.DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                );
            }
    
            return res.json(device);

        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

    async getAll(req, res) {
        let {brandId, typeId, limit, page} = req.query;
        page = page || 1; 
        limit = limit || 9;
        let offset = page * limit - limit;

        let devices;

        if (!brandId && !typeId) {
            devices = await models.Device.findAndCountAll({limit, offset});
        }
        if (!brandId && typeId) {
            devices = await models.Device.findAndCountAll({ where: {typeId}, limit, offset} );
        }
        if (brandId && !typeId) {
            devices = await models.Device.findAndCountAll({ where: {brandId}, limit, offset} );
        }
        if (brandId && typeId) {
            devices = await models.Device.findAndCountAll({ where: {brandId, typeId}, limit, offset});
        }

        return res.json(devices);
    }

    async getOne(req, res) {
        const {id}   = req.params;
        const device = await models.Device.findOne(
            {where: {id},
            include: [{model: models.DeviceInfo, as: "info"}]
        }); 

        res.json(device);
    }

    async deleteDevice(req, res) {
        const { id } = req.body;

        const device = await models.Device.findOne({where: {id}})
            .then((result) => models.Device.destroy({where: {id}})
                .then(() => result));

        try {
            fs.unlinkSync(path.resolve(__dirname, "../static", device.img))
        } catch(err) {
            console.error(err)
        }

        return res.json(device);
    }
}

export default new DeviceController;