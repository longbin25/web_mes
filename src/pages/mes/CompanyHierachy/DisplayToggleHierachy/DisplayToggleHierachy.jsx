import { RiNodeTree } from "react-icons/ri"
import { SlOrganization } from "react-icons/sl"
function DisplayToggleHierachy({ filter, setFilter }) {
    return (
        <div className="flex ">
            <div
                onClick={() => setFilter("0")}
                title="Hiển thị dạng tree view"
                className={`${filter == 0 && "!bg-maintenanceStatus-4 !text-neutron-4"} ${
                    filter != 0 && "border !border-maintenanceStatus-4 !bg-neutron-4 !text-maintenanceStatus-4"
                } ml-auto flex h-10 w-10 cursor-pointer items-center justify-center  rounded-l-lg bg-maintenanceStatus-4 text-3xl text-neutron-4 transition-all`}
            >
                <RiNodeTree />
            </div>
            <div
                onClick={() => setFilter("1")}
                title="Hiển thị dạng organization chart"
                className={`${filter == 1 && "!bg-maintenanceStatus-2 !text-neutron-4"} ${
                    filter != 1 && "border !border-maintenanceStatus-2 !bg-neutron-4 !text-maintenanceStatus-2"
                } ml-0.5 flex h-10 w-10 cursor-pointer items-center justify-center  rounded-r-lg bg-maintenanceStatus-2 text-3xl text-neutron-4 transition-all`}
            >
                <SlOrganization />
            </div>
        </div>
    )
}

export default DisplayToggleHierachy
