import express from "express";
import dotenv from "dotenv";
import sequelize from "./db.js";
import cors from "cors";
import models from "./models/models.js";
import router from "./routes/index.js";
import fileUpload from "express-fileupload";
import errorHandler from "./middleware/ErrorHandlingMiddleware.js";
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config();
const PORT = process.env.PORT ?? 8080;

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload({}));
app.use(express.static(path.resolve(__dirname, "static")));
app.use("/api", router);

app.get("/", (req, res) => {
    res.json({message: "work"});
});


app.use(errorHandler);

(async () => {
    try {
        await sequelize.authenticate(); // connection to database
        // await sequelize.sync();         // create the table if doesn't exist
        app.listen(PORT, () => {
            console.log(`Server has been started on PORT ${PORT}`);
        })
    } catch (e) {
        console.log(e);
    }
})()