function index(app, controller) {
    app.get('/admin/users', controller.index);
}


module.exports.index = index;
