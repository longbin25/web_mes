import { useState, useEffect, useRef, useCallback } from "react"
import { createPortal } from "react-dom"
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight, MdOutlineClose } from "react-icons/md"
import { FaUser } from "react-icons/fa"

import Button from "@/components/Button"
import Card from "@/components/Card"
import { authActions } from "@/store"
import { useDispatch } from "react-redux"
import { useCallApi } from "@/hooks"
import { authorizationApi } from "@/services/api"
import Cookies from "universal-cookie"

function UserInforModal({ width, position, onClose, data }) {
    const dispatch = useDispatch()
    const callApi = useCallApi()
    const cookies = new Cookies()
    console.log(document.cookie)
    const logOutFunction = useCallback(() => {
        callApi([authorizationApi.logOut.logout()], (res) => {})
    }, [callApi])
    const popupContainerRef = useRef()
    const handleLogOut = () => {
        console.log(document.cookie)
        cookies.remove(".AspNetCore.Identity.Application", {
            path: "/",
            domain: "authenticationserver20240411133358.azurewebsites.net",
        })
        logOutFunction()
        dispatch(
            authActions.setLoginState({
                isLogin: false,
                username: "",
                role: "",
            }),
        )
    }
    return createPortal(
        <div
            data-component="PoperMenu"
            className="fixed top-0 left-0 right-0 bottom-0 z-10 bg-hoverBg"
            ref={popupContainerRef}
        >
            <Card className="fixed" style={{ ...position, width, minWidth: "400px" }}>
                <div className="flex items-center">
                    <Button small transparent onClick={onClose} className="ml-auto">
                        <MdOutlineClose className="text-xl font-bold" />
                    </Button>
                </div>
                <div className="flex w-full flex-col items-center">
                    <div className="flex aspect-square w-32 items-center justify-center rounded-full bg-primary-1 text-6xl  text-neutron-4">
                        <FaUser />
                    </div>
                    <h1 className="mt-4">{data.username}</h1>
                    <h3 className="mt-4">Chức vụ: {data.role}</h3>
                    <div className="mt-8 w-full border border-primary-1"></div>
                    <Button className="mt-4" onClick={handleLogOut}>
                        Đăng xuất
                    </Button>
                </div>
            </Card>
        </div>,
        document.getElementById("root"),
    )
}

export default UserInforModal
