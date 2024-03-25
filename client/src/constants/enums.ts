enum MaintenanceStatus {
  Scheduled = "Scheduled",
  InProgress = "In Progress",
  Completed = "Completed",
  Overdue = "Overdue",
  Cancelled = "Cancelled",
  Other = "Other",
}
enum MaintenanceType {
  RegularMaintenance = "Regular Maintenance",
  PreventiveMaintenance = "Preventive Maintenance",
  CorrectiveMaintenance = "Corrective Maintenance",
  EmergencyMaintenance = "Emergency Maintenance",
  PredictiveMaintenance = "Predictive Maintenance",
  SeasonalMaintenance = "Seasonal Maintenance",
  FleetMaintenance = "Fleet Maintenance",
  Oiling = "Oiling",
}

export { MaintenanceStatus, MaintenanceType };
