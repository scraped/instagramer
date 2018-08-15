const db = require('./../db');


function list() {
    return db.models.User.findAll();
}


module.exports = {list};
