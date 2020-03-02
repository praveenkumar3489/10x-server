'use strict';

const routes = [
    require('./routes/users.routes')
];

module.exports = function router(app) {
    return routes.forEach((route) => {
      	route(app);
    });
};