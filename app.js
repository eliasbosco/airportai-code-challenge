/**
* App entrypoint.
*/
'use strict';

let app = require('express')();
const PORT = 3000;

// Set up Express.
require('./server/setup/express')(app);

// Set up MongoDB.
require('./server/setup/mongoose').setup();

// Set up routes.
app.use('/api/v1', require('./server/routes'));
app.use('/api/v1/lost-and-found', require('./server/routes/lost-and-found.route'));

// Start app.
app.listen(PORT, function() {
  console.log('App now listening on port ' + PORT);
});

module.exports = app;
