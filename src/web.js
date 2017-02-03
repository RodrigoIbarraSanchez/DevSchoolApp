// Dependencies
var express = require('express');
var morgan = require("morgan");
var path = require("path");
var auth0Valerio = require('valerio-auth0');
var swig  = require('swig');
var conekta = require('conekta');

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

/*app.use('/', function(req, res) {
    res.send(swig.renderFile('./src/presenter/indexLogin.html', res.locals));
});*/
app.get('/',  function (req, res) {
	res.send(swig.renderFile('./src/presenter/index.html', res.locals));
});

app.get('/dashboard', auth0Valerio.middlware.requiresLogin, function(req, res) {
    //res.json(res.locals.user.displayName);
    //res.send("Hola! Gracias por registrarte " + res.locals.user.name);
    //res.send('Pagina de Usuario');
    //res.json(res.locals.user); // JSON con Datos del usuario
    res.send(swig.renderFile('./src/presenter/indexLogin.html', res.locals));
});

app.get('/curso-unity', function (req, res) {
    res.send(swig.renderFile('./src/presenter/curso-unity.html'));
});

app.get('/curso-programacion-desde-cero', function (req, res) {
    res.send(swig.renderFile('./src/presenter/curso-programacion-desde-cero.html'));
});

app.get('/curso-modelado-3d-zbrush', function (req, res) {
    res.send(swig.renderFile('./src/presenter/curso-modelado-3d-zbrush.html'));
});

//Conekta
/*conekta.api_key = "key_nidqqaunezru6TKqJRtVzA";
function uno(err, res) {
    //console.log(res.toObject());
    console.log(charge.toObject().status);
}
conekta.Charge.create({
    "description":"Stogies",
    "amount": 200000,
    "currency":"MXN",
    "reference_id":"9839-wolf_pack",
    "card": "tok_test_visa_4242",
    "details": {
        "name": "Rodrigo Ibarra Sanchez",
        "phone": "403-342-0642",
        "email": "logan@x-men.org",
        "customer": {
            "logged_in": true,
            "successful_purchases": 14,
            "created_at": 1379784950,
            "updated_at": 1379784950,
            "offline_payments": 4,
            "score": 9
        },
        "line_items": [{
            "name": "Box of Cohiba S1s",
            "description": "Imported From Mex.",
            "unit_price": 20000,
            "quantity": 1,
            "sku": "cohb_s1",
            "category": "food"
        }],
        "billing_address": {
            "street1":"77 Mystery Lane",
            "street2": "Suite 124",
            "street3": null,
            "city": "Darlington",
            "state":"NJ",
            "zip": "10192",
            "country": "Mexico",
            "tax_id": "xmn671212drx",
            "company_name":"X-Men Inc.",
            "phone": "77-777-7777",
            "email": "purshasing@x-men.org"
        }
    }
});*/


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
