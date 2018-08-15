const userService = require('../services/UserService');


async function index(req, res) {
    try {
        const items = await userService.list();
        res.send(items);
    } catch (err) {
        res.status(400).send(err);
    }
}


module.exports.index = index;
