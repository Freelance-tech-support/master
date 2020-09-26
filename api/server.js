const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/db");

const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");

const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");

const auth = require("./routes/auth");

//Load env vars
dotenv.config({ path: "./config/config.env" });

//Connect to database
connectDB();

const app = express();
const server = http.createServer(app);

//Middleware
app.use(express.json());
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);

//Authentication
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: true,
		saveUninitialized: true,
	})
);
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(passport.initialize());
app.use(passport.session());

//Configure passport strategies
require("./config/passport")(passport);

//Security
app.use(mongoSanitize());
app.use(helmet());
app.use(xss());
const limiter = rateLimit({
	windowMs: 10 * 60 * 1000,
	max: 1000,
});
app.use(limiter);
app.use(hpp());

//Mount routes
app.use("/api/v1/auth", auth);

const PORT = process.env.PORT || 5000;

server.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} on port ${process.env.PORT}`)
);

//Error handling
app.use(errorHandler);

process.on("unhandledRejection", (err, promise) => {
	console.log(`Error: ${err.message}`);
	// Close server & exit process
	// server.close(() => process.exit(1));
});
