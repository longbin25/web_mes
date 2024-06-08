import { MdOutlineSearch, MdCheck, MdSelectAll, MdCalendarMonth, MdTableRows } from "react-icons/md"
import { HiOutlineDotsHorizontal } from "react-icons/hi"
import { BsBarChartSteps } from "react-icons/bs"
import { FaRegEye, FaClock, FaWrench, FaTable } from "react-icons/fa"
function ProductionProgressSearchBar({
    searchInput,
    setSearchInput,
    filter,
    setFilter,
    displayStatus,
    setDisplayStatus,
}) {
    return (
        <>
            <div className="sticky -top-5  flex w-full rounded-xl bg-neutron-4 pt-5 pb-5">
                <input
                    className="h-10 flex-1 rounded-l-lg border bg-neutron-4 p-4"
                    placeholder="Tìm kiếm..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                ></input>
                <div className="mr-5 w-10 rounded-r-lg border border-primary-1 bg-primary-1 text-4xl text-neutron-4">
                    <MdOutlineSearch />
                </div>

                <div className="flex">
                    <div
                        onClick={() => setFilter("0")}
                        title="Tất cả"
                        className={`${filter == 0 && "!bg-maintenanceStatus-0 !text-neutron-4"} ${
                            filter != 0 && "border !border-maintenanceStatus-0 !bg-neutron-4 !text-maintenanceStatus-0"
                        }  flex h-10 w-10 cursor-pointer items-center justify-center rounded-l-lg   text-3xl transition-all`}
                    >
                        <MdSelectAll />
                    </div>
                    <div
                        onClick={() => setFilter("1")}
                        title="Chưa bắt đầu"
                        className={`${filter == 1 && "!bg-maintenanceStatus-1 !text-neutron-4"} ${
                            filter != 1 && "border !border-maintenanceStatus-1 !bg-neutron-4 !text-maintenanceStatus-1"
                        } ml-0.5 flex h-10 w-10 cursor-pointer items-center  justify-center text-3xl text-neutron-4 transition-all`}
                    >
                        <FaClock />
                    </div>
                    <div
                        onClick={() => setFilter("2")}
                        title="Đang thực hiện"
                        className={`${filter == 2 && "!bg-maintenanceStatus-2 !text-neutron-4"} ${
                            filter != 2 && "border !border-maintenanceStatus-2 !bg-neutron-4 !text-maintenanceStatus-2"
                        } ml-0.5 flex h-10 w-10 cursor-pointer items-center justify-center bg-maintenanceStatus-2  text-3xl text-neutron-4 transition-all`}
                    >
                        <HiOutlineDotsHorizontal />
                    </div>

                    <div
                        onClick={() => setFilter("3")}
                        title="Đã hoành thành"
                        className={`${filter == 3 && "!bg-maintenanceStatus-4 !text-neutron-4"} ${
                            filter != 3 && "border !border-maintenanceStatus-4 !bg-neutron-4 !text-maintenanceStatus-4"
                        } ml-0.5 flex h-10 w-10 cursor-pointer items-center justify-center  rounded-r-lg bg-maintenanceStatus-4 text-3xl text-neutron-4 transition-all`}
                    >
                        <MdCheck />
                    </div>
                </div>
                <>
                    <div
                        onClick={() => setDisplayStatus(0)}
                        title="Hiển thị dạng thẻ"
                        className={`${displayStatus == 0 && "!bg-maintenanceStatus-2 !text-neutron-4"} ${
                            displayStatus != 0 &&
                            "border !border-maintenanceStatus-2 !bg-neutron-4 !text-maintenanceStatus-2"
                        } ml-5 flex h-10 w-10 cursor-pointer items-center justify-center rounded-l-lg  bg-maintenanceStatus-2 text-3xl text-neutron-4 transition-all`}
                    >
                        <MdTableRows />
                    </div>
                </>
                <div
                    onClick={() => setDisplayStatus(1)}
                    title="Hiển thị dạng biểu đồ gantt"
                    className={`${displayStatus == 1 && "!bg-maintenanceStatus-2 !text-neutron-4"} ${
                        displayStatus != 1 &&
                        "border !border-maintenanceStatus-2 !bg-neutron-4 !text-maintenanceStatus-2"
                    } ml-0.5 flex h-10 w-10 cursor-pointer items-center justify-center   bg-maintenanceStatus-2 text-3xl text-neutron-4 transition-all`}
                >
                    <BsBarChartSteps />
                </div>
                <div
                    onClick={() => setDisplayStatus(2)}
                    title="Hiển thị dạng lịch"
                    className={`${displayStatus == 2 && "!bg-maintenanceStatus-2 !text-neutron-4"} ${
                        displayStatus != 2 &&
                        "border !border-maintenanceStatus-2 !bg-neutron-4 !text-maintenanceStatus-2"
                    } ml-0.5 flex h-10 w-10 cursor-pointer items-center justify-center rounded-r-lg bg-maintenanceStatus-2 text-3xl text-neutron-4 transition-all`}
                >
                    <MdCalendarMonth />
                </div>
            </div>
        </>
    )
}

export default ProductionProgressSearchBar
