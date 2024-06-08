import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Log, useAuth } from "oidc-react"
import { authActions } from "@/store"
import { authStorageService } from "@/services/storage"
import { paths } from "@/config"

import Loading from "@/components/Layout/components/Loading"

function SignInOidc() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { userData } = useAuth()

    useEffect(() => {
        if (userData) {
            dispatch(
                authActions.setLoginState({
                    isLogin: true,
                    username: userData.profile.name,
                    role: userData.profile.role,
                }),
            )
            authStorageService.setAccessToken(userData.access_token)
            navigate(paths.mainDashboard)
        }
    }, [userData, dispatch, navigate])

    return (
        <div className="container">
            <h2 className="translate-y-[52vh] text-center">Xác thực thành công</h2>
            <Loading showText={false} />
        </div>
    )
}

export default SignInOidc
