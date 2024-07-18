import { Sequelize, UUID } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const {DataTypes} = Sequelize;

const Products = db.define('product', {
    uuid : {
        type: DataTypes.STRING,
        defaultValue : DataTypes.UUIDV4,
        allowNull : false, 
        validate : {
            notEmpty: true
        }

    }, 
    Name : {
        type: DataTypes.STRING,
        allowNull : false, 
        validate : {
            notEmpty: true,
            len : [3,100]

        }

    }, 
    Price: {
        type: DataTypes.INTEGER,
        allowNull : false, 
        validate : {
            notEmpty: true,
        }

    }, 
    Jumlah : {
        type: DataTypes.INTEGER,
        allowNull : false, 
        validate : {
            notEmpty: true,
        }
    },
    userId : {
        type: DataTypes.INTEGER,
        allowNull : false, 
        validate : {
            notEmpty: true,
            

        }

    }, 
    imageurl : {
        type: DataTypes.STRING,
        allowNull : false, 
        validate : {
            notEmpty: true,    
        }

    },

   
}, {
    freezeTableName : true
})

Users.hasMany(Products);
Products.belongsTo(Users, {foreignKey :'userId'})



export default Products;
