import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../http-common";

interface FormValues {
  vehicleId: string;
  maintenanceType: string;
  description: string;
  maintenanceStatus: string;
}

const initialFormValues: FormValues = {
  vehicleId: "",
  maintenanceType: "",
  description: "",
  maintenanceStatus: "",
};

export default function MaintenancePage() {
  const { data: maintenanceRecord, error } = useQuery<
    VehicleTrackerType[],
    Error
  >({
    queryKey: ["maintenance-recors"],
    queryFn: async () => {
      const response = await apiClient.get("maintenance");
      return response.data;
    },
  });
  const handleStatusColor = (status: string) => {
    // Scheduled = "Scheduled",
    // InProgress = "In Progress",
    // Completed = "Completed",
    // Overdue = "Overdue",
    // Cancelled = "Cancelled",
    // Other = "Other",
    switch (status) {
      case "Scheduled":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-green-100 text-green-800";
      case "Completed":
        return "bg-blue-100 text-blue-800";
      case "Overdue":
        return "bg-yellow-300 text-yellow-850";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  return (
    <>
      <div className="flex justify-rleft items-center mx-10 my-10">
        <Link to={`create`}>
          <button className="bg-transparent hover:bg-zinc-900 text-neutral-100 bg-zinc-900 font-semibold hover:text-yellow-600 py-2 px-4 border bg-zinc-900 hover:border-transparent rounded mt-5">
            Create New Maintenance Record
          </button>
        </Link>
      </div>
      <table className="border-spacing-y-3 md:border-spacing-y-2 border-2 mx-10">
        <thead className="bg-zinc-900 text-neutral-100">
          <tr className="[&>th]:p-3">
            <th className="w-3/12  text-left">Vehicle</th>
            <th className="w-3/12 text-left">Maintenance Type</th>
            <th className="w-3/12 text-left">Maintenance Status</th>
            <th className="w-3/12 text-center">Action</th>
          </tr>
        </thead>
        <tbody className="text-neutral-500">
          {maintenanceRecord?.map((record) => (
            <tr key={record._id} className="border-b border-gray-200">
              <td className="p-3">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-lg font-semibold">
                      {record.vehicleMake} {record.vehicleModel}
                    </p>
                    <p className="text-sm text-gray-500">
                      VIN:{record.vehicleModel}
                    </p>
                  </div>
                </div>
              </td>
              <td className="p-3">{record.maintenanceType}</td>

              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded-full ${handleStatusColor(
                    record.maintenanceStatus
                  )}`}
                >
                  {record.maintenanceStatus}
                </span>
              </td>
              {/* record.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800" */}
              <td className="p-3 text-center">
                {record._id && (
                  <Link to={record._id} className="text-blue-600 underline">
                    Edit
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
