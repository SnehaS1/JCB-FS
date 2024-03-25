interface ITodo {
  _id: string;
  name: string;
  description: string;
  status: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface TodoProps {
  todo: ITodo;
}

type ApiDataType = {
  message: string;
  status: string;
  todos: ITodo[];
  todo?: ITodo;
};

type VehicleType = {
  make: string;
  vehicleModel: string;
  registrationNumber: string;
  vin: string;
  year: number;
  mileage: number;
  type: string;
  lastMaintenanceDate: Date;
  status: string;
};

interface VehicleTrackerType extends VehicleType {
  location: {
    latitude: number;
    longitude: number;
  };
  speed: string;
  _id?: string;
  vehicleMake?: string;
  vehicleModel?: string;
  maintenanceType: string;
  maintenanceStatus: string;
}
