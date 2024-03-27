const db = require("../models");
const project = db.project;
const employee = db.employee;

exports.findAll = (req, res) => {
  project
    .findAll({
      include: [
        {
          model: employee,
          attributes: ["name"],
        },
      ],
    })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
};