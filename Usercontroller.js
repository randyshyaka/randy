const userService = require('../services/Userservice');


const getAllUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  res.json(users);
};


const getUserById = async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};


const updateUser = async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body, req.user.role === 'admin');
  if (!user) return res.status(404).json({ message: 'User not found' });

  res.json({ message: 'User updated successfully', user });
};


const deleteUser = async (req, res) => {
  const success = await userService.deleteUser(req.params.id);
  if (!success) return res.status(404).json({ message: 'User not found' });

  res.json({ message: 'User deleted successfully' });
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
