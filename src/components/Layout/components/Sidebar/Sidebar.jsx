import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import cl from "classnames"
// import { BsArrowBarLeft, BsArrowBarRight } from "react-icons/bs"

import { SIDEBAR_ITEMS } from "@/utils/menuNavigation"
import SidebarItem from "./SidebarItem"
function layChuTrongHaiKyTuDau(str) {
    // Tìm vị trí của hai kí tự '/'
    const indexFirst = str.indexOf("/")
    const indexSecond = str.indexOf("/", indexFirst + 1)

    // Kiểm tra xem có đủ hai kí tự '/' hay không
    if (indexFirst !== -1 && indexSecond !== -1) {
        // Trả về phần nằm giữa hai kí tự '/'
        return str.substring(indexFirst + 1, indexSecond)
    } else if (indexFirst === 0 && indexSecond === -1) {
        // Trường hợp chỉ có một kí tự '/' ở đầu sau đó là chữ
        return str.substring(1)
    } else {
        // Trả về null nếu không tìm thấy đủ hai kí tự '/'
        return null
    }
}

function Sidebar() {
    const [isExpand, setIsExpand] = useState(true)
    const location = useLocation()
    const navigate = useNavigate()
    const [currentPath, setCurrentPath] = useState(location.pathname)

    const handleClick = (route) => {
        navigate(route)
        setCurrentPath(route)
    }

    const handleCloseSidebar = () => {
        setTimeout(() => setIsExpand(false), 200)
    }

    return (
        <div
            data-component="Sidebar"
            className={cl(
                "transition-width relative h-full bg-primary-1 py-5 text-neutron-4 duration-200",
                "scroll-y h-full",
                {
                    "visible w-[340px] px-5 sm:w-screen": isExpand,
                    "w-[80px] px-2 sm:invisible sm:w-0": !isExpand,
                },
            )}
            onMouseEnter={() => setIsExpand(true)}
            onMouseLeave={handleCloseSidebar}
        >
            <div
                className="mx-auto aspect-square w-full cursor-pointer rounded-xl bg-neutron-4 sm:w-1/2"
                onClick={() => handleClick("/")}
            ></div>
            <div className={cl("xxl:top-0 sticky top-1/3")}>
                {SIDEBAR_ITEMS[layChuTrongHaiKyTuDau(currentPath)].map((item, index) => (
                    <SidebarItem
                        key={index}
                        Icon={item.icon}
                        label={item.label}
                        actived={currentPath == item.route}
                        isExpand={isExpand}
                        onClick={() => handleClick(item.route)}
                    />
                ))}
            </div>
            <i
                className={cl(
                    "absolute bottom-5 right-5 flex h-11 w-11 cursor-pointer",
                    "items-center justify-center rounded-full text-4xl hover:bg-hoverBg",
                    {
                        "sm:visible sm:fixed sm:left-0 sm:text-accent-1": !isExpand,
                        "xl:static xl:float-right": isExpand,
                    },
                )}
            >
                {/* {isExpand ? (
                    <BsArrowBarLeft onClick={() => setIsExpand(false)} />
                ) : (
                    <BsArrowBarRight onClick={() => setIsExpand(true)} />
                )} */}
            </i>
        </div>
    )
}

export default Sidebar
