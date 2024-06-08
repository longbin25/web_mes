import { MdTableRows } from "react-icons/md"
import { FaTable } from "react-icons/fa"
import { MdCheck, MdSelectAll } from "react-icons/md"
import { HiOutlineDotsHorizontal } from "react-icons/hi"
import { FaClock } from "react-icons/fa"
import { BsBarChartSteps } from "react-icons/bs"
import { MdCalendarMonth } from "react-icons/md"
function ProductSchedulingDisplayToggle({ filter, setFilter, status, setStatus, keyValue, setKeyValue }) {
    return (
        <div className="flex ">
            <div
                onClick={() => setFilter(0)}
                title="Hiển thị dạng bảng"
                className={`${filter == 0 && "!bg-maintenanceStatus-2 !text-neutron-4"} ${
                    filter != 0 && "border !border-maintenanceStatus-2 !bg-neutron-4 !text-maintenanceStatus-2"
                } ml-auto flex h-10 w-10 cursor-pointer items-center justify-center  rounded-l-lg bg-maintenanceStatus-2 text-3xl text-neutron-4 transition-all`}
            >
                <FaTable />
            </div>
            <div
                onClick={() => setFilter(1)}
                title="Hiển thị dạng biểu đồ gantt"
                className={`${filter == 1 && "!bg-maintenanceStatus-2 !text-neutron-4"} ${
                    filter != 1 && "border !border-maintenanceStatus-2 !bg-neutron-4 !text-maintenanceStatus-2"
                } ml-0.5 flex h-10 w-10 cursor-pointer items-center justify-center  bg-maintenanceStatus-2 text-3xl text-neutron-4 transition-all`}
            >
                <BsBarChartSteps />
            </div>
            <div
                onClick={() => setFilter(2)}
                title="Hiển thị tất cả"
                className={`${filter == 2 && "!bg-maintenanceStatus-2 !text-neutron-4"} ${
                    filter != 2 && "border !border-maintenanceStatus-2 !bg-neutron-4 !text-maintenanceStatus-2"
                } ml-0.5 flex h-10 w-10 cursor-pointer items-center justify-center  rounded-r-lg bg-maintenanceStatus-2 text-3xl text-neutron-4 transition-all`}
            >
                <MdSelectAll />
            </div>
        </div>
    )
}

export default ProductSchedulingDisplayToggle
