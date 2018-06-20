
/**
 * @author : Ajantha Bandara
 * @copyright: 2018
 */

 const User = require("../models/user"),
  Comment = require("../models/comment");


/**
 * @desc - module for get all users.
 */
module.exports.getUsers = (req, res) => {
  const comments = req.query.comments;

  const query = User.find({});
  console.log('test2', comments)
  if (comments === "true")
    query.populate("commentIds")

  query
    .lean()
    .exec()
    .then(users => res.status(200)
      .json(users))
    .catch(err => res.status(500)
      .json({error: true, message: err.message}))
}

/**
 * @desc - module for get single user by _id.
 */
module.exports.getUserById = (req, res) => {
  const _id = req.params.userId;
  
  if (!userId)
    return res.status(400)
      .json({ error: true, message: "UserId Required" })

  User.findById(_id)
    .lean()
    .exec()
    .then(user => res.status(200)
      .json(user))
    .catch(err => res.status(500)
      .json({ error: true, message: err.message }))
}

/**
 * @desc - module for save user
 */
module.exports.create = (req, res) => {
  const user = new User(req.body);

  user.save((err, user) => {
    if (err)
      return res.status(500)
        .json({ error: true, message: err.message })

    return res.status(201)
      .json(user)
  })
}

/**
 * @desc - module for save user
 */
module.exports.update1 = (req, res) => {
  const user = req.body;
  const _id = user._id;

  console.log('test2')
  const query = { _id },
    update = { $set: user },
    options = { new: true };

  User.findByIdAndUpdate(query, update, options)
    .lean()
    .exec()
    .then(user => res.status(200)
      .json(user))
    .catch(err => res.status(500)
      .json({ error: true, message: err.message }))
}

/**
 * @desc - module for delete user
 */
module.exports.delete = (req, res) => {
  const _id = req.params.userId;

  User.findByIdAndRemove(_id)
    .lean()
    .exec()
    .then(user => res.status(200)
      .json(user))
    .catch(err => res.status(500)
      .json({ error: true, message: err.message }))
}


// ********************* Comment Modules ********************* //

/**
 * @desc - module for add comment to user
 */
module.exports.createComment = (req, res) => {
  const _id = req.params.userId;
  const comment = new Comment(req.body);

  comment.save((err, comment) => {
    if (err)
      return res.status(500)
        .json({ error: true, message: err.message });

    const query = {_id},
      update = { $push: { commentIds: comment._id}},
      options = { new: true };

    User.findByIdAndUpdate(query, update, options)
      .lean()
      .exec()
      .then(user => res.status(201)
        .json(comment))
      .catch(err => res.status(500)
        .json({error: true, message: err.message}))
  });
}

/**
 * @desc - module for add comment to user
 */
module.exports.update = (req, res) => {
  const _id = req.params.userId;
  const comment = req.body;

  const query = {_id: comment._id},
    update = {$set: comment},
    options = {new: true};

  Comment.findByIdAndUpdate(query, update, options)
    .lean()
    .exec()
    .then(comment => res.status(200)
      .json(comment))
    .catch(err => res.status(500)
      .json({ error: true, message: err.message }))
}
