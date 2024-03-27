const { project } = require('../models');

module.exports = (app) => {
    const project = require('../controllers/project.controller')

    const router = require('express').Router();

    //Retrive all employee with setting
    router.get("/", project.findAll)
    // //Insert data to employee with setting
    // router.post("/create-employee-setting", employee.create);
    // //Retrive an employee with setting
    // router.get("/edit-employee/:id", employee.findOne);
    // //Update an employee with id
    // router.put("/update-employee/:id", employee.update);
    // //Delele an employee with id
    // router.delete("/delete-employee/:id", employee.delete);

    app.use("/projects", router);  
};