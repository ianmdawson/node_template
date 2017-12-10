import * as express from 'express';
import morgan = require('morgan');
import serveFavicon = require('serve-favicon');

import * as routes from './routes';

const app = express();

// SETTINGS
if ((app.get('env') !== 'production') && (app.get('env') !== 'test')) {
  app.set('env', 'development');
}

app.set('view engine', 'ejs');
app.use(express.static('../public'));
app.use(serveFavicon('public/images/favicon.ico'));
// log every request
app.use(morgan('dev'));

// for SSL
app.use((req, res, next) => {
  const host = req.get('host');
  if (((app.get('env') === 'production')) && req.get('x-forwarded-proto') === 'http') {
    res.redirect(301, 'https://' + host + req.url);
  } else {
    // see https://www.owasp.org/index.php/HTTP_Strict_Transport_Security
    res.set('Strict-Transport-Security', 'max-age=604800; includeSubDomains; preload');

    next();
  }
});

if (app.get('env') === 'production') {
  app.set('trust proxy', 1); // trust first proxy
}

// routes
routes(app); // load our routes and pass in our app and fully configured passport

module.exports = app;
