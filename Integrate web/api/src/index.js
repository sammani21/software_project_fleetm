const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv");
const errorHandler = require("./middlewares/ErrorHandler");
const cors = require('cors');
const vehicleRoute = require("./routes/vehicle.route");
const driverRoute = require("./routes/driver.route");
const userRoute  = require( "./routes/user.route"); 
const passengerRoute = require("./routes/passenger.route");
const cookieParser = require('cookie-parser');
const vehicleRoutes = require("./routes/vehicleDashboardRoutes");
const driverRoutes = require("./routes/driverDashboardRoutes");
const tripRoutes = require("./routes/tripDashboardRoutes");
const issueRoutes = require("./routes/issueDashboardRoutes");
const countCompletedTripsRoute = require('./routes/countCompletedTripsRoute');
const passengerRouteReport = require("./routes/passengerReportRoutes");
const driverRouteReport = require('./routes/driverReportRoutes');
const vehicleRouteReport = require('./routes/vehicleReportRoutes');
const issueRouteReport = require('./routes/issueReportRoutes');

env.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to db"))
  .catch((er) => console.log(er));

const app = express();
app.use(cors());
/*app.use(cors(
 /*{
  origin: '*', // Allow requests from the specified origin
  credentials: true, // Allow sending cookies
  //methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Allow the request methods
}
));*/
/*const corsOptions = {
  origin: 'http://localhost:5173', // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};

// Use CORS middleware with the options
app.use(cors(corsOptions));*/

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/vehicle", vehicleRoute);
app.use("/api/v1/driver", driverRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/passenger", passengerRoute);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/trips", countCompletedTripsRoute);
app.use('/api/passengers', passengerRouteReport);
app.use('/api/drivers', driverRouteReport);
app.use('/api/vehicles', vehicleRouteReport);
app.use('/api/issues', issueRouteReport);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${process.env.PORT}`);
});
