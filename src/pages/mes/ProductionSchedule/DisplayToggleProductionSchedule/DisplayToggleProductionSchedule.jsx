import { MdTableRows } from "react-icons/md"
import { FaTable } from "react-icons/fa"
import { MdCheck, MdSelectAll } from "react-icons/md"
import { HiOutlineDotsHorizontal } from "react-icons/hi"
import { FaClock } from "react-icons/fa"
import { MdCalendarMonth } from "react-icons/md"
function DisplayToggleProductionSchedule({ filter, setFilter, status, setStatus, keyValue, setKeyValue }) {
    return (
        <div className="flex ">
            {/* <div
                onClick={() => {
                    setStatus(0)
                }}
                title="Tất cả"
                className={`${status == 0 && "!bg-maintenanceStatus-0 !text-neutron-4"} ${
                    status != 0 && "border !border-maintenanceStatus-0 !bg-neutron-4 !text-maintenanceStatus-0"
                } ml-auto flex h-10 w-10 cursor-pointer items-center justify-center rounded-l-lg   text-3xl transition-all`}
            >
                <MdSelectAll />
            </div>
            <div
                onClick={() => {
                    setStatus(1)
                }}
                title="Chưa bắt đầu"
                className={`${status == 1 && "!bg-maintenanceStatus-1 !text-neutron-4"} ${
                    status != 1 && "border !border-maintenanceStatus-1 !bg-neutron-4 !text-maintenanceStatus-1"
                } ml-0.5 flex h-10 w-10 cursor-pointer items-center  justify-center text-3xl text-neutron-4 transition-all`}
            >
                <FaClock />
            </div>
            <div
                onClick={() => {
                    setStatus(2)
                }}
                title="Đang thực hiện"
                className={`${status == 2 && "!bg-maintenanceStatus-2 !text-neutron-4"} ${
                    status != 2 && "border !border-maintenanceStatus-2 !bg-neutron-4 !text-maintenanceStatus-2"
                } ml-0.5 flex h-10 w-10 cursor-pointer items-center justify-center bg-maintenanceStatus-2  text-3xl text-neutron-4 transition-all`}
            >
                <HiOutlineDotsHorizontal />
            </div>
            <div
                onClick={() => {
                    setStatus(3)
                }}
                title="Đã hoành thành"
                className={`${status == 3 && "!bg-maintenanceStatus-4 !text-neutron-4"} ${
                    status != 3 && "border !border-maintenanceStatus-4 !bg-neutron-4 !text-maintenanceStatus-4"
                } ml-0.5 flex h-10 w-10 cursor-pointer items-center justify-center  rounded-r-lg bg-maintenanceStatus-4 text-3xl text-neutron-4 transition-all`}
            >
                <MdCheck />
            </div> */}
            <div
                onClick={() => setFilter(0)}
                title="Hiển thị dạng biểu đồ gantt"
                className={`${filter == 0 && "!bg-maintenanceStatus-2 !text-neutron-4"} ${
                    filter != 0 && "border !border-maintenanceStatus-2 !bg-neutron-4 !text-maintenanceStatus-2"
                } ml-auto flex h-10 w-10 cursor-pointer items-center justify-center  rounded-l-lg bg-maintenanceStatus-2 text-3xl text-neutron-4 transition-all`}
            >
                <MdTableRows />
            </div>
            <div
                onClick={() => setFilter(1)}
                title="Hiển thị dạng lịch"
                className={`${filter == 1 && "!bg-maintenanceStatus-2 !text-neutron-4"} ${
                    filter != 1 && "border !border-maintenanceStatus-2 !bg-neutron-4 !text-maintenanceStatus-2"
                } ml-0.5 flex h-10 w-10 cursor-pointer items-center justify-center  bg-maintenanceStatus-2 text-3xl text-neutron-4 transition-all`}
            >
                <MdCalendarMonth />
            </div>
            <div
                onClick={() => setFilter(2)}
                title="Hiển thị dạng bảng"
                className={`${filter == 2 && "!bg-maintenanceStatus-2 !text-neutron-4"} ${
                    filter != 2 && "border !border-maintenanceStatus-2 !bg-neutron-4 !text-maintenanceStatus-2"
                } ml-0.5 flex h-10 w-10 cursor-pointer items-center justify-center  rounded-r-lg bg-maintenanceStatus-2 text-3xl text-neutron-4 transition-all`}
            >
                <FaTable />
            </div>
        </div>
    )
}

export default DisplayToggleProductionSchedule
