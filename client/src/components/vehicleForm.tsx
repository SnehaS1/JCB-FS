import React, { useState } from "react";
import axios from "axios";
import { MaintenanceStatus } from "../constants/enums";
import { saveVehicle } from "../api";
import { useNavigate } from "react-router-dom";

interface FormValues {
  make: string;
  vehicleModel: string;
  vin: string;
  status: string;
  mileage: number;
  type: string;
  maximumLoadCapacity: number;
  lastMaintenanceDate?: Date;
}

const initialFormValues: FormValues = {
  make: "",
  vehicleModel: "",
  vin: "",
  status: "",
  mileage: 0,
  type: "",
  maximumLoadCapacity: 0,
  lastMaintenanceDate: new Date(),
};

const VehicleForm: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [errors, setErrors] = useState<Partial<FormValues>>({});
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "lastMaintenanceDate") {
      setFormValues({ ...formValues, [name]: new Date(value) });
    }
    setFormValues({ ...formValues, [name]: value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors: Partial<FormValues> = {};
    if (!formValues.make) {
      validationErrors.make = "Make is required";
    } else if (!formValues.vehicleModel) {
      validationErrors.vehicleModel = "Make is required";
    } else if (!formValues.vin) {
      validationErrors.vin = "VIN is required";
    } else if (
      formValues.vin.length !== 17 ||
      formValues.vin.match(/[^A-Za-z0-9]/)
    ) {
      validationErrors.vin = "VIN must be 17 characters long";
    } else if (!formValues.status) {
      validationErrors.status = "Status is required";
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      saveVehicle(formValues).then((res) => {
        setFormValues(initialFormValues); // Reset form after submission
        setErrors({});
        navigate("/vehicle");
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="lg:flex lg:flex-wrap lg:mx-10 xs:mx-10 sm:mx-5"
    >
      <div className="lg:w-1/2 lg:pr-2 md:my-3 sm:my-3">
        <label htmlFor="name" className="block">
          Make:
        </label>
        <input
          type="text"
          id="make"
          name="make"
          value={formValues.make}
          onChange={handleChange}
          className="block w-full border border-gray-300 rounded-md px-4 py-2 mt-1"
        />
        {errors.make && <div className="text-red-500">{errors.make}</div>}
      </div>
      <div className="lg:w-1/2 lg:pr-2 md:my-3 sm:my-3">
        <label htmlFor="vehicleModel" className="block">
          Model:
        </label>
        <input
          type="text"
          id="vehicleModel"
          name="vehicleModel"
          value={formValues.vehicleModel}
          onChange={handleChange}
          className="block w-full border border-gray-300 rounded-md px-4 py-2 mt-1"
        />
        {errors.vehicleModel && (
          <div className="text-red-500">{errors.vehicleModel}</div>
        )}
      </div>
      <div className="lg:w-1/2 lg:pr-2 md:my-3 sm:my-3">
        <label htmlFor="vin" className="block">
          VIN:
        </label>
        <input
          type="text"
          id="vin"
          name="vin"
          value={formValues.vin}
          onChange={handleChange}
          className="block w-full border border-gray-300 rounded-md px-4 py-2 mt-1"
        />
        {errors.vin && <div className="text-red-500">{errors.vin}</div>}
      </div>
      <div className="lg:w-1/2 lg:pr-2 md:my-3 sm:my-3">
        <label htmlFor="status" className="block">
          Status:
        </label>
        {/* <input
          type="text"
          id="status"
          name="status"
          value={formValues.status}
          onChange={handleChange}
          className="block w-full border border-gray-300 rounded-md px-4 py-2 mt-1"
        /> */}
        <select
          id="status"
          name="status"
          defaultValue="Select Status"
          value={formValues.status}
          onChange={handleChange}
          className="block w-full border border-gray-300 rounded-md px-4 py-2 mt-1"
        >
          <option key="" value="">
            Select Status
          </option>
          {Object.values(MaintenanceStatus).map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        {errors.status && <div className="text-red-500">{errors.status}</div>}
      </div>
      <div className="lg:w-1/2 lg:pr-2 md:my-3 sm:my-3">
        <label htmlFor="type" className="block">
          Vehilce Type:
        </label>
        <input
          type="text"
          id="type"
          name="type"
          value={formValues.type}
          onChange={handleChange}
          className="block w-full border border-gray-300 rounded-md px-4 py-2 mt-1"
        />
        {errors.type && <div className="text-red-500">{errors.type}</div>}
      </div>
      <div className="lg:w-1/2 lg:pr-2 md:my-3 sm:my-3">
        <label htmlFor="mileage" className="block">
          Mileage:
        </label>
        <input
          type="text"
          id="mileage"
          name="mileage"
          value={formValues.mileage}
          onChange={handleChange}
          className="block w-full border border-gray-300 rounded-md px-4 py-2 mt-1"
        />
        {errors.mileage && <div className="text-red-500">{errors.mileage}</div>}
      </div>
      <div className="lg:w-1/2 lg:pr-2 md:my-3 sm:my-3">
        <label htmlFor="maximumLoadCapacity" className="block">
          Maximum Load Capacity:
        </label>
        <input
          type="text"
          id="maximumLoadCapacity"
          name="maximumLoadCapacity"
          value={formValues.maximumLoadCapacity}
          onChange={handleChange}
          className="block w-full border border-gray-300 rounded-md px-4 py-2 mt-1"
        />
        {errors.maximumLoadCapacity && (
          <div className="text-red-500">{errors.maximumLoadCapacity}</div>
        )}
      </div>
      <div className="lg:w-1/2 lg:pr-2 md:my-3 sm:my-3">
        {/* <label htmlFor="name" className="block">
          Last Maintenance Date:
        </label>
        <input
          type="date"
          id="lastMaintenanceDate"
          name="lastMaintenanceDate"
          placeholder="Select Date"
          value={
            formValues.lastMaintenanceDate
              ? formValues.lastMaintenanceDate.toISOString().split("T")[0]
              : ""
          }
          onChange={handleChange}
          className="block w-full border border-gray-300 rounded-md px-4 py-2 mt-1"
        /> */}
      </div>
      <button
        type="submit"
        className="lg:mt-4 lg:w-1/4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mb-10 mt-10"
      >
        Submit
      </button>
    </form>
  );
};

export default VehicleForm;
