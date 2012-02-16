var pathutil = require('path');

exports.rebaseServer = function(base, server) {
	var oldUse = server.use.bind(server);

	server.use = function(route, handle) {
		if ('string' != typeof route) {
			handle = route;
			route = '/';
		}

		route = pathutil.join('/', base, route);
		return oldUse(route, handle);
	}
}

exports.rebaseSocketIO = function(base, io) {
	io.settings.resource = pathutil.join('/', base, io.settings.resource);	
}
