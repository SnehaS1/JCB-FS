import { useEffect, useState } from "react";
import { getVehicles } from "../api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import VehicleList from "../components/vehicleList";
import VehicleForm from "../components/vehicleForm";
import { Link } from "react-router-dom";

export default function VehiclePage() {
  const [vehicles, setVehicles] = useState<VehicleType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data: VehicleType[] = (await getVehicles().then(
        (res) => res.data
      )) as VehicleType[];
      setVehicles(data);
    };
    fetchData();
  }, []);
  return (
    <div className="space-y-2 overflow-x-auto mx-10">
      <Link to={`create`}>
        <button className="bg-transparent hover:bg-zinc-900 text-neutral-100 bg-zinc-900 font-semibold hover:text-yellow-600 py-2 px-4 border bg-zinc-900 hover:border-transparent rounded mt-5">
          Add New Vehicle
        </button>
      </Link>
      <div>
        {vehicles.length > 0 ? (
          <VehicleList vehicles={vehicles} />
        ) : (
          <h1>No Vehicles</h1>
        )}
      </div>
    </div>
  );
}
