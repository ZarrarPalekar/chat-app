const formidable = require("formidable");
const registerModel = require("../models/authModel");
const fs = require("fs");
const bcrypt = require("bcrypt");
const path = require("path");
const jwt = require("jsonwebtoken");

module.exports.userRegister = (req, res) => {
  try {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const { userName, email, password } = fields;
      const { image } = files;

      let imageName = image.originalFilename;

      let date = new Date();
      date = `${date.getDate()}_${
        date.getMonth() + 1
      }_${date.getFullYear()}_${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}_${Intl.DateTimeFormat()
        .resolvedOptions()
        .timeZone.replace("/", "_")}_`;

      imageName = date + imageName;

      image.originalFilename = imageName;

      const filePath = path.join(
        "frontend/public/uploads/",
        image.originalFilename
      );

      const userExists = await registerModel.findOne({ email: email });

      console.log("user: ", userExists);

      if (userExists)
        return res.status(400).json({
          status: "failed",
          error: "User with that email already exists",
        });

      fs.copyFile(image.filepath, filePath, async (err) => {
        if (!err) {
          const createdUser = await registerModel.create({
            userName,
            email,
            password: await bcrypt.hash(password, 10),
            image: image.originalFilename,
          });

          const userObject = {
            id: createdUser._id,
            email: createdUser.email,
            userName: createdUser.userName,
            image: createdUser.image,
            registeredTime: createdUser.createdAt,
          };

          const token = jwt.sign(userObject, process.env.JWT_SECRET, {
            expiresIn: "7d",
          });

          const cookieOptions = {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          };

          return res
            .status(200)
            .cookie("authToken", token, cookieOptions)
            .json({ status: "success", token });
        } else {
          return res.status(400).json({ status: "failed", error: err });
        }
      });
    });
  } catch (error) {
    console.error(`userRegister in catch: ${error}`);

    return res.status(400).json({ status: "failed", error: error });
  }
};
