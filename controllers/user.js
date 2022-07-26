const { User } = require("../models/user");
const emailSend = require("../config/email");
const bcrypt = require("bcrypt");
const generator = require("generate-password");

const register = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    if (user) {
      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      await user.updateOne({
        ...req.body,
        password: hashPassword,
        status: true,
      });
      res.status(200).send({ message: "Successfully register" });
    } else {
      res.status(400).send({ message: "Please signup before register" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const signin = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: "User with given email already Exist!" });

    let randomPass = generator.generate({
      length: 10,
      numbers: true,
    });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(randomPass, salt);

    user = await new User({
      email: req.body.email,
      password: hashPassword,
    }).save();

    const url = `${process.env.BASE_URL}`;
    const credential = { url, randomPass };
    await emailSend(user.email, "Verify Email", credential);

    res
      .status(201)
      .send({ message: "Password with Login link is sent to the email" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const getUsers = async (req, res) => {
  const pageSize = 3;
  const name = req.query.name || "";
  const email = req.query.email || "";
  const id = req.query.id || "";
  const currentPage = parseInt(req.query.page || "0");
  try {
    const totalUsers = await User.countDocuments({});
    const users = await User.find({
      firstName: {$regex: name, $options:"i"},
      email: {$regex:email, $options:"i"},
      status: true,
    })
    .limit(pageSize)
    .skip(pageSize * currentPage);
    const totalPages = Math.ceil(totalUsers / pageSize);

    if (users.length == 0) return res.status(404).json({ message: "Users not found" });

    res.status(200).json({ users, totalPages });

    
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  signin,
  register,
  getUsers,
};
