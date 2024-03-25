import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import AboutPage from "./pages/about";
import Sidebar from "./components/sidebar";
import VehiclePage from "./pages/vehicles";
import apiClient from "./http-common";
import TrackVehiclePage from "./pages/track";
import MaintenancePage from "./pages/maintenance";
import UpsertMaintenancePage from "./pages/upsertMaintenance";
import HomePage from "./pages/home";
import UpsertVehiclePage from "./pages/upsertVehicle";

function App() {
  return (
    <div className="App">
      <Navbar />
      {/* <Sidebar/> */}
      <div className="conatineVehicle">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vehicle" element={<VehiclePage />} />
          <Route path="/vehicle/:id" element={<UpsertVehiclePage />} />
          <Route path="/track" element={<TrackVehiclePage />} />
          <Route path="/maintenance" element={<MaintenancePage />} />
          <Route path="/maintenance/:id" element={<UpsertMaintenancePage />} />

          {/* <Route path="/about" element={<About />} /> */}
        </Routes>
      </div>
      {/* <Sidebar /> */}
    </div>
  );
}

export default App;
