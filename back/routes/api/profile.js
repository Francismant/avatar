const router = require("express").Router();

const connection = require("../../database/index");

router.patch("/insertImage", (req, res) => {
  console.log(req.body);
  const idUser = req.body.idUser;
  const blobby = req.body.value;

  const updateSQL = "UPDATE users SET blobby = ? WHERE idUSer = ?";
  connection.query(updateSQL, [blobby, idUser], (err, result) => {
    if (err) throw err;
  });
  const searchSQL = "SELECT blobby FROM users WHERE idUser = ?";
  connection.query(searchSQL, [idUser], (err, result) => {
    if (err) throw err;
    res.send(result[0]);
  });
});

router.get("/getAvatarFromUser", (req, res) => {
  const id = req.query.id;
  console.log(req.query);
  const sql = "SELECT blobby FROM users WHERE idUser = ?";
  connection.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send(result[0]);
  });
});

router.get("/getDefaultImage", (req, res) => {
  const sql = "SELECT blobby FROM image LIMIT 1";
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result[0]);
  });
});

module.exports = router;
