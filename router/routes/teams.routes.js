'use strict';

module.exports = app => {
	let router = require('express').Router();

	let controller = require('../../controllers/teams.controllers')();
	let middlewares = require('../../middlewares/teams.middlewares')();

	router.route('/members/:teamId').get(middlewares.validateTeamId, controller.membersList);
	router.route('/teams').post(middlewares.validateTeamId, controller.update);

	app.use('/api', router);
};
