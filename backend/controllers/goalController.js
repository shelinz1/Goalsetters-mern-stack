const asyncHandler = require("express-async-handler");
const Goal = require("../models/goal");


//@desc Get goals
//@route Get /api/goals
//@access private - cause of authentication

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

//@desc Set goals
//@route POST /api/goals
//@access private - cause of authentication
const createGoals = asyncHandler(async (req, res, next) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("please add a text field.");
  }

  const goals = await Goal.create({
    text: req.body.text,
    user: req.user.id
  });

  res.status(200).json(goals);
});

//@desc UPDATE goals
//@route PUT /api/goals/:id
//@access private - cause of authentication
const updateGoals = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const goal = await Goal.findById(id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal does not exist");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).json(updatedGoal);
});

//@desc Delete goals
//@route DELETE /api/goals
//@access private - cause of authentication
const deleteGoals = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const goal = await Goal.findById(id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal does not exist");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await goal.remove();
  res.status(200).json({ id });
});

module.exports = {
  getGoals,
  createGoals,
  updateGoals,
  deleteGoals,
};

// const user = await User.findById(req.user.id);
// if (!user) {
//   res.status(401);
//   throw new Error("user is not found");
// }

// // Make sure the logged in user matches the goal user
// if (goal.user.toString() !== user.id) {
//   res.status(401);
//   throw new Error("User not authorized");
// }
