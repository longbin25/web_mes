import Chart from "react-apexcharts"

function ColumnChart({ width = 400, data }) {
    const state = {
        options: {
            chart: {
                id: "basic-bar",
            },
            xaxis: {
                categories: data.name,
            },
        },
        series: [
            {
                name: "Số lỗi của thiết bị",
                data: data.error,
            },
        ],
    }

    return (
        <>
            <Chart width={width} options={state.options} series={state.series} type="bar" />
        </>
    )
}

export default ColumnChart
