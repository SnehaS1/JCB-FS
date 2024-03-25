import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//Import routes
import fakeVehiclesRoutes from "./routes/fakeVehicles.routes";
import VehicleTrackerRoutes from "./routes/vehicletracker.routes";
import VehicleMaintenance from "./routes/vehicleMaintenance.routes";

app.use("/api/v1/vehicleList", fakeVehiclesRoutes);
app.use("/api/v1/maintenance", VehicleMaintenance);
app.use("/api/v1/vehicletracker", VehicleTrackerRoutes);

export { app };
