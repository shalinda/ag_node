
/**
 * @author : Shalinda Ranasinghe
 * @copyright: 2018
 */

 const Employee = require("../models/employee");


/**
 * @desc - module for get all employees.
 */
module.exports.getEmployees = (req, res) => {
  const query = Employee.find({});
  
  query
    .populate("empType")
    .lean()
    .exec()
    .then(employees => res.status(200)
      .json(employees))
    .catch(err => res.status(500)
      .json({error: true, message: err.message}))
}

/**
 * @desc - module for get single employee by _id.
 */
module.exports.getEmployeeById = (req, res) => {
  const _id = req.params.employeeId;
  
  if (!employeeId)
    return res.status(400)
      .json({ error: true, message: "Employee Id Required" })

  Employee.findById(_id)
    .lean()
    .exec()
    .then(employee => res.status(200)
      .json(employee))
    .catch(err => res.status(500)
      .json({ error: true, message: err.message }))
}

/**
 * @desc - module for save employee
 */
module.exports.create = (req, res) => {
  const employee = new Employee(req.body);
  
  employee.save((err, employee, ) => {
    if (err)
      return res.status(500)
        .json({ error: true, message: err.message })

    return res.status(201)
      .json(employee)
  })
}

/**
 * @desc - module for save employee
 */
module.exports.update1 = (req, res) => {
  const employee = req.body;
  const _id = employee._id;

  console.log('test2')
  const query = { _id },
    update = { $set: employee },
    options = { new: true };

  Employee.findByIdAndUpdate(query, update, options)
    .lean()
    .exec()
    .then(employee => res.status(200)
      .json(employee))
    .catch(err => res.status(500)
      .json({ error: true, message: err.message }))
}

/**
 * @desc - module for delete employee
 */
module.exports.delete = (req, res) => {
  const _id = req.params.id;
  console.debug(req.params)
  Employee.findByIdAndRemove(_id)
    .lean()
    .exec()
    .then(employee => res.status(200)
      .json(employee))
    .catch(err => res.status(500)
      .json({ error: true, message: err.message }))
}


