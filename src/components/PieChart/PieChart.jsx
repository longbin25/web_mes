import Chart from "react-apexcharts"

function PieChart({ width = 400, value = [], labels = [], color = [] }) {
    const state = {
        series: value,
        options: {
            chart: {
                width: "100%",
                type: "donut",
            },
            colors: color,
            labels: labels,
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 400,
                        },
                        legend: {
                            position: "bottom",
                        },
                    },
                },
            ],
        },
    }

    return (
        <div data-component="Radialbar">
            <Chart width={width} options={state.options} series={state.series} labels={state.labels} type="donut" />
        </div>
    )
}

export default PieChart
