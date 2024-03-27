module.exports = (app) => {
    const employee = require('../controllers/employee.controller')

    const router = require('express').Router();

    //Retrive all employee with setting
    router.get("/", employee.findAll)
    //Insert data to employee with setting
    router.post("/create-employee-setting", employee.create);
    //Add employees to projects
    router.post("/create-employee-project", employee.addEmployeeToProject);
    //Retrive an employee with setting
    router.get("/edit-employee/:id", employee.findOne);
    //Update an employee with id
    router.put("/update-employee/:id", employee.update);
    //Delele an employee with id
    router.delete("/delete-employee/:id", employee.delete);

    app.use("/employees", router);  
};