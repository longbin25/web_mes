import { useSelector } from "react-redux"
import { FaUser } from "react-icons/fa"
import UserInforModal from "./UserInforModal"
import useUserInforModal from "./useUserInforModal"

function UserInfor() {
    const userData = useSelector((state) => state)
    const { active, position, handleClose, handleOpen } = useUserInforModal()

    const handleOpenModal = (e) => {
        handleOpen(e)
    }
    return (
        <>
            <div className="cursor-pointer text-3xl text-primary-1" onClick={handleOpenModal}>
                <FaUser />
            </div>
            {active && <UserInforModal position={position} onClose={handleClose} data={userData.auth} />}
        </>
    )
}

export default UserInfor
