import axios, { AxiosResponse } from "axios";
type MaintenanceFormType = {
  vehicleId: string;
  maintenanceType: string;
  description: string;
  maintenanceStatus: string;
};
interface FormVehicleValues {
  make: string;
  vehicleModel: string;
  vin: string;
  status: string;
  mileage: number;
  type: string;
  maximumLoadCapacity: number;
  lastMaintenanceDate?: Date;
}
const baseUrl: string =
  process.env.REACT_APP_API_URL || "http://localhost:8080/api/v1";

export const getVehicles = async (): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const vehicles: AxiosResponse<ApiDataType> = await axios.get(
      baseUrl + "vehicleList"
    );
    console.log(vehicles, "vehicles api");
    return vehicles;
  } catch (error) {
    throw new Error("Unable to connect to the API");
  }
};
export const getVehicleTrackRecord = async (): Promise<
  AxiosResponse<ApiDataType>
> => {
  try {
    const vehicles: AxiosResponse<ApiDataType> = await axios.get(
      baseUrl + "vehicleTracker"
    );
    console.log(vehicles, "vehicles tracker api");
    return vehicles;
  } catch (error) {
    throw new Error("Unable to connect to the API");
  }
};

export const getTodos = async (): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const todos: AxiosResponse<ApiDataType> = await axios.get(
      baseUrl + "/todos"
    );
    return todos;
  } catch (error) {
    throw new Error("Unable to connect to the API");
  }
};
export const saveVehicle = async (
  formData: FormVehicleValues
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    // const formDataPost: Omit<MaintenanceFormType, "_id"> = {
    //   vehicleId: formData.vehicleId,
    //   maintenanceType: formData.maintenanceType,
    //   description: formData.description,
    //   maintenanceStatus: formData.maintenanceStatus,
    // };
    const saveVehicle: AxiosResponse<ApiDataType> = await axios.post(
      baseUrl + "vehicleList",
      formData
    );
    console.log(saveVehicle, "saveVehicle");
    return saveVehicle;
  } catch (error) {
    throw new Error("Unable to connect to the API");
  }
};
export const saveMaintenance = async (
  formData: MaintenanceFormType
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const formDataPost: Omit<MaintenanceFormType, "_id"> = {
      vehicleId: formData.vehicleId,
      maintenanceType: formData.maintenanceType,
      description: formData.description,
      maintenanceStatus: formData.maintenanceStatus,
    };
    const saveMaintenance: AxiosResponse<ApiDataType> = await axios.post(
      baseUrl + "maintenance",
      formDataPost
    );
    return saveMaintenance;
  } catch (error) {
    throw new Error("Unable to connect to the API");
  }
};

export const updateTodo = async (
  todo: ITodo
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const todoUpdate: Pick<ITodo, "status"> = {
      status: true,
    };
    const updatedTodo: AxiosResponse<ApiDataType> = await axios.put(
      `${baseUrl}/edit-todo/${todo._id}`,
      todoUpdate
    );
    return updatedTodo;
  } catch (error) {
    throw new Error("Unable to connect to the API");
  }
};

export const deleteTodo = async (
  _id: string
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const deletedTodo: AxiosResponse<ApiDataType> = await axios.delete(
      `${baseUrl}/delete-todo/${_id}`
    );
    return deletedTodo;
  } catch (error) {
    throw new Error("Unable to connect to the API");
  }
};
