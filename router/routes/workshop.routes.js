'use strict';

module.exports = app => {
	var router = require('express').Router();

	var controller = require('../../controllers/workshops.controllers')();
	// const middlewares = require('../../middlewares');

	router.route('/allWorkshop/:cid/:scid').get(controller.list);
	router.route('/workshop/:wid/').get(controller.getItem);
	router.route('/workshop/:wid/meta').get(controller.getMeta);
	router.route('/workshop').post(controller.create);
	router.route('/workshop/:wid').put(controller.update);
	router.route('/workshop/:wid/startTimer').post(controller.setTimer);
	router.route('/workshop/:wid/addMinute').post(controller.addMinute);
	app.use('/api', router);
};
