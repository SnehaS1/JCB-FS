import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import apiClient from ".././http-common";

export default function TrackVehiclePage() {
  const { data: trackedVehicles, error } = useQuery<
    VehicleTrackerType[],
    Error
  >({
    queryKey: ["track-vehicles"],
    queryFn: async () => {
      const response = await apiClient.get("/vehicleTracker");
      return response.data;
    },
  });
  return (
    <div className="flex flex-col justify-center items-center mx-10 my-10">
      <h2 className="m-5 font-bold text-2xl">Track Vehicle Info from IOT </h2>
      <table className="w-full border-spacing-y-3 md:border-spacing-y-2 border-2">
        <thead className="bg-zinc-900 text-neutral-100">
          <tr className="[&>th]:p-3">
            <th className="w-4/12 min-w-[20rem] text-left">Vehicle</th>
            <th className="w-3/12 text-left">Location</th>
            <th className="w-2/12 text-left">Speed</th>
            <th className="w-2/12 text-left min-w-[12rem]">Status</th>
          </tr>
        </thead>
        <tbody className="text-neutral-500">
          {trackedVehicles?.map((vehicle) => (
            <tr key={vehicle.vin} className="border-b border-gray-200">
              <td className="p-3">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-lg font-semibold">
                      {vehicle.make} {vehicle.vehicleModel}
                    </p>
                    <p className="text-sm text-gray-500">VIN:{vehicle.vin}</p>
                  </div>
                </div>
              </td>
              <td className="p-3">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-sm text-gray-500">
                      {vehicle.location.latitude}{" "}
                      {Math.random() < 0.5 ? "E" : "W"},{" "}
                      {vehicle.location.longitude}{" "}
                      {Math.random() < 0.5 ? "N" : "S"}
                    </p>
                  </div>
                </div>
              </td>
              <td className="p-3">
                {vehicle.speed} {" km/h"}
              </td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded-full ${
                    vehicle.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {vehicle.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
