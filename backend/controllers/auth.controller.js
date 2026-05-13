const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1d" });

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      verificationToken
    });

    res.status(201).json({
      message: "Usuario registrado correctamente",
      userId: user._id,
      verificationToken
    });
  } catch (error) {
    res.status(500).json({ message: "Error en el registro", error: error.message });
  }
};

module.exports = { register };