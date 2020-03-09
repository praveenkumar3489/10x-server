'use strict';


const routes = [
    require('./routes/users.routes'),
    require('./routes/workshop.routes'),
    require('./routes/actions.routes'),
    require('./routes/teams.routes')
];

module.exports = function router(app) {
	return routes.forEach(route => {
		route(app);
	});
};
