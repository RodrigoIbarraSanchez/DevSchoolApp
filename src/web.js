// Dependencies
var express = require('express');
var morgan = require("morgan");
var path = require("path");
var auth0Valerio = require('valerio-auth0');

// Project dependencies
var config = require('./config');

// Settings
var app = express();
app.set('port', (config.port));
app.use(morgan(config.environment));

// Public folder
app.use(express.static(path.join(__dirname, "../public")));

// Auth0 Routes
app.use('/', auth0Valerio.router({
    domain: 'devschool.auth0.com',
    client_id: 'zf0TgECPxfqrQnVFuw57BadyJhjPTQ0k',
    client_secret: 'zM3iYU7G3sdnOCFDF0igLRvj5o2is7nNxjBZzwp7k8aIsIKlxG2wPESzlpwx7evb',
    url: process.env.URL || 'http://localhost:5000',
    session_secret: 'cualquiercosa'
}));

app.get('/dashboard', auth0Valerio.middlware.requiresLogin, function(req, res) {
    // res.json(res.locals.user);
    // res.send(res.locals.user.name);
    res.send('Pagina de Usuario');
});

// Error 404
app.use(function(req, res, next){
	res.status(404);

	// respond with html page
	if (req.accepts('html')) {
		return res.send("Página no encontrada")
	}

	// respond with json
	if (req.accepts('json')) {
		return res.json({ error: 'Recurso no encontrado' })
	}

	// default to plain-text. send()
	return res.type('txt').send('Not found')
});

// Start Server
app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'))
});
