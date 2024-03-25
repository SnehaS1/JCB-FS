import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate, useRoutes } from "react-router-dom";
import apiClient from "../http-common";
import { MaintenanceStatus, MaintenanceType } from "../constants/enums";
import { saveMaintenance } from "../api";

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

export default function UpsertMaintenancePage() {
  const { id } = useParams();
  const isUpsert = id !== "create"; //true if update, false if create
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [errors, setErrors] = useState<Partial<FormValues>>({});
  const [vehicleList, setVehicleList] =
    useState<VehicleListType[]>(initialVehicleValues);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}vehicleList`).then((res) => {
      const vehicleList: VehicleListType[] = res.data.map(
        (vehicle: VehicleType) => ({
          value: vehicle.vin,
          label: `${vehicle.make} ${vehicle.vehicleModel}`,
        })
      );
      setVehicleList(vehicleList);
    });

    if (isUpsert) {
      axios
        .get(`http://localhost:8080/api/v1/maintenance/${id}`)
        .then((res) => {
          setFormValues(res.data);
        });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors: Partial<FormValues> = {};
    if (!formValues.vehicleId) {
      validationErrors.vehicleId = "Vehicle is required";
    } else if (!formValues.maintenanceType) {
      validationErrors.maintenanceType = "Maintenance Type is required";
    } else if (!formValues.maintenanceStatus) {
      validationErrors.maintenanceStatus = "Maintenance Status is required";
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const formDataPost = {
        vehicleId: formValues.vehicleId,
        maintenanceType: formValues.maintenanceType,
        description: formValues.description,
        maintenanceStatus: formValues.maintenanceStatus,
      };
      if (isUpsert) {
        const response = await axios.put(
          `http://localhost:8080/api/v1/maintenance/${id}`,
          {
            maintenanceType: formValues.maintenanceType,
            description: formValues.description,
            maintenanceStatus: formValues.maintenanceStatus,
          }
        );
        setFormValues(initialFormValues); // Reset form after submission
        setErrors({});
        navigate("/maintenance");
      }
      const response = saveMaintenance(formDataPost).then((res) => {
        console.log(res, "res");
      });
      // const response = await axios.post(
      //   "http://localhost:8080/api/v1/maintenance",
      //   {
      //     vehicleId: formValues.vehicleId.trim(),
      //     maintenanceType: formValues.maintenanceType,
      //     description: formValues.description,
      //     maintenanceStatus: formValues.maintenanceStatus,
      //   }
      // );
      setFormValues(initialFormValues); // Reset form after submission
      setErrors({});
      navigate("/maintenance");
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  return (
    <div className="flex flex-col justify-center align-middle my-10">
      <h2 className="text-center m-5 font-bold text-2xl">
        {!isUpsert ? "Create" : "Edit"} Maintenance Record
      </h2>
      <form
        className="lg:flex lg:flex-wrap lg:mx-10 xs:mx-10 sm:mx-5 md:mt-5 md:mx-10"
        onSubmit={handleSubmit}
      >
        {/* {isUpsert && (
          <>
            <div className="lg:w-1/2 lg:pr-2 md:my-3 sm:my-3">
              <label htmlFor="name" className="block">
                Vehicle Model:
              </label>
              <input
                type="text"
                id="vehicleMake"
                name="vehicleMake"
                disabled={isUpsert}
                value={formValues.vehicleMake}
                className="block w-full border border-gray-300 rounded-md px-4 py-2 mt-1"
              />
            </div>
            <div className="lg:w-1/2 lg:pr-2 md:my-3 sm:my-3">
              <label htmlFor="name" className="block">
                Vehicle Model:
              </label>
              <input
                type="text"
                id="vehicleModel"
                name="vehicleModel"
                value={formValues.vehicleModel}
                className="block w-full border border-gray-300 rounded-md px-4 py-2 mt-1"
              />
            </div>
          </>
        )} */}
        <div className="lg:w-1/2 lg:pr-2 md:my-3 sm:my-3">
          <label htmlFor="name" className="block">
            Vehicle:
          </label>
          <select
            id="vehicleId"
            defaultValue=""
            name="vehicleId"
            disabled={isUpsert}
            value={formValues.vehicleId}
            className="block w-full border border-gray-300 rounded-md px-4 py-2 mt-1"
            onChange={handleSelectChange}
          >
            <option value="">
              <span className="text-slate-800">Select Vehicle</span>
            </option>
            {vehicleList.map((vehicle) => (
              <option value={vehicle.value}>{vehicle.label}</option>
            ))}
          </select>
          {errors.vehicleId && (
            <div className="text-red-500">{errors.vehicleId}</div>
          )}
        </div>
        <div className="lg:w-1/2 lg:pr-2 md:my-3 sm:my-3">
          <label htmlFor="name" className="block">
            Vehicle VIN Id:
          </label>
          <input
            type="text"
            id="vehicleId"
            name="vehicleId"
            disabled={true}
            value={formValues.vehicleId}
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-md px-4 py-2 mt-1"
          />
        </div>
        <div className="lg:w-1/2 lg:pr-2 md:my-3 sm:my-3">
          <label htmlFor="name" className="block">
            Maintenance Type:
          </label>
          <select
            id="maintenanceType"
            name="maintenanceType"
            className="block w-full border border-gray-300 rounded-md px-4 py-2 mt-1"
            onChange={handleSelectChange}
            value={formValues.maintenanceType}
          >
            <option key="" value="">
              Select Maintenance Type
            </option>
            {Object.values(MaintenanceType).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.maintenanceType && (
            <div className="text-red-500">{errors.maintenanceType}</div>
          )}
        </div>
        <div className="lg:w-1/2 lg:pr-2 md:my-3 sm:my-3">
          <label htmlFor="name" className="block">
            Maintenance Status:
          </label>
          <select
            id="maintenanceStatus"
            name="maintenanceStatus"
            className="block w-full border border-gray-300 rounded-md px-4 py-2 mt-1"
            onChange={handleSelectChange}
            value={formValues.maintenanceStatus}
          >
            <option key="" value="">
              Select Maintenance Status
            </option>
            {Object.values(MaintenanceStatus).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          {errors.maintenanceStatus && (
            <div className="text-red-500">{errors.maintenanceStatus}</div>
          )}
        </div>
        <div className="lg:w-1/2 lg:pr-2 md:my-3 sm:my-3">
          <label htmlFor="name" className="block">
            Maintenance Description:
          </label>
          <input
            type="text-area"
            id="description"
            name="description"
            value={formValues.description}
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-md px-4 py-2 mt-1"
          />
          {errors.description && (
            <div className="text-red-500">{errors.description}</div>
          )}
        </div>
        <div className="lg:w-1/2 lg:pr-2 md:my-3 sm:my-3"></div>
        <button
          type="submit"
          className="bg-transparent text-neutral-100 hover:bg-zinc-900 bg-zinc-900 font-semibold hover:text-yellow-600 py-2 px-4 border bg-zinc-900 hover:border-transparent rounded mt-5"
        >
          {isUpsert ? "Edit" : "Create New"} Maintenance
        </button>
        {Object.keys(errors).length > 0 && (
          <div className="text-red-500">Please fix the errors above</div>
        )}
      </form>
    </div>
  );
}
