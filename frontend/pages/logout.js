const fs = require("fs");
const logout = async (req, res) => {
  fs.unlink("./token.json", (err) => {
    if (err) console.log(err.message);
  });
};
module.exports = logout;
