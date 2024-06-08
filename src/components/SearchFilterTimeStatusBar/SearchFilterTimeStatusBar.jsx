import { MdOutlineSearch, MdCheck, MdSelectAll, MdDelete } from "react-icons/md"
import { HiOutlineDotsHorizontal } from "react-icons/hi"
import { FaRegEye, FaClock, FaWrench, FaCalendarAlt } from "react-icons/fa"
function SearchFilterTimeStatusBar({
    searchInput,
    setSearchInput,
    filter,
    setFilter,
    dayStart,
    setDayStart,
    dayEnd,
    setDayEnd,
    stateFilter,
    setStateFilter,
    type = "CMMSMaintenance",
    setDeleteScheduleModal,
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
                {type == "CMMSMaintenance" && (
                    <>
                        <div className="mr-1 flex w-28 items-center justify-center">
                            <h4>Ngày bắt đầu</h4>
                        </div>
                        <input
                            className="mr-5 h-10 w-60 cursor-pointer rounded-lg border bg-neutron-4 p-4"
                            value={dayStart}
                            onChange={(e) => setDayStart(e.target.value)}
                            type="datetime-local"
                        ></input>
                        <div className="mr-1 flex w-28 items-center justify-center">
                            <h4>Ngày kết thúc</h4>
                        </div>
                        <input
                            className="mr-5 h-10 w-60 cursor-pointer rounded-lg border bg-neutron-4 p-4"
                            value={dayEnd}
                            onChange={(e) => setDayEnd(e.target.value)}
                            type="datetime-local"
                        ></input>
                    </>
                )}

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
                    {type == "CMMSMaintenance" && (
                        <>
                            <div
                                onClick={() => setFilter("3")}
                                title="Đang chờ xem xét"
                                className={`${filter == 3 && "!bg-maintenanceStatus-3 !text-neutron-4"} ${
                                    filter != 3 &&
                                    "border !border-maintenanceStatus-3 !bg-neutron-4 !text-maintenanceStatus-3"
                                } ml-0.5 flex h-10 w-10 cursor-pointer items-center justify-center bg-maintenanceStatus-3 text-3xl text-neutron-4 transition-all`}
                            >
                                <FaRegEye />
                            </div>
                            <div
                                onClick={() => setFilter("4")}
                                title="Đã hoành thành"
                                className={`${filter == 4 && "!bg-maintenanceStatus-4 !text-neutron-4"} ${
                                    filter != 4 &&
                                    "border !border-maintenanceStatus-4 !bg-neutron-4 !text-maintenanceStatus-4"
                                } ml-0.5 flex h-10 w-10 cursor-pointer items-center justify-center  rounded-r-lg bg-maintenanceStatus-4 text-3xl text-neutron-4 transition-all`}
                            >
                                <MdCheck />
                            </div>
                        </>
                    )}
                    {type == "MESProductionProgress" && (
                        <>
                            <div
                                onClick={() => setFilter("3")}
                                title="Đã hoành thành"
                                className={`${filter == 3 && "!bg-maintenanceStatus-4 !text-neutron-4"} ${
                                    filter != 3 &&
                                    "border !border-maintenanceStatus-4 !bg-neutron-4 !text-maintenanceStatus-4"
                                } ml-0.5 flex h-10 w-10 cursor-pointer items-center justify-center  rounded-r-lg bg-maintenanceStatus-4 text-3xl text-neutron-4 transition-all`}
                            >
                                <MdCheck />
                            </div>
                        </>
                    )}
                </div>
                <div>
                    {type == "CMMSMaintenance" && (
                        <div className="ml-5 flex">
                            <div
                                onClick={() => setStateFilter("0")}
                                title="Hiện tất cả"
                                className={`${stateFilter == 0 && "!bg-maintenanceStatus-0 !text-neutron-4"} ${
                                    stateFilter != 0 &&
                                    "border !border-maintenanceStatus-0 !bg-neutron-4 !text-maintenanceStatus-0"
                                }  flex h-10 w-10 cursor-pointer items-center justify-center rounded-l-lg bg-[#FFAF45] text-3xl text-neutron-4 transition-all`}
                            >
                                <MdSelectAll />
                            </div>
                            <div
                                onClick={() => setStateFilter("1")}
                                title="Bảo trì theo lịch"
                                className={`${stateFilter == 1 && "!bg-maintenanceStatus-4 !text-neutron-4"} ${
                                    stateFilter != 1 &&
                                    "border !border-maintenanceStatus-4 !bg-neutron-4 !text-maintenanceStatus-4"
                                } ml-0.5 flex h-10 w-10 cursor-pointer items-center justify-center  bg-maintenanceStatus-4 text-3xl text-neutron-4 transition-all`}
                            >
                                <FaCalendarAlt />
                            </div>
                            <div
                                onClick={() => setStateFilter("2")}
                                title="Bảo trì khắc phục"
                                className={`${stateFilter == 2 && "!bg-maintenanceStatus-1 !text-neutron-4"} ${
                                    stateFilter != 2 &&
                                    "border !border-maintenanceStatus-1 !bg-neutron-4 !text-maintenanceStatus-1"
                                } ml-0.5 flex h-10 w-10 cursor-pointer items-center justify-center rounded-r-lg bg-maintenanceStatus-1 text-3xl text-neutron-4 transition-all`}
                            >
                                <FaWrench />
                            </div>
                            {/* <div
                                onClick={() =>
                                    setDeleteScheduleModal({
                                        actived: true,
                                    })
                                }
                                title="Xóa công việc bảo trì theo năm"
                                className={`ml-5 flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg !bg-maintenanceStatus-1 text-3xl  text-neutron-4 transition-all`}
                            >
                                <MdDelete />
                            </div> */}
                        </div>
                    )}
                </div>
                {/* <h2>Số lượng hiện tại</h2> */}
            </div>
        </>
    )
}

export default SearchFilterTimeStatusBar
