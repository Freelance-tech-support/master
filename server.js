const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const socket = require("socket.io");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/db");

const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");

const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");

const auth = require("./routes/auth");
const question = require("./routes/question");
const userR = require("./routes/users");

//Load env vars
dotenv.config({ path: "./config/config.env" });

//Connect to database
connectDB();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

//Socket.io
const io = socket(server);
const users = {};

io.on("connection", socket => {
	console.log("connection " + socket.id);

	socket.on("username", data => {
		users[data] = socket.id;
		socket.username = data;
		io.sockets.emit("allUsers", users);
	});

	socket.on("disconnect", () => {
		console.log(`${socket.username} disconnecting`);
		delete users[socket.username];
	});

	socket.on("callUser", data => {
		io.to(data.userToCall).emit("hey", {
			signal: data.signalData,
			from: data.from,
			fromName: data.fromName,
		});
	});

	socket.on("acceptCall", data => {
		io.to(data.to).emit("callAccepted", data.signal);
	});
});

//Middleware
app.use(express.json());
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}
app.use(cors());

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
app.use(hpp());

//Mount routes
app.use("/api/v1/auth", auth);
app.use("/api/v1/question", question);
app.use("/api/v1/users", userR);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.resolve(__dirname, "client/build")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}



app.use(express.urlencoded({ extended: false }));

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
