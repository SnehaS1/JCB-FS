import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate, useRoutes } from "react-router-dom";
import apiClient from "../http-common";
import { MaintenanceStatus, MaintenanceType } from "../constants/enums";
import { saveMaintenance } from "../api";
import VehicleForm from "../components/vehicleForm";

interface FormValues {
  vehicleId: string;
  maintenanceType: string;
  description: string;
  maintenanceStatus: string;
  vehicleModel?: string;
  vehicleMake?: string;
}
interface VehicleListType {
  value: string;
  label: string;
}

const initialFormValues: FormValues = {
  vehicleId: "",
  maintenanceType: "",
  description: "",
  maintenanceStatus: "",
};
const initialVehicleValues: VehicleListType[] = [
  {
    value: "",
    label: "",
  },
];

export default function UpsertVehiclePage() {
  const { id } = useParams();
  const isUpsert = id !== "create"; //true if update, false if create
  return (
    <div className="flex flex-col justify-center align-middle my-10">
      <h2 className="m-5 font-bold text-2xl text-center">Add new Vehicle </h2>

      <VehicleForm />
    </div>
  );
}
