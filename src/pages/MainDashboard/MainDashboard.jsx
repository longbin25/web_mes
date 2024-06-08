import { MdNotifications } from "react-icons/md"
import { FaUser, FaWarehouse, FaWrench } from "react-icons/fa"
import { BsGearFill } from "react-icons/bs"
import { TbHeartRateMonitor } from "react-icons/tb"
import LogoHCMUT from "@/assets/logo/logo-hcmut.png"
import { useNavigate } from "react-router-dom"
import { useCallApi } from "@/hooks"
import { authorizationApi } from "@/services/api"
import UserInfor from "@/components/UserInfor"
import Loading from "@/components/Layout/components/Loading"
function MainDashboard() {
    const callApi = useCallApi()

    const navigate = useNavigate()
    const handleClick = (route) => {
        navigate(route)
    }
    // callApi(
    //     [authorizationApi.getUser.getUserInfo()],
    //     (res) => {
    //         console.log(res)
    //     },

    //     [callApi],
    // )
    return (
        <>
            <div className="flex h-screen flex-col bg-[#e0deea]">
                <div className="flex  p-4 text-xl">
                    <img className="h-20" src={LogoHCMUT} alt="" />
                    {/* <MdNotifications className="mr-4" /> */}
                    <div className="ml-auto">
                        <UserInfor />
                    </div>
                </div>
                <div className="flex justify-center pt-10 ">
                    <div className="flex flex-col items-center  ">
                        <div
                            className="m-5 flex h-20 w-20 items-center justify-center rounded-lg border border-neutron-4 bg-neutron-4 p-5 text-5xl text-[#0A1D56] shadow-sub duration-300 hover:cursor-pointer hover:shadow-main"
                            onClick={() => handleClick("/mes")}
                        >
                            <TbHeartRateMonitor />
                        </div>
                        <p className="font-bold">MES</p>
                    </div>
                    {/* <div className="flex flex-col items-center  ">
                        <div
                            className="m-5 flex h-20 w-20 items-center justify-center rounded-lg border border-neutron-4 bg-neutron-4 p-5 text-5xl text-[#6B240C] shadow-sub duration-300  hover:cursor-pointer hover:shadow-main"
                            onClick={() => handleClick("/warehouse")}
                        >
                            <FaWarehouse />
                        </div>
                        <p className="font-bold">Warehouse</p>
                    </div> */}
                    <div className="flex flex-col items-center  ">
                        <div
                            className="m-5 flex h-20 w-20 items-center justify-center rounded-lg border border-neutron-4 bg-neutron-4 p-5 text-5xl text-[#994D1C] shadow-sub duration-300 hover:cursor-pointer hover:shadow-main"
                            onClick={() => handleClick("/cmms")}
                        >
                            <FaWrench />
                        </div>
                        <p className="font-bold">CMMS</p>
                    </div>
                    <div className="flex flex-col items-center  ">
                        <div
                            className="m-5 flex h-20 w-20 items-center justify-center rounded-lg border border-neutron-4 bg-neutron-4 p-5 text-5xl text-[#7D0A0A] shadow-sub duration-300 hover:cursor-pointer hover:shadow-main"
                            onClick={() => handleClick("/setting")}
                        >
                            <BsGearFill />
                        </div>
                        <p className="font-bold">Setting</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainDashboard
