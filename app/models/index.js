const config = require("../config/db.js");

const DataType = require("sequelize");
const sequelize = new DataType(
    config.DB, 
    config.USER, 
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        pool:{
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    } 
);

const db = {};
db.DataType = DataType;
db.sequelize = sequelize;

db.employee = require("../models/employee.model.js")(sequelize, DataType);
db.setting = require("../models/setting.model.js")(sequelize, DataType);
db.company = require("../models/company.model.js")(sequelize, DataType);
db.project = require("../models/project.model.js")(sequelize, DataType);
db.employee_project = require("../models/employee_project.model.js")(sequelize, DataType);


//One to One
db.employee.hasOne(db.setting, {
    onDelete: 'CASCADE'
});
db.setting.belongsTo(db.employee);

//One to Many
db.company.hasMany(db.employee, {
    onDelete: 'CASCADE'
});
db.employee.belongsTo(db.company)

//Many to Many
db.employee.belongsToMany(db.project, {
    through: "Employee_project",
    onDelete: 'CASCADE'
});
db.project.belongsToMany(db.employee, {
    through: "Employee_project",
    onDelete: 'CASCADE'
});

module.exports = db;