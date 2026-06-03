import Users from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  path: "/api/refresh_token",
  sameSite: "lax",
  maxAge: 30 * 24 * 60 * 60 * 1000,
};

const createAccessToken = (id) => jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
const createRefreshToken = (id) => jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "30d" });

const sendRefreshToken = (res, token) => res.cookie("refreshtoken", token, REFRESH_COOKIE_OPTIONS);

const handleAuthResponse = (res, user, message) => {
  const access_token = createAccessToken(user._id);
  const refresh_token = createRefreshToken(user._id);

  sendRefreshToken(res, refresh_token);

  return res.json({
    msg: message,
    access_token,
    user: {
      ...user._doc,
      password: "",
    },
  });
};

const findUserByEmail = async (email, role) =>
  Users.findOne({ email, role }).populate("followers following", "-password");

const authCtrl = {
  register: async (req, res) => {
    try {
      const { fullname, username, email, password, gender } = req.body;
      const normalizedUsername = username?.toLowerCase().replace(/\s+/g, "");

      if (!fullname || !normalizedUsername || !email || !password) {
        return res.status(400).json({ msg: "Please fill in all fields." });
      }

      if (password.length < 6) {
        return res.status(400).json({ msg: "Password must be at least 6 characters long." });
      }

      const existingUser = await Users.findOne({ $or: [{ username: normalizedUsername }, { email }] });
      if (existingUser) {
        return res.status(400).json({ msg: "Username or email is already registered." });
      }

      const passwordHash = await bcrypt.hash(password, 12);
      const newUser = new Users({ fullname, username: normalizedUsername, email, password: passwordHash, gender });

      await newUser.save();
      return handleAuthResponse(res, newUser, "Registered successfully!");
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  changePassword: async (req, res) => {
    try {
      const { oldPassword, newPassword } = req.body;
      const user = await Users.findById(req.user._id);

      if (!user) {
        return res.status(404).json({ msg: "User not found." });
      }

      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Your password is wrong." });
      }

      if (!newPassword || newPassword.length < 6) {
        return res.status(400).json({ msg: "Password must be at least 6 characters long." });
      }

      user.password = await bcrypt.hash(newPassword, 12);
      await user.save();

      return res.json({ msg: "Password updated successfully." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  registerAdmin: async (req, res) => {
    try {
      const { fullname, username, email, password, gender, role } = req.body;
      const normalizedUsername = username?.toLowerCase().replace(/\s+/g, "");

      if (!fullname || !normalizedUsername || !email || !password) {
        return res.status(400).json({ msg: "Please fill in all fields." });
      }

      if (password.length < 6) {
        return res.status(400).json({ msg: "Password must be at least 6 characters long." });
      }

      const existingUser = await Users.findOne({ $or: [{ username: normalizedUsername }, { email }] });
      if (existingUser) {
        return res.status(400).json({ msg: "Username or email is already registered." });
      }

      const passwordHash = await bcrypt.hash(password, 12);
      const newUser = new Users({ fullname, username: normalizedUsername, email, password: passwordHash, gender, role });

      await newUser.save();
      return res.json({ msg: "Admin registered successfully." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await findUserByEmail(email, "user");

      if (!user) {
        return res.status(400).json({ msg: "Email or password is incorrect." });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Email or password is incorrect." });
      }

      return handleAuthResponse(res, user, "Logged in successfully!");
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  adminLogin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await findUserByEmail(email, "admin");

      if (!user) {
        return res.status(400).json({ msg: "Email or password is incorrect." });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Email or password is incorrect." });
      }

      return handleAuthResponse(res, user, "Logged in successfully!");
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/api/refresh_token" });
      return res.json({ msg: "Logged out successfully." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  generateAccessToken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) {
        return res.status(400).json({ msg: "Please login again." });
      }

      const decoded = jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET);
      const user = await Users.findById(decoded.id).select("-password").populate("followers following", "-password");

      if (!user) {
        return res.status(400).json({ msg: "User does not exist." });
      }

      const access_token = createAccessToken(decoded.id);
      return res.json({ access_token, user });
    } catch (err) {
      if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
        return res.status(400).json({ msg: "Please login again." });
      }
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default authCtrl;
