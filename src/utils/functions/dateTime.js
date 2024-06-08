export const isoToTimestamp = (isoString) => {
    const date = new Date(isoString)
    return date.getTime()
}
// hàm cộng "2023-08-16T04:05:58" với "02:00:00"
export const addTimeToDateTime = (thoiGian1, thoiGian2) => {
    // Chuyển đổi thời gian 1 sang đối tượng Date
    const date1 = new Date(thoiGian1)

    // Tách giờ, phút và giây từ thời gian 2
    const [gio2, phut2, giay2] = thoiGian2.split(":").map(Number)

    // Thêm giờ, phút và giây từ thời gian 2 vào thời gian 1
    date1.setHours(date1.getHours() + gio2)
    date1.setMinutes(date1.getMinutes() + phut2)
    date1.setSeconds(date1.getSeconds() + giay2)

    // Định dạng lại thời gian kết quả
    const gio = date1.getHours().toString().padStart(2, "0")
    const phut = date1.getMinutes().toString().padStart(2, "0")
    const giay = date1.getSeconds().toString().padStart(2, "0")

    // Trả về thời gian kết quả dưới dạng chuỗi
    return `${date1.getFullYear()}-${(date1.getMonth() + 1).toString().padStart(2, "0")}-${date1
        .getDate()
        .toString()
        .padStart(2, "0")}T${gio}:${phut}:${giay}`
}
export const subTimeToDateTime = (thoiGian1, thoiGian2) => {
    // Chuyển đổi thời gian 1 sang đối tượng Date
    const date1 = new Date(thoiGian1)

    // Tách giờ, phút và giây từ thời gian 2
    const [gio2, phut2, giay2] = thoiGian2.split(":").map(Number)

    // Trừ giờ, phút và giây từ thời gian 2 vào thời gian 1
    date1.setHours(date1.getHours() - gio2)
    date1.setMinutes(date1.getMinutes() - phut2)
    date1.setSeconds(date1.getSeconds() - giay2)

    // Định dạng lại thời gian kết quả
    const gio = date1.getHours().toString().padStart(2, "0")
    const phut = date1.getMinutes().toString().padStart(2, "0")
    const giay = date1.getSeconds().toString().padStart(2, "0")

    // Trả về thời gian kết quả dưới dạng chuỗi
    return `${date1.getFullYear()}-${(date1.getMonth() + 1).toString().padStart(2, "0")}-${date1
        .getDate()
        .toString()
        .padStart(2, "0")}T${gio}:${phut}:${giay}`
}
export const compareTime = (dateTimeString1, dateTimeString2) => {
    const dateTime1 = new Date(dateTimeString1)
    const dateTime2 = new Date(dateTimeString2)

    if (dateTime1 < dateTime2) {
        return -1 // dateTimeString1 < dateTimeString2
    } else if (dateTime1 > dateTime2) {
        return 1 // dateTimeString1 > dateTimeString2
    } else {
        return 0 // dateTimeString1 == dateTimeString2
    }
}
export const getCurrentDateTime = () => {
    const now = new Date()

    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, "0")
    const day = String(now.getDate()).padStart(2, "0")
    const hours = String(now.getHours()).padStart(2, "0")
    const minutes = String(now.getMinutes()).padStart(2, "0")
    const seconds = String(now.getSeconds()).padStart(2, "0")

    const currentDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`
    return currentDateTime
}
export const formatDateTime = (time) => {
    return time.split(".")[0]
}

export const convertDataProductionSchedule = (inputData, status) => {
    const result = []
    const handleData = (item) => {
        const name = `${item.workOrderId}[${item.manufacturingOrder}]`
        const machine = item.manufacturingOrder // Thay đổi tên máy ở đây nếu cần

        const startTime = isoToTimestamp(item.startTime)
        const endTime = isoToTimestamp(item.endTime)

        const newData = { x: machine, y: [startTime, endTime] }
        return [name, newData]
    }
    inputData.forEach((item) => {
        if (status == 0) {
            let [name, newData] = handleData(item)
            result.push({ name, data: [newData] })
        } else if (item.workOrderStatus == status + 1) {
            let [name, newData] = handleData(item)
            result.push({ name, data: [newData] })
        }
    })

    return result
}
//chuyển từ "2024-01-03T07:29:25.387" sang "03-01-2024 07:29:25"
export function convertDateFormat(inputDate) {
    let formattedDate = ""
    if (inputDate) {
        const [datePart, timePart] = inputDate.split("T")

        // Tách ngày thành các phần
        const [year, month, day] = datePart.split("-")

        // Tách thời gian thành các phần
        const [hour, minute, second] = timePart.split(/[.+\:]/).slice(0, 3)

        // Tạo chuỗi kết quả
        formattedDate = `${day}-${month}-${year} ${hour}:${minute}:${second}`
    }

    return formattedDate
}
//chuyển từ "03-01-2024 07:29:25" sang "2024-01-03T07:29:25"
export function convertDateFormatNormalToMachine(inputDate) {
    // Tách ngày, tháng, năm và thời gian từ chuỗi đầu vào
    var parts = inputDate.split(" ")
    var dateParts = parts[0].split("-")
    var timePart = parts[1]

    // Xây dựng lại chuỗi theo định dạng mong muốn
    var convertedDate = dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0] + "T" + timePart

    return convertedDate
}
//chuyển từ "2024-01-03T07:29:25.387" sang "03-01-2024 07:29:25"
export function convertDateFormatWithOutYear(inputDate) {
    let formattedDate = ""
    if (inputDate) {
        const [datePart, timePart] = inputDate.split("T")

        // Tách ngày thành các phần
        const [year, month, day] = datePart.split("-")

        // Tách thời gian thành các phần
        const [hour, minute, second] = timePart.split(/[.+\:]/).slice(0, 3)

        // Tạo chuỗi kết quả
        formattedDate = `${day}-${month} ${hour}:${minute}:${second}`
    }

    return formattedDate
}
