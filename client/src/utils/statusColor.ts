import { MaintenanceStatus } from "../constants/enums";

const handleStatusColor = (status: string) => {
  switch (status) {
    case MaintenanceStatus.Scheduled:
      return "bg-green-100 text-green-800";
    case MaintenanceStatus.InProgress:
      return "bg-green-100 text-green-800";
    case MaintenanceStatus.Completed:
      return "bg-blue-100 text-blue-800";
    case MaintenanceStatus.Overdue:
      return "bg-yellow-300 text-yellow-850";
    case MaintenanceStatus.Cancelled:
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default handleStatusColor;
