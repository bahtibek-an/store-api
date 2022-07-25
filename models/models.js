import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const User = sequelize.define("user", { // User
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
    email: {type: DataTypes.STRING, unique: true, },
    password: {type: DataTypes.STRING, },
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Basket = sequelize.define("basket", { // main Basket
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
})

const BasketDevice = sequelize.define("basket_device", { // basket with link to Main basket and Device
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
})

const Device = sequelize.define("device", { // products in store
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
    name: {type: DataTypes.STRING, unique: true, allowNull: false, },
    price: {type: DataTypes.STRING, allowNull: false, },
    rating: {type: DataTypes.INTEGER, defaultValue: 0, },
    img: {type: DataTypes.STRING, allowNull: false, }
})

const Type = sequelize.define("type", { // type of devices, phones, fridges or etc 
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
    name: {type: DataTypes.STRING, unique: false, allowNull: false, }
})

const Brand = sequelize.define("brand", { // brand of devices, Samsung, Iphone or etc
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
    name: {type: DataTypes.STRING, unique: true, allowNull: false, }
})

const Rating = sequelize.define("rating", { // Rating
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
    rate: {type: DataTypes.INTEGER, }
})

const DeviceInfo = sequelize.define("device_info", { // additional information about device
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
    title: {type: DataTypes.STRING, allowNull: false, },
    description: {type: DataTypes.STRING, allowNull: false, },
})

const TypeBrand = sequelize.define("type_brand", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
})

User.hasOne(Basket);            // relationship between User And Basket one to one
Basket.belongsTo(User);         // Basket belongs to User

User.hasMany(Rating);           // relationship between User And Rating one to several
Rating.belongsTo(User);         // Rating belongs to User

Basket.hasMany(BasketDevice);   // relationship between Basket And BasketDevice one to several
BasketDevice.belongsTo(Basket); // BasketDevice belongs to Basket

Type.hasMany(Device);           // relationship between Type And Device one to several
Device.belongsTo(Type);         // Device belongs to Type

Brand.hasMany(Device);          // relationship between Brand And Device one to several
Device.belongsTo(Brand);        // Device belongs to Brand

Device.hasMany(Rating);         // relationship between Device And Rating one to several
Rating.belongsTo(Device);       // Rating belongs to Device

Device.hasMany(BasketDevice);   // relationship between Device And Rating one to several
BasketDevice.belongsTo(Device); // BasketDevice belongs to Device

Device.hasMany(DeviceInfo, {as: "info"});     // relationship between Device And DeviceInfo one to several
DeviceInfo.belongsTo(Device);   // DeviceInfo belongs to Device

Type.belongsToMany(Brand, {through: TypeBrand});      // relationship between Type And Brand several to several
Brand.belongsToMany(Type, {through: TypeBrand});      // relationship between Brand And Type several to several


export default {
    User,
    Basket,
    BasketDevice,
    Device,
    Type,
    Brand,
    Rating,
    DeviceInfo,
    TypeBrand
}




