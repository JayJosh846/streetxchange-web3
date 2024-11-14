const express = require('express');
const router = require('./src/routes');

const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('morgan');
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./src/docs/swagger.json');
const {
  Config,
} = require("./src/utils");

const app = express();
// const swaggerSetupOptions = {};

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
// app.use(logger('dev'));
app.use(helmet());
const whitelist = Config.WHITELISTDOMAINS;
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || origin === undefined) {
      callback(null, true);
    } else {
      // logger.info(`Cors origin denied ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
// app.use(cors(corsOptions));
app.use(cors())

// APIs
app.use('/api/v1', router);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// catch 404 and forward to error handler
app.all('*', function (req, res) {
  res.status(404).json({
    status: false,
    message: 'Resource Not Found'
  });
});

module.exports = app;
