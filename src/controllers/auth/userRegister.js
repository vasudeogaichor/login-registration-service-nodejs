const User = require("../../models/User");

module.exports = async function userRegister(req, res, next) {
  const { username, email, password } = req.body;

  try {
    // Check if the username or email is already in use
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ Error: "Username or email is already in use." });
    }

    if (!isStrongPassword(password)) {
      return res.status(400).json({
        Error:
          "Password should contain at least one uppercase character," +
          "one lowercase character, one digit, one special character and must have at least 8 characters.",
      });
    }

    // Create a new user
    const newUser = new User({ username, email, password });

    // Save the user to the database
    await newUser.save();

    // Respond with a success message
    res
      .status(201)
      .json({
        message: "User registered successfully.",
        data: {
          userId: newUser._id,
          username: newUser.username,
          email: newUser.email,
        },
      });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ Error: "Internal Server Error" });
  }
};

function isStrongPassword(password) {
  // Check if the password meets the minimum length requirement
  if (password.length < 8) {
    return false;
  }

  // Check if the password contains at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return false;
  }

  // Check if the password contains at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return false;
  }

  // Check if the password contains at least one digit
  if (!/\d/.test(password)) {
    return false;
  }

  // Check if the password contains at least one special character
  if (!/[@$!%*?&]/.test(password)) {
    return false;
  }

  return true;
}
