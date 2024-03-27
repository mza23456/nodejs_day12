const db = require("../models");
const company = db.company;
const employee = db.employee;

exports.findAll = (req, res) => {
  company
    .findAll({
      include: [
        {
          model: employee,
          attributes: ["name", "position"],
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
