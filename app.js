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

const app = express();
const router = express.Router();

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
