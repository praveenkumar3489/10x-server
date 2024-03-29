'use strict';

module.exports = (app) => {
    var router = require('express').Router();
    
    var controller = require('../../controllers/users.controllers')();
    // const middlewares = require('../../middlewares');

    router.route('/allUsers')
        .get(controller.list);
    router.route('/user/:id')
        .get(controller.getItem);
    router.route('/user')
        .post(controller.create);
    router.route('/user/:id')
        .delete(controller.delete);
    app.use('/api',router);
};