const { db } = require("../../utils/setting");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const ModeratorAdd = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  // Early check for required fields
  const validationErrors = [];

  if (!name) {
    validationErrors.push("Missing required field: name");
  }
  if (!email) {
    validationErrors.push("Missing required field: email");
  }
  if (!password) {
    validationErrors.push("Missing required field: password");
  }

  if (validationErrors.length > 0) {
    return res.status(400).send({
      success: false,
      message: "Validation error",
      errors: validationErrors,
    });
  }

  const userUuid = uuidv4();
  const hashPassword = await bcrypt.hash(password, 10);
  const sql = `
    INSERT INTO moderators (
      name,
      email,
      password,
      userId
    ) VALUES (?, ?, ?, ?)
  `;
  const value = [name, email, hashPassword, userUuid];
  console.log(value);
  db.run(sql, value, function (error) {
    console.log(error);
    if (error) {
      return res.status(500).send({
        success: false,
        message: "Unable to create user",
        error: error.message,
      });
    } else {
      return res.status(201).send({
        success: true,
        message: "User added successfully",
        userId: userUuid,
        lastID: this.lastID,
      });
    }
  });
};

module.exports = { ModeratorAdd };
