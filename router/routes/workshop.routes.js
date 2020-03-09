'use strict';

module.exports = (app) => {
    var router = require('express').Router();
    
    var controller = require('../../controllers/workshops.controllers')();
    // const middlewares = require('../../middlewares');

    router.route('/allworkshop/:cid/:scid')
        .get(controller.list);
    router.route('/workshop/:wid')
        .get(controller.getItem);
    router.route('/workshop')
        .post(controller.create);
    app.use('/api',router);
};