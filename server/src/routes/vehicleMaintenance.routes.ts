// Import necessary modules and models
import express, { Request, Response } from "express";
import mongoose, { ObjectId } from "mongoose";
import VehicleMaintenanceRecord, {
  VehicleMaintenanceRecordInterface,
} from "../models/vehicleMaintenance.schema";
import HeavyVehicle, { VehicleIntefrace } from "../models/heavyVehicle.schema";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { vehicleId, maintenanceType, description, maintenanceStatus } =
      req.body;

    HeavyVehicle.findOne({ vin: vehicleId })
      .then((vehicle) => {
        if (vehicle) {
          const newMaintenanceRecord: VehicleMaintenanceRecordInterface =
            new VehicleMaintenanceRecord({
              vehicleId: vehicle._id as ObjectId,
              maintenanceType,
              description,
              maintenanceStatus,
              vehicleModel: vehicle.vehicleModel,
              vehicleMake: vehicle.make,
            });

          const saveMaintenanceRecord = async () => {
            const savedMaintenance = await newMaintenanceRecord.save();
            res.status(201).json(newMaintenanceRecord);
          };

          saveMaintenanceRecord();
        } else {
          res.status(404).json({ message: "Vehicle not found" });
        }
      })
      .catch((error) => {
        console.error("Error finding vehicle:", error);
        res
          .status(500)
          .json({ message: "Internal server error: Error Finding Vehicle" });
      });
  } catch (error) {
    console.error("Error logging maintenance record:", error);
    res.status(500).json({
      message: "Internal server error: Unable to create Maintenance record",
    });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const maintenanceRecords: VehicleMaintenanceRecordInterface[] =
      await VehicleMaintenanceRecord.find().sort({ timestamp: -1 });
    res.json(maintenanceRecords);
  } catch (error) {
    console.error("Error fetching maintenance records:", error);
    res.status(500).json({
      message: "Internal server error: Unable to fetch Maintenace Record",
    });
  }
});

//Get a single maintenance record
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = await VehicleMaintenanceRecord.findById(id);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.json(vehicle);
  } catch (error) {
    console.error("Error fetching vehicle:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedVehicle: VehicleIntefrace | null =
      await VehicleMaintenanceRecord.findByIdAndUpdate(id, req.body, {
        new: true,
      });
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

router.delete("/", async (req: Request, res: Response) => {
  try {
    const delHeavy = await VehicleMaintenanceRecord.deleteMany({});
    res.json({
      message: "All vehicles maintenace record deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting all vehicles:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
