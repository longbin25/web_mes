import { VscSettings } from "react-icons/vsc"
import { OeeIcon, CommandIcon, QuantityIcon, ResourceIcon, ScheduleIcon, ProductivityIcon } from "@/components/Icons"
import { MdOutlineAccountTree, MdGridOn, MdStorage, MdOutlineWarningAmber, MdOutlineQuestionMark } from "react-icons/md"
import { FaWrench, FaUserFriends } from "react-icons/fa"
import { BsGearFill } from "react-icons/bs"
import { TbReportAnalytics, TbHeartRateMonitor, TbDownload, TbUpload, TbListCheck, TbHistory } from "react-icons/tb"
import { GiSewingMachine, GiProgression, GiStairsGoal } from "react-icons/gi"
import { paths } from "@/config"
import { FaUser } from "react-icons/fa"
import { BiAccessibility } from "react-icons/bi"
const SIDEBAR_ITEMS = {
    mes: [
        {
            label: "Tổng quan",
            icon: TbHeartRateMonitor,
            route: paths.mes.dashboard,
        },

        // {
        //     label: "Năng suất máy",
        //     icon: ProductivityIcon,
        //     route: paths.mes.productivity,
        // },
        {
            label: "Đơn sản xuất",
            icon: CommandIcon,
            route: paths.mes.manufacturingOder,
        },
        {
            label: "Điều độ sản xuất",
            icon: ScheduleIcon,
            route: paths.mes.productionScheduling,
        },
        // {
        //     label: "Kế hoạch sản xuất",
        //     icon: ScheduleIcon,
        //     route: paths.mes.schedule,
        // },
        {
            label: "Tiến độ sản xuất",
            icon: GiProgression,
            route: paths.mes.progress,
        },
        // {
        //     label: "Nguồn lực",
        //     icon: ResourceIcon,
        //     route: paths.mes.resource,
        // },
        {
            label: "Thiết bị",
            icon: GiSewingMachine,
            route: paths.mes.resourceEquipment,
        },
        {
            label: "Vật tư",
            icon: MdStorage,
            route: paths.mes.resourceMaterial,
        },
        {
            label: "Phân cấp nhà máy",
            icon: MdOutlineAccountTree,
            route: paths.mes.hierachyFactory,
        },
        {
            label: "Báo cáo OEE",
            icon: TbReportAnalytics,
            route: paths.mes.oee,
        },
        // {
        //     label: "Thiết lập",
        //     icon: VscSettings,
        //     route: paths.mes.setting,
        // },
    ],
    warehouse: [
        {
            label: "Nhập kho",
            icon: TbDownload,
            route: paths.mes.oee,
        },
        {
            label: "Xuất kho",
            icon: TbUpload,
            route: paths.mes.oee,
        },
        {
            label: "Kiểm kê",
            icon: TbListCheck,
            route: paths.mes.oee,
        },
        {
            label: "Kệ kho",
            icon: MdGridOn,
            route: paths.mes.oee,
        },
        {
            label: "Tồn kho",
            icon: OeeIcon,
            route: paths.mes.oee,
        },
        {
            label: "Lịch sử",
            icon: TbHistory,
            route: paths.mes.oee,
        },
        {
            label: "Cách ly",
            // icon: OeeIcon,
            route: paths.mes.oee,
        },
        {
            label: "Cảnh báo",
            icon: MdOutlineWarningAmber,
            route: paths.mes.oee,
        },
    ],
    cmms: [
        {
            label: "Tổng quan",
            icon: TbHeartRateMonitor,
            route: paths.cmms.dashboard,
        },
        // {
        //     label: "Sơ đồ",
        //     icon: MdGridOn,
        //     route: paths.mes.oee,
        // },
        {
            label: "Yêu cầu",
            icon: CommandIcon,
            route: paths.cmms.request,
        },
        {
            label: "Công việc",
            icon: FaWrench,
            route: paths.cmms.maintenance,
        },
        // {
        //     label: "Lịch trình",
        //     icon: ScheduleIcon,
        //     route: paths.cmms.schedule,
        // },

        {
            label: "Thiết bị",
            icon: GiSewingMachine,
            route: paths.cmms.equipment,
        },
        {
            label: "Vật tư",
            icon: MdStorage,
            route: paths.cmms.material,
        },
        {
            label: "Nhân viên",
            icon: FaUser,
            route: paths.cmms.person,
        },
        {
            label: "Nguyên nhân",
            icon: MdOutlineQuestionMark,
            route: paths.cmms.cause,
        },
        // {
        //     label: "Báo cáo",
        //     icon: TbReportAnalytics,
        //     route: paths.mes.oee,
        // },
    ],
    setting: [
        {
            label: "Tài khoản",
            icon: FaUser,
            route: paths.setting.dashboard,
        },
        {
            label: "Quản lý nhân viên",
            icon: FaUserFriends,
            route: paths.setting.user,
        },
        {
            label: "Quản lý chức vụ",
            icon: GiStairsGoal,
            route: paths.setting.role,
        },
        {
            label: "Test",
            icon: BiAccessibility,
            route: paths.setting.test,
        },
        {
            label: "Test2",
            icon: BiAccessibility,
            route: paths.setting.test2,
        },
    ],
}

export { SIDEBAR_ITEMS }
