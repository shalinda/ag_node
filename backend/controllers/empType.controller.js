
/**
 * @author : Shalinda Ranasinghe
 * @copyright: 2018
 */

 const EmpType = require("../models/empType");


/**
 * @desc - module for get all EmpType.
 */
module.exports.getEmpTypes = (req, res) => {
  const query = EmpType.find({});
  
  query
    .lean()
    .exec()
    .then(empTypes => res.status(200)
      .json(empTypes))
    .catch(err => res.status(500)
      .json({error: true, message: err.message}))
}

/**
 * @desc - module for get single empType by _id.
 */
module.exports.getEmpTypeById = (req, res) => {
  const _id = req.params.empTypeId;
  
  if (!empTypeId)
    return res.status(400)
      .json({ error: true, message: "EmpType Id Required" })

  EmpType.findById(_id)
    .lean()
    .exec()
    .then(empType => res.status(200)
      .json(empType))
    .catch(err => res.status(500)
      .json({ error: true, message: err.message }))
}

/**
 * @desc - module for save empType
 */
module.exports.create = (req, res) => {
  const empType = new EmpType(req.body);

  empType.save((err, empType) => {
    if (err)
      return res.status(500)
        .json({ error: true, message: err.message })

    return res.status(201)
      .json(empType)
  })
}

/**
 * @desc - module for save empType
 */
module.exports.update1 = (req, res) => {
  const empType = req.body;
  const _id = empType._id;

  console.log('test2')
  const query = { _id },
    update = { $set: empType },
    options = { new: true };

  EmpType.findByIdAndUpdate(query, update, options)
    .lean()
    .exec()
    .then(empType => res.status(200)
      .json(empType))
    .catch(err => res.status(500)
      .json({ error: true, message: err.message }))
}

/**
 * @desc - module for delete empType
 */
module.exports.delete = (req, res) => {
  const _id = req.params.empTypeId;

  EmpType.findByIdAndRemove(_id)
    .lean()
    .exec()
    .then(empType => res.status(200)
      .json(empType))
    .catch(err => res.status(500)
      .json({ error: true, message: err.message }))
}


