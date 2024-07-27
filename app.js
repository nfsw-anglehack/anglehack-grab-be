const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const merchantsRouter = require("./routes/merchants");
const productsRouter = require("./routes/products");
const driversRouter = require("./routes/drivers");
const reviewsRouter = require("./routes/reviews");
const ordersRouter = require("./routes/orders");

// Gen AI
const generatorTextRouter = require("./routes/generate-text");
const sentimentStatementRouter = require("./routes/sentiment-statement");

const app = express();

// custom handler to ignore excess requests
const ignoreExcessRequests = (req, res, next) => {
  const key = req.ip;
  if (!req.rateLimit) {
    req.rateLimit = {
      [key]: { count: 0, timestamp: Date.now() },
    };
  }

  const rate = req.rateLimit[key];
  const currentTime = Date.now();
  const windowMs = 5 * 1000; // 5 sec
  const maxRequests = 2; // max 2 requests per windowMs

  if (currentTime - rate.timestamp > windowMs) {
    rate.count = 0;
    rate.timestamp = currentTime;
  }

  rate.count += 1;

  if (rate.count > maxRequests) {
    // Ignore the request by not calling next()
    return;
  }

  next();
};

// view engine setup
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/merchants", merchantsRouter);
app.use("/products", productsRouter);
app.use("/drivers", driversRouter);
app.use("/reviews", reviewsRouter);
app.use("/orders", ordersRouter);

// Gen AI
app.use("/generate-text", generatorTextRouter);
app.use("/sentiment-statement", sentimentStatementRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
