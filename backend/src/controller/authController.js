const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Users = require("../model/Users");
const dotenv = require("dotenv");

dotenv.config(); // Ensure environment variables are loaded

const secret = process.env.JWT_SECRET || "97f7fe51-9abf-4550-9ba7-35563b03a3e7"; // ✅ Moved to .env for production

const authController = {
  // ✅ Login Handler
  login: async (request, response) => {
    try {
      const { username, password } = request.body;

      console.log("Received login for:", username);

      const user = await Users.findOne({ email: username });
      if (!user) {
        return response.status(401).json({ message: "Invalid Credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return response.status(401).json({ message: "Invalid Credentials" });
      }

      const userDetails = {
        id: user._id,
        name: user.name,
        email: user.email,
      };

      const token = jwt.sign(userDetails, secret, { expiresIn: "1h" });

      response.cookie("jwtToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Only secure cookies in production
        sameSite: "lax",
        path: "/",
      });

      return response.status(200).json({
        message: "User authenticated",
        userDetails,
      });

    } catch (error) {
      console.error("Login error:", error);
      return response.status(500).json({ error: "Internal server error" });
    }
  },

  // ✅ Logout Handler
  logout: (request, response) => {
    response.clearCookie("jwtToken", { path: "/" });
    return response.status(200).json({ message: "User logged out successfully" });
  },

  // ✅ Registration Handler
  register: async (request, response) => {
    try {
      const { email, password, name } = request.body;

      if (!email || !password || !name) {
        return response.status(400).json({ message: "All fields are required" });
      }

      const existingUser = await Users.findOne({ email });
      if (existingUser) {
        return response
          .status(401)
          .json({ message: "User already exists with the given email" });
      }

      const encryptedPassword = await bcrypt.hash(password, 10);

      const newUser = new Users({
        email,
        password: encryptedPassword,
        name,
      });

      await newUser.save();

      console.log("User registered:", email);
      return response
        .status(200)
        .json({ message: "User registered successfully" });

    } catch (error) {
      console.error("Registration error:", error);
      return response.status(500).json({ message: "Internal server error" });
    }
  },

  // ✅ Auth Check Handler
  isUserLoggedIn: (request, response) => {
    const token = request.cookies.jwtToken;

    if (!token) {
      return response.status(401).json({ message: "Unauthorized access" });
    }

    jwt.verify(token, secret, (error, userDetails) => {
      if (error) {
        return response.status(401).json({ message: "Unauthorized access" });
      }

      return response.status(200).json({ userDetails });
    });
  },
};

module.exports = authController;
