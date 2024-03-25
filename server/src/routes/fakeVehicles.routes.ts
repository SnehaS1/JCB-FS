import express, { Request, Response } from "express";
import { sampleHeavyVehicles } from "../controllers/vehicles.controller";
import HeavyVehicle, { VehicleIntefrace } from "../models/heavyVehicle.schema";

const router = express.Router();
router.use(express.json());

router.get("/", async (req: Request, res: Response) => {
  try {
    const vehicles: VehicleIntefrace[] = await HeavyVehicle.find().sort({
      timestamp: 1,
    });
    res.json(vehicles);
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Create new vehicle route
router.post("/", async (req: Request, res: Response) => {
  try {
    const {
      make,
      vehicleModel,
      vin,
      registrationNumber,
      year,
      mileage,
      type,
      lastMaintenanceDate,
      status,
      maximumLoadCapacity,
    } = req.body;
    const newVehicle: VehicleIntefrace = new HeavyVehicle({
      make,
      vehicleModel,
      vin,
      mileage,
      type,
      lastMaintenanceDate,
      status,
      maximumLoadCapacity,
    });
    if (
      !make ||
      !vehicleModel ||
      !vin ||
      !mileage ||
      !lastMaintenanceDate ||
      !type ||
      !status ||
      !maximumLoadCapacity
    ) {
      return res.status(400).send({
        message:
          "Few of the required details are missing. Please provide all the required details.",
      });
    }
    await newVehicle.save();
    res.status(201).json(newVehicle);
  } catch (error) {
    console.error("Error creating vehicle:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Edit Vehicle Route
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedVehicle: VehicleIntefrace | null =
      await HeavyVehicle.findByIdAndUpdate(id, req.body, { new: true });
    if (updatedVehicle) {
      res.json(updatedVehicle);
    } else {
      res.status(404).json({ message: "Vehicle not found" });
    }
  } catch (error) {
    console.error("Error updating vehicle:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
//Delete Router
router.delete("/", async (req: Request, res: Response) => {
  try {
    const delHeavy = await HeavyVehicle.deleteMany({});
    res.json({ message: "All vehicles deleted successfully" });
  } catch (error) {
    console.error("Error deleting all vehicles:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
