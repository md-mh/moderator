const { db } = require("../../utils/setting");
const { pagination } = require("../../hooks/pagination");

const ModeratorsAll = async (req, res) => {
  let { name = "", email = "", page = 1, limit = 12 } = req.query;

  // Calculate offset for pagination
  const paginationData = await pagination({
    table: "moderators",
    filters: {
      name: name,
      email: email,
    },
    page,
    limit,
  });

  const offset = (page - 1) * limit;
  const sql = `SELECT * FROM moderators WHERE name LIKE ? AND email LIKE ? ORDER BY createdAt DESC LIMIT ? OFFSET ?`;
  const value = [`%${name}%`, `%${email}%`, limit, offset];
  console.log(value);
  db.all(sql, value, (error, rows) => {
    console.log(error);
    if (error) {
      return res.status(500).send({
        success: false,
        message: "Unable to show data",
        error: error.message,
      });
    } else {
      console.log(rows);
      return res.status(200).send({
        success: true,
        message: "Data fetched successfully",
        data: rows,
        pagination: paginationData,
      });
    }
  });
};

module.exports = { ModeratorsAll };
