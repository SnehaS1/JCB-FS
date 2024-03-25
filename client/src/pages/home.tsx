import { useEffect, useState } from "react";
import VehicleCapacityDashboard from "../components/vehicleCapacityDashboard";
import axios from "axios";
import VehicleSpeedDashboard from "../components/vehicleSpeedDashboard";
import { getVehicleTrackRecord, getVehicles } from "../api";
import LiveSpeedDashboard from "../components/liveDataDashboard";

export default function HomePage() {
  const [vehicles, setVehicles] = useState<VehicleType[]>([]);
  const [vehiclesSpeed, setVehicleSpeed] = useState<VehicleTrackerType[]>([]);

  const url = process.env.REACT_APP_API_URL;
  console.log(url, "url");
  useEffect(() => {
    const fetchData = async () => {
      const data: VehicleType[] = (await getVehicles().then(
        (res) => res.data
      )) as VehicleType[];
      setVehicles(data);
    };

    const fetchTrackData = async () => {
      const data: VehicleTrackerType[] = (await getVehicleTrackRecord().then(
        (res) => res.data
      )) as VehicleTrackerType[];
      setVehicleSpeed(data);
    };
    fetchData();
    fetchTrackData();
  }, []);
  return (
    <div className="flex flex-col justify-center items-center mx-10 my-10 ">
      <h1>Home Page</h1>
      <p>Home page content</p>
      <div className="mx-5">{/* <LiveSpeedDashboard /> */}</div>
      <div className="flex md:flex-row gap-4 mx-5 sm:flex-column w-4/5">
        <VehicleCapacityDashboard vehiclesList={vehicles} />
        <VehicleSpeedDashboard vehiclesList={vehiclesSpeed} />
      </div>
    </div>
  );
}
