import axiosClient from "./axiosClient"
// import { handleDeviceID } from '@/ultils'
const handleDeviceID = (deviceId) => {
    let deviceDetails = {
        deviceId: deviceId.split("-")[0],
        mouldSlot: 1,
    }
    return deviceDetails
}
const OeeApi = {
    getOeeDetail: (machine, dayStart, dayEnd) =>
        axiosClient.get(
            `/ManufacturingRecords?StartTime=${dayStart}&EndTime=${dayEnd}&EquipmentId=${machine}&PageIndex=1&PageSize=1000`,
        ),
    getOee: (interval) => {
        const url = `/ShiftReports/Details?DeviceId=HC001&Date=2024-05-14&ShiftNumber=1&Interval=${interval}`
        return axiosClient.get(url)
    },
    getAverage: (dayStart, dayEnd) => axiosClient.get(`/ShiftReports/average?StartTime=${dayStart}&EndTime=${dayEnd}`),
}
export default OeeApi
