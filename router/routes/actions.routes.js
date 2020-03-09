'use strict';

module.exports = (app) => {
    var router = require('express').Router();
    
    var controller = require('../../controllers/actions.controllers')();
    // const middlewares = require('../../middlewares');

    router.route('/action')
        .post(controller.create);
    app.use('/api',router);
};