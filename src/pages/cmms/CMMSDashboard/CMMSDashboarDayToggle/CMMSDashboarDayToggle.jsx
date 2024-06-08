import { MdTableRows } from "react-icons/md"
import { FaTable } from "react-icons/fa"
function CMMSDashboarDayToggle({ filter, setFilter }) {
    return (
        <div className="flex ">
            <div
                onClick={() => setFilter(0)}
                title="Lọc theo ngày"
                className={`${filter == 0 && "!bg-maintenanceStatus-4 !text-neutron-4"} ${
                    filter != 0 && "border !border-maintenanceStatus-4 !bg-neutron-4 !text-maintenanceStatus-4"
                } ml-auto flex h-10 w-10 cursor-pointer items-center justify-center  rounded-l-lg bg-maintenanceStatus-4 text-3xl text-neutron-4 transition-all`}
            >
                1
            </div>
            <div
                onClick={() => setFilter(1)}
                title="Lọc theo tuần"
                className={`${filter == 1 && "!bg-maintenanceStatus-4 !text-neutron-4"} ${
                    filter != 1 && "border !border-maintenanceStatus-4 !bg-neutron-4 !text-maintenanceStatus-4"
                } ml-0.5 flex h-10 w-10 cursor-pointer items-center justify-center  bg-maintenanceStatus-4 text-3xl text-neutron-4 transition-all`}
            >
                7
            </div>
            <div
                onClick={() => setFilter(2)}
                title="Lọc theo tháng"
                className={`${filter == 2 && "!bg-maintenanceStatus-4 !text-neutron-4"} ${
                    filter != 2 && "border !border-maintenanceStatus-4 !bg-neutron-4 !text-maintenanceStatus-4"
                } ml-0.5 flex h-10 w-10 cursor-pointer items-center justify-center  rounded-r-lg bg-maintenanceStatus-4 text-3xl text-neutron-4 transition-all`}
            >
                30
            </div>
        </div>
    )
}

export default CMMSDashboarDayToggle
