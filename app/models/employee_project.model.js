module.exports = (sequelize, Datatype) => {
    const db = require("../models");
    const employee = db.employee;
    const project = db.project;

    const Employee_project = sequelize.define("Employee_project", {
      employeeId: {
        type: Datatype.INTEGER,
        references: {
            model: employee,
            key: 'id'
        }
      },
      projectId: {
        type: Datatype.INTEGER,
        references: {
            model: project,
            key: 'id'
        }
      },
    });
    return Employee_project;
  };
  