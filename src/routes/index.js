import { paths } from "@/config"
import * as Pages from "@/pages"

const routes = [
    //setting
    {
        path: paths.setting.dashboard,
        title: "Tài khoản người dùng",
        component: Pages.SETTINGAccount,
        layout: "main",
        protected: true,
    },
    {
        path: paths.setting.user,
        title: "Quản lý nhân viên",
        component: Pages.SETTINGUser,
        layout: "main",
        protected: true,
    },
    {
        path: paths.setting.role,
        title: "Quản lý chức vụ",
        component: Pages.SETTINGRole,
        layout: "main",
        protected: true,
    },
    {
        path: paths.setting.test,
        title: "Test",
        component: Pages.SESETTINGTest,
        layout: "main",
        protected: true,
    },
    {
        path: paths.setting.test2,
        title: "Test2",
        component: Pages.SESETTINGTest2,
        layout: "main",
        protected: true,
    },
    //cmms
    {
        path: paths.cmms.dashboard,
        title: "Tổng quan",
        component: Pages.CMMSDashboard,
        layout: "main",
        protected: true,
    },
    {
        path: paths.cmms.maintenance,
        title: "Công việc bảo trì",
        component: Pages.CMMSMaintenance,
        layout: "main",
        protected: true,
    },
    {
        path: paths.cmms.request,
        title: "Tạo yêu cầu bảo trì",
        component: Pages.CMMSRequest,
        layout: "main",
        protected: true,
    },
    {
        path: paths.cmms.equipment,
        title: "Quản lý thiết bị",
        component: Pages.CMMSEquipments,
        layout: "main",
        protected: true,
    },
    {
        path: paths.cmms.equipmentClass,
        title: "Quản lý loại thiết bị",
        component: Pages.CMMSEquipmentClass,
        layout: "main",
        protected: true,
    },
    {
        path: paths.cmms.equipmentDetail,
        title: "Thông tin chi tiết của thiết bị",
        component: Pages.CMMSEquipmentDetail,
        layout: "main",
        protected: true,
    },
    {
        path: paths.cmms.material,
        title: "Quản lý thông tin vật tư",
        component: Pages.CMMSMaterial,
        layout: "main",
        protected: true,
    },
    {
        path: paths.cmms.materialDetail,
        title: "Chi tiết thông tin vật tư",
        component: Pages.CMMSMaterialDetail,
        layout: "main",
        protected: true,
    },
    {
        path: paths.cmms.person,
        title: "Quản lý nhân viên",
        component: Pages.CMMSPerson,
        layout: "main",
        protected: true,
    },
    {
        path: paths.cmms.workingTime,
        title: "Thời gian làm việc",
        component: Pages.CMMSWorkingTime,
        layout: "main",
        protected: true,
    },
    {
        path: paths.cmms.schedule,
        title: "Bảo trì lịch trình",
        component: Pages.CMMSSchedule,
        layout: "main",
        protected: true,
    },
    {
        path: paths.cmms.cause,
        title: "Nguyên nhân",
        component: Pages.CMMSCause,
        layout: "main",
        protected: true,
    },
    //main
    {
        path: paths.mainDashboard,
        title: "mainDashboard",
        component: Pages.MainDashboard,
        layout: null,
        protected: true,
    },
    {
        path: paths.mes.setting,
        title: "Thiết lập",
        component: Pages.Setting,
        layout: "main",
        protected: true,
    },
    {
        path: paths.login,
        title: null,
        component: Pages.Login,
        layout: null,
    },
    {
        path: paths.signInOidc,
        title: null,
        component: Pages.SignInOidc,
        layout: null,
    },
    {
        path: "*",
        component: Pages.NotFoundPage,
        layout: null,
    },
    //mes
    {
        path: paths.mes.dashboard,
        title: "Dashboard",
        component: Pages.Dashboard,
        layout: "main",
        protected: true,
    },
    {
        path: paths.mes.oee,
        title: "Chỉ số OEE",
        component: Pages.OeePage,
        layout: "main",
        protected: true,
    },
    {
        path: paths.mes.productivity,
        title: "Năng suất tiêu chuẩn thiết bị",
        component: Pages.Productivity,
        layout: "main",
        protected: true,
    },
    {
        path: paths.mes.detailProductivity,
        title: null,
        component: Pages.DetailProductivity,
        layout: "main",
        protected: true,
    },
    {
        path: paths.mes.oeeDetail,
        title: null,
        component: Pages.OeeDetailPage,
        layout: "main",
        protected: true,
    },
    {
        path: paths.mes.productionScheduling,
        title: "Điều độ sản xuất",
        component: Pages.ProductionScheduling,
        layout: "main",
        protected: true,
    },
    {
        path: paths.mes.progress,
        title: "Tiến độ sản xuất",
        component: Pages.ProductionProgress,
        layout: "main",
        protected: true,
    },
    {
        path: paths.mes.workOrder,
        title: "Đơn công đoạn",
        component: Pages.WorkOrder,
        layout: "main",
        protected: true,
    },
    {
        path: paths.mes.manufacturingOder,
        title: "Đơn sản xuất",
        component: Pages.ManufacturingOrder,
        layout: "main",
        protected: true,
    },
    {
        path: paths.mes.hierachyFactory,
        title: "Phân cấp nhà máy",
        component: Pages.CompanyHierachy,
        layout: "main",
        protected: true,
    },
    {
        path: paths.mes.newProduct,
        title: "Sản phẩm mới",
        component: Pages.NewProduct,
        layout: "main",
        protected: true,
    },
    {
        path: paths.mes.product,
        title: null,
        component: Pages.Product,
        layout: "main",
        protected: true,
    },
    {
        path: paths.mes.schedule,
        title: "Kế hoạch sản xuất",
        component: Pages.ProductionSchedule,
        layout: "main",
        protected: true,
    },
    {
        path: paths.mes.scheduling,
        title: "Điều độ sản xuất",
        component: Pages.ProductScheduling,
        layout: "main",
        protected: true,
    },
    {
        path: paths.mes.resource,
        title: "Quản lý nguồn lực",
        component: Pages.ResourcePage,
        layout: "main",
        protected: true,
    },
    // {
    //     path: paths.mes.resourceType,
    //     title: null,
    //     component: Pages.ResourceTypesPage,
    //     layout: "main",
    //     protected: true,
    // },
    {
        path: paths.mes.resourceEquipment,
        title: "Quản lý thiết bị",
        component: Pages.ResourceEquipment,
        layout: "main",
        protected: true,
    },
    {
        path: paths.mes.materialDetail,
        title: "Thông tin chi tiết vật tư",
        component: Pages.MaterialDetailPage,
        layout: "main",
        protected: true,
    },
    {
        path: paths.mes.resourceMaterial,
        title: "Quản lý vật tư",
        component: Pages.ResourceMaterial,
        layout: "main",
        protected: true,
    },
    {
        path: paths.mes.class,
        title: null,
        component: Pages.ResourceClassPage,
        layout: "main",
        protected: true,
    },

    //warehouse
    {
        path: paths.warehouse.dashboard,
        title: "WarehouseDashboard",
        component: Pages.WarehouseDashboard,
        layout: "main",
        protected: true,
    },
]

export default routes
