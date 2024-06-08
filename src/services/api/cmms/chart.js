import axiosClient from "./axiosClient"

const CMMSChartAPi = {
    dashboard: {
        getDashboarData: async (timeInterval) => await axiosClient.get(`/Charts?TimeInterval=${timeInterval}`),
    },
}
export default CMMSChartAPi
