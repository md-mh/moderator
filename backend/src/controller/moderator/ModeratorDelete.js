const { db } = require("../../utils/setting");
const { isInvalidData } = require("../../hooks/isInvalidData");

const ModeratorDelete = async (req, res) => {
  const { id } = req.params;
  if (isInvalidData(id)) {
    return res.status(400).send({
      success: false,
      message: "Invalid Id",
    });
  }

  // Use SQLite: should use db.run instead of db.query
  const sql = "DELETE FROM moderators WHERE id = ?";
  const value = [id];

  db.run(sql, value, function (error) {
    if (error) {
      return res.status(500).send({
        success: false,
        message: "Unable to DELETE",
        error: error.message,
      });
    } else if (this.changes === 0) {
      return res.status(404).send({
        success: false,
        message: "Content not found",
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "Delete successfully",
        deletedId: id,
      });
    }
  });
};

module.exports = { ModeratorDelete };
