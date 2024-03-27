const { company } = require('../models');

module.exports = (app) => {
    const company = require('../controllers/company.controller')

    const router = require('express').Router();

    //Retrive all employee with setting
    router.get("/", company.findAll)
    // //Insert data to employee with setting
    // router.post("/create-employee-setting", employee.create);
    // //Retrive an employee with setting
    // router.get("/edit-employee/:id", employee.findOne);
    // //Update an employee with id
    // router.put("/update-employee/:id", employee.update);
    // //Delele an employee with id
    // router.delete("/delete-employee/:id", employee.delete);

    app.use("/companies", router);  
};