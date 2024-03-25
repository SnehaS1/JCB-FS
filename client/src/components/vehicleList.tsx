import handleStatusColor from "../utils/statusColor";

export default function VehicleList({ vehicles }: { vehicles: VehicleType[] }) {
  return (
    <div className="space-y-2 overflow-x-auto mx-10">
      <h2 className="m-5 font-bold text-2xl text-center">
        List of Heavy Vehicles:
      </h2>
      <table className="w-full border-spacing-y-3 md:border-spacing-y-2 border-2">
        <thead className="bg-zinc-900 text-neutral-100">
          <tr className="[&>th]:p-3">
            <th className="w-8/12 min-w-[20rem] text-left">Vehicle</th>
            <th className="w-1/12 text-left">Uploaded</th>
            <th className="w-1/12 text-left">Type</th>
            <th className="w-2/12 text-left min-w-[12rem]">Status</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
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
              <td className="p-3">{vehicle.vehicleModel}</td>
              <td className="p-3">{vehicle.type}</td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded-full ${handleStatusColor(
                    vehicle.status
                  )}`}
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
