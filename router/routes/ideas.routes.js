'use strict';

module.exports = (app) => {
    var router = require('express').Router();
    
    var controller = require('../../controllers/ideas.controllers')();
    // const middlewares = require('../../middlewares');

    router.route('/allIdeas')
        .get(controller.list);
    router.route('/idea/:iid')
        .get(controller.getItem);
    router.route('/idea')
        .post(controller.create);
    app.use('/api',router);
};