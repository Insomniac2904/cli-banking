const fs = require("fs");
const logout = async (req, res) => {
  fs.unlink("./tokenFile.txt", (err) => {
    if (err) console.log(err.message);
  });
};
module.exports = logout;
