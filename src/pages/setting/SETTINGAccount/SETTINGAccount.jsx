import Button from "@/components/Button"
import { useCallApi } from "@/hooks"
import { authorizationApi } from "@/services/api"
import { useCallback, useEffect, useState } from "react"
import { useSelector } from "react-redux"

function SETTINGAccount() {
    const callApi = useCallApi()
    const userData = useSelector((state) => state)
    const [currentUser, setCurrentUser] = useState([])

    // const fetchData = useCallback(() => {
    //     callApi([authorizationApi.user.getUserInfo], (res) => {
    //         setCurrentUser(res[0])
    //     })
    // }, [callApi])
    // useEffect(() => {
    //     fetchData()
    // }, [fetchData])
    // console.log(currentUser)
    return (
        <div className="flex h-full flex-col">
            <div className="flex">
                <h2 className="w-60">Tên người dùng: </h2>
                <h2>{userData.auth.username}</h2>
            </div>
            <div className="flex">
                <h2 className="w-60">Chức vụ: </h2>
                <h2>{userData.auth.role}</h2>
            </div>
            <Button className="mt-auto w-40">Đăng xuất</Button>
        </div>
    )
}

export default SETTINGAccount
