const db = require("../models");
const employee = db.employee;
const setting = db.setting;
const company = db.company;
const project = db.project;
const employee_project = db.employee_project;

exports.findAll = (req, res) => {
  try {
    employee
      .findAll({
        attributes: ["id", "name", "position"],
        include: [
          {
            model: setting,
            attributes: ["theme"],
          },
          {
            model: company,
            attributes: ["name"],
          },
          {
            model: project,
            attributes: ["name"],
          },
        ],
      })
      .then((employee) => {
        //res.send(employee);
        //res.json(employee);
        res.status(200).json(employee);
      })
      .catch((error) => {
        console.log(error.message);
      });
  } catch (e) {
    console.log(e);
  }
};

exports.create = (req, res) => {
  try {
    if (!req.body.name || !req.body.position) {
      res.status(400).json({
        message: "Content can't be empty!",
      });
      return;
    }

    const employeeObj = {
      name: req.body.name,
      position: req.body.position,
      companyId: req.body.companyId,
    };
    employee
      .create(employeeObj)
      .then((data) => {
        // Insert to SettingDB
        setting.create({
          theme: req.body.theme,
          employeeId: data.id,
        });
        res.status(200).json({ message: "employee created." });
      })
      .catch((error) => {
        res.status(400).json({ message: "error occured!." });
      });
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.addEmployeeToProject = (req, res) => {
  const junctionAttributes = {
    employeeId: req.body.employeeId,
    projectId: req.body.projectId
  }
  employee_project.create(junctionAttributes)
  .then(res.status(200).json({ message: "Employee project created."}))
  .catch(error => res.status(400).json({ message: error.message}));
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  employee
    .findByPk(id, {
      include: [
        {
          model: company,
          attributes: ["name"],
        },
      ],
    })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: "Error " + id,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: error.message,
      });
    });
};

exports.update = (req, res) => {
  try {
    const id = req.params.id;
    const employeeObj = {
      name: req.body.name,
      position: req.body.position,
    };

    employee
      .update(employeeObj, {
        where: { id: id },
      })
      .then((data) => {
        if (data == 1) {
          res.status(200).json({ message: "Updated successfully." });
        }
      })
      .catch((error) => {
        res.status(400).json({
          message: error.message,
        });
      });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.delete = (req, res) => {
  try {
    employee
      .destroy({
        where: { id: req.params.id },
      })
      .then((data) => {
        if (data == 1) {
          res.status(200).json({ message: "deleted succesfully." });
        }
      })
      .catch((error) => {
        res.status(400).json({ message: error.message });
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
