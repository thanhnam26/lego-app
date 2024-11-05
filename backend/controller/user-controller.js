// controllers/userController.js
const User = require("../model/user-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { fullName, email, password, dob, phone, address, avatar, role } =
    req.body;
  try {
    // Check if the email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with the specified role or default to "customer"
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      dob,
      phone,
      address,
       avatar: avatar || "",
      role: role || "customer", // Default to "customer" if no role is specified
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    console.log("Found user:", user); // Log the found user

    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch); // Log the password comparison result

    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        dob: user.dob,
        phone: user.phone,
        address: user.address,
        avatar: user.avatar,
        status: user.status,
      },
    });
  } catch (error) {
    console.error(error); // Log error details
    res.status(500).json({ message: "Login failed", error });
  }
};

// Example: Protected route for admin-only access
const getAllUsers = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  try {
    const users = await User.find().select("-password"); // Exclude password from results
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve users", error });
  }
};
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      address: user.address,
      dob: user.dob,
      avatar: user.avatar,
      role: user.role,
      createdAt: user.createdAt,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve user profile", error });
  }
};

module.exports = { register, login, getAllUsers, getProfile }; // Thêm getProfile vào exports
