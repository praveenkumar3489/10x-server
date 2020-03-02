'use strict';

module.exports = (app) => {
    var router = require('express').Router();
    
    var controller = require('../../controllers/users.controllers')();
    // const middlewares = require('../../middlewares');

    router.route('/list')
        .get(controller.list);
    router.route('/getItem/:id')
        .get(controller.getItem);
    router.route('/create')
        .post(controller.create);
    router.route('/update/:id')
        .put(controller.update);
    app.use('/api',router);
};