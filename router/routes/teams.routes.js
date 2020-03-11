'use strict';

module.exports = app => {
	let router = require('express').Router();

	let controller = require('../../controllers/teams.controllers')();
	let middlewares = require('../../middlewares/teams.middlewares')();

	router.route('/allTeams').get(controller.list);
	router.route('/teams/:teamId').get(middlewares.validateTeamId, controller.getById);
	router.route('/teams').get(controller.getAll);
	router.route('/teams/:teamId').put(middlewares.validateTeamId, controller.update);
	router.route('/teams').post(controller.create);

	app.use('/api', router);
};
