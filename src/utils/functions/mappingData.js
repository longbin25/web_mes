import {
    convertDateFormat,
    convertDateFormatNormalToMachine,
    convertDateFormatWithOutYear,
    formatDateTime,
    getCurrentDateTime,
} from "./dateTime"
import { getValuesByKey, roundToNDecimal, statusTextToNumber } from "./handleData"

export const returnData = (data) => {
    return data.info
}

export const resourceMapper = {
    resourceClass: {
        clientToApi: (value) => {
            const properties =
                value.properties?.map((item) => ({
                    ...item.property,
                    valueType: item.property.valueType[0],
                })) ?? []

            return {
                ...value.info,
                properties,
            }
        },
        apiToClient: (value) => {
            const properties =
                value.properties?.map((item) => ({
                    property: {
                        ...item,
                        valueType: [item.valueType],
                    },
                })) ?? []

            return {
                info: {
                    ...value,
                    properties: undefined,
                },
                properties,
            }
        },
    },
    resource: {
        clientToApi: (value) => {
            const properties =
                value.properties?.map((item) => ({
                    ...item.property,
                    valueType: item.property.valueType[0],
                })) ?? []

            return {
                ...value.info,
                properties,
            }
        },
        apiToClient: (value) => {
            const properties =
                value.properties?.map((item) => ({
                    property: {
                        ...item,
                        valueType: [item.valueType],
                    },
                })) ?? []

            return {
                info: {
                    ...value,
                    properties: undefined,
                },
                properties,
            }
        },
    },
}

export const productMapper = {
    clientToAPi(data) {
        const productInfo = data.info
        const segments = data.segments.map((segment) => {
            const personnelSpecifications =
                segment.personnelSpecifications?.map((item) => ({
                    ...item.info,
                    properties: [],
                    persons: [],
                    description: "",
                })) ?? []
            const equipmentSpecifications =
                segment.equipmentSpecifications?.map((item) => ({
                    ...item.info,
                    properties: [],
                    equipments: [],
                    description: "",
                })) ?? []
            const materialSpecifications =
                segment.materialSpecifications?.map((item) => ({
                    ...item.info,
                    properties: [],
                    materialDefinitions: [],
                    description: "",
                })) ?? []
            const properties =
                segment.properties?.map((item) => ({
                    ...item.property,
                    valueType: item.property.valueType[0],
                })) ?? []

            const segmentInfo = segment.info
            return {
                productSegmentId: segmentInfo.productSegmentId,
                description: segmentInfo.description,
                duration: segmentInfo.duration,
                durationUnitOfMeasure: segmentInfo.durationUnit[0],
                personnelSpecifications,
                equipmentSpecifications,
                materialSpecifications,
                properties,
            }
        })

        segments.push({
            productSegmentId: "start-segment",
            description: "Start",
            duration: 0,
            durationUnitOfMeasure: 1,
            personnelSpecifications: [],
            equipmentSpecifications: [],
            materialSpecifications: [],
            properties: [],
        })

        const segmentRelationships =
            data.segmentRelationships?.map((item) => {
                const segmentRelationship = item.info
                return {
                    aSegmentId: segmentRelationship.segmentA[0],
                    bSegmentId: segmentRelationship.segmentB[0],
                    timeWindowUnitOfMeasure: segmentRelationship.durationUnit[0],
                    dependencyType: segmentRelationship.relation[0],
                    timeWindow: segmentRelationship.duration,
                    description: "",
                }
            }) ?? []

        return {
            ...productInfo,
            version: 0,
            productSegments: segments,
            productSegmentDependencies: segmentRelationships,
        }
    },
}
export const normalMachineMapper = {
    clientToAPI: (data) => {
        console.log(data)
        let res = {
            ...data.info,
            equipmentClass: data.info.equipmentClass[0],
            absolutePath: data.info.absolutePath[0],
            properties: data.properties
                ? data.properties.map((item) => {
                      let returnData = {
                          ...item.property,
                          valueType: item.property.valueType[0],
                      }
                      return returnData
                  })
                : [],
        }
        return res
    },
    initValue: (data, equipmentTypeList) => {
        let res = {
            info: {
                ...data,
                equipmentClass: [data.equipmentClass],
            },
            properties: data.properties.map((item) => {
                return {
                    property: {
                        propertyId: item.propertyId,
                        description: item.description,
                        valueString: item.valueString,
                        valueUnitOfMeasure: item.valueUnitOfMeasure,
                        valueType: [item.valueType],
                    },
                }
            }),
        }
        return res
    },
    edit: (data) => {
        let temp_prop = data.properties.map((item) => item.property)
        let temp_prop1 = temp_prop.map((item) => {
            return {
                ...item,
                valueType: item.valueType[0],
            }
        })
        let res = {
            ...data.info,
            absolutePath: data.info.absolutePath[0],
            equipmentClass: data.info.equipmentClass[0],
            properties: temp_prop1,
        }
        return res
    },
}
export const injectionMachineMapper = {
    clientToAPI: (data) => {
        let res = {
            molds: [],
            ...data.info,
            absolutePath: data.absolutePath.absolutePath[0],
            properties: [
                {
                    propertyId: "MaxPow",
                    valueString: data.info.valueString,
                    valueUnitOfMeasure: data.info.valueUnitOfMeasure[0],
                },
            ],
        }
        return res
    },
    initValue: (data) => {
        console.log(data)
        let res = {
            info: {
                ...data,
                equipmentClass: [data.equipmentClass],
            },
        }
        return res
    },
    edit: (data) => {
        let res = {
            // materialInforId: data.info.materialInforId[0],
            status: data.info.status[0],
        }
        return res
    },
}
export const moldMapper = {
    clientToAPI: (data) => {
        let res = {
            plasticInjectionMachines: [],
            ...data.info,
            absolutePath: data.absolutePath.absolutePath[0],
            cycleBySecond: parseInt(data.info.cycleBySecond),
            properties: [],
        }
        return res
    },
    initValue: (data) => {
        let res = {
            info: {
                ...data,
            },
        }
        return res
    },
    edit: (data) => {
        let res = {
            // materialInforId: data.info.materialInforId[0],
            status: data.info.status[0],
        }
        return res
    },
}
export const normalMaterialMapper = {
    clientToAPI: (data) => {
        console.log(data)
        let temp_prop1 = []
        if (data.properties) {
            let temp_prop = data.properties.map((item) => item.property)
            temp_prop1 = temp_prop.map((item) => {
                return {
                    ...item,
                    valueType: item.valueType[0],
                }
            })
        }

        let res = {
            ...data.info,
            materialClass: data.info.materialClass[0],
            // moduleType: "OriginalMachine",
            properties: temp_prop1,
        }
        console.log(res)
        return res
    },
    edit: (data) => {
        console.log(data)
        let temp_prop = data.properties.map((item) => item.property)
        let temp_prop1 = temp_prop.map((item) => {
            return {
                ...item,
                valueType: item.valueType[0],
            }
        })
        let res = {
            ...data.info,
            properties: temp_prop1,
        }
        return res
    },
    initValue: (data) => {
        let res = {
            info: {
                ...data,
            },
            properties: data.properties.map((item) => {
                return {
                    property: {
                        propertyId: item.propertyId,
                        description: item.description,
                        valueString: item.valueString,
                        valueUnitOfMeasure: item.valueUnitOfMeasure,
                        valueType: [item.valueType],
                    },
                }
            }),
        }
        return res
    },
}
export const plasticProductsMapper = {
    clientToAPI: (data) => {
        let res = {
            ...data.info,
            // moduleType: "InjectionMachine-PlasticProduct",
            properties: [],
        }
        return res
    },
    edit: (data) => {
        let res = {
            info: {
                ...data,
            },
        }
        return res
    },
    initValue: (data) => {
        let res = {
            info: {
                ...data,
            },
        }
        return res
    },
}
export const plasticMaterialMapper = {
    clientToAPI: (data) => {
        let res = {
            ...data.info,
            moduleType: "InjectionMachine-PlasticMaterial",
            properties: [],
        }
        return res
    },
    edit: (data) => {
        let res = {
            ...data.info,
            // materialInforId: data.info.materialInforId[0],
            status: data.info.status[0],
        }
        return res
    },
    initValue: (data) => {
        let res = {
            info: {
                ...data,
            },
        }
        return res
    },
}
export const manufacturingOrderMapper = {
    clientToAPI: (data) => {
        let res = {
            ...data.info,
            materialDefinitionId: data.info.materialDefinitionId[0],
            priority: data.info.priority[0],
        }
        return res
    },
    apiToClient: (data) => {
        let res = data.map((item) => {
            return {
                ...item,
                availableDate: convertDateFormat(item.availableDate),
                dueDate: convertDateFormat(item.dueDate),
            }
        })
        return res
    },
}
export const ProductionSchedulingMapper = {
    workOrderMapper: (data, selectRow) => {
        let res = data.map((item) => {
            if (item.workOrderId == selectRow.workOrderId && item.manufacturingOrder == selectRow.manufacturingOrder) {
                return {
                    ...item,
                    workOrderStatus: 2,
                }
            }
            return item
        })
        return res
    },
    workOrderRemoveMapper: (data, selectRow) => {
        let res = data.map((item) => {
            if (item.workOrderId == selectRow.workOrderId && item.manufacturingOrder == selectRow.manufacturingOrder) {
                return {
                    ...item,
                    workOrderStatus: 0,
                }
            }
            return item
        })
        return res
    },
    apiToClient: (data) => {
        let res = data.items.map((item) => {
            return {
                ...item,
                startTime: item.startTime == "0001-01-01T00:00:00" ? getCurrentDateTime() : item.startTime,
                endTime: item.endTime == "0001-01-01T00:00:00" ? getCurrentDateTime() : item.endTime,
            }
        })
        res = res.filter((obj) => obj.workOrderStatus === 0)
        return res
    },
    clientToDispath: (data) => {
        let res = data.map((item) => {
            return {
                ...item,
                startTime: convertDateFormatNormalToMachine(item.startTime),
                endTime: convertDateFormatNormalToMachine(item.endTime),
                dueDate: convertDateFormatNormalToMachine(item.dueDate),
            }
        })
        return res
    },
}
export const workOrderListMapper = {
    apiToClient: (data) => {
        let res = data.map((item) => {
            return {
                ...item,
                startTime: convertDateFormat(item.startTime),
                endTime: convertDateFormat(item.endTime),
                dueDate: convertDateFormat(item.dueDate),
            }
        })
        return res
    },
    clientToDispath: (data) => {
        let res = data.filter((obj) => obj.workOrderStatus === 2)
        return res
    },
}
export const injectionMachineManufacturingOrderMapper = {
    clientToAPI: (data) => {
        let res = {
            ...data.info,
            materialDefinitionId: data.info.materialDefinitionId[0],
            equipments: [],
        }
        return res
    },
    apiToClient: (data) => {
        let res = data.map((item) => {
            return {
                ...item,
                dueDate: convertDateFormat(item.dueDate),
            }
        })
        return res
    },
}
export const MESWorkOrderMapper = {
    apiToClient: (data) => {
        let res = data.map((item) => {
            return {
                ...item,
                dueDate: convertDateFormat(item.dueDate),
                startTime: convertDateFormat(item.startTime),
                endTime: convertDateFormat(item.endTime),
            }
        })
        return res
    },
}
export const materialClassMapper = {
    clientToAPI: (data) => {
        let res = {
            ...data.info,
        }
        return res
    },
}
function roundToTwoDecimal(num) {
    return parseFloat(num.toFixed(2))
}
export const CMMSEquipmentMapper = {
    clientToAPI: (data) => {
        let res = {
            ...data.info,
            equipmentClass: data.info.equipmentClass[0],
        }
        return res
    },
    apiToClient: (data) => {
        let res = data.map((item) => {
            return {
                ...item,
                mtbf: roundToTwoDecimal(item.mtbf.recentValue),
                mttf: roundToTwoDecimal(item.mttf.recentValue),
                oee: roundToTwoDecimal(item.oee.recentValue),
                mtbfData: item.mtbf,
                mttfData: item.mttf,
                oeeData: item.oee,
            }
        })
        return res
    },
}
export const CMMSMaterialRequestMapper = {
    clientToAPI: (data) => {
        let res = {
            ...data.info,
            additionalNumber: parseInt(data.info.additionalNumber, 10),
            currentNumber: parseInt(data.info.currentNumber, 10),
            expectedNumber: parseInt(data.info.expectedNumber, 10),
            status: parseInt(data.info.status, 10),

            // materialInforId: data.info.materialInforId[0],
        }
        return res
    },
    edit: (data) => {
        let res = {
            ...data.info,
            // materialInforId: data.info.materialInforId[0],
            status: data.info.status[0],
        }
        return res
    },
    apiToClient: (data) => {
        let res = data.map((item) => {
            return {
                ...item,
                expectedDate: convertDateFormat(item.expectedDate),
                createdAt: convertDateFormat(item.createdAt),
                updatedAt: convertDateFormat(item.updatedAt),
            }
        })
        return res
    },
}
export const CMMSMaterialDetailMapper = {
    clientToAPI: (data) => {
        let res = {
            ...data.info,
            // materialInforId: data.info.materialInforId[0],
        }
        return res
    },
    edit: (data) => {
        let res = {
            // materialInforId: data.info.materialInforId[0],
            status: data.info.status[0],
        }
        return res
    },
}
export const CMMSMaterialMapper = {
    apiToClient: (data) => {
        let res = data.map((item) => {
            return {
                ...item,
                CMMSMaterialStockState: item.currentQuantity >= item.minimumQuantity ? "Đủ" : "Thiếu",
            }
        })
        return res
    },
}
export const CMMSMaterialHistoryCardMapper = {
    clientToAPI: (data) => {
        let res = {
            ...data.info,
            // materialInforId: data.info.materialInforId[0],
        }
        return res
    },
    edit: (data) => {
        let res = {
            // materialInforId: data.info.materialInforId[0],
            status: data.info.status[0],
        }
        return res
    },
    apiToClient: (data) => {
        let res = data.map((item) => {
            return {
                ...item,
                timeStamp: convertDateFormat(item.timeStamp),
            }
        })
        return res
    },
}

export const CMMSEquipmentMaterialMapper = {
    clientToAPI: (data) => {
        let res = {
            ...data.info,
            materialInforId: data.info.materialInforId[0],
        }
        return res
    },
    apiToClient: (data) => {
        let res = data.map((item) => {
            return {
                ...item,
                installedTime: convertDateFormat(item.installedTime),
                usedTime: roundToNDecimal(item.usedTime, 2),
                materialInfor: item.materialInfor.name,
            }
        })
        return res
    },
    apiToClientMTBF: (data) => {
        let res = data.map((item) => {
            return {
                time: convertDateFormat(item.time),
                value: roundToNDecimal(item.value, 2),
            }
        })
        return res
    },
    apiToClientMTTF: (data) => {
        let res = data.map((item) => {
            return {
                time: convertDateFormat(item.time),
                value: roundToNDecimal(item.value, 2),
            }
        })
        return res
    },
}
export const CMMSCauseMapper = {
    clientToAPI: (data) => {
        let res = {
            ...data.info,
            severity: data.info.severity[0],
            equipmentClass: data.info.equipmentClass[0],
        }
        return res
    },
    initValue: (data, equipmentClassList) => {
        let res = {
            info: {
                ...data,
                equipmentClass: getValuesByKey(data.equipmentClass, equipmentClassList),
                severity: [statusTextToNumber(data.severity, "ECauseSeverity")],
            },
        }
        return res
    },
    edit: (data) => {
        let res = {
            ...data.info,
            severity: data.info.severity[0],
            equipmentClass: data.info.equipmentClass[0],
        }
        return res
    },
}
export const CMMSCorrectionMapper = {
    clientToAPI: (data) => {
        let res = {
            ...data.info,
            correctionType: data.info.correctionType[0],
        }
        return res
    },
    initValue: (data) => {
        let res = {
            info: {
                ...data,
                correctionType: [statusTextToNumber(data.correctionType, "ESolutionType")],
            },
        }
        return res
    },
    edit: (data) => {
        let res = {
            ...data.info,
            correctionType: data.info.correctionType[0],
        }
        return res
    },
}
export const CMMSRequestMapper = {
    // bảo trì khắc phục
    clientToAPI: (data) => {
        let res = {
            ...data.info,
            equipmentClass: data.info.equipmentClass[0],
            requester: data.info.requester[0],
            reviewer: data.info.reviewer[0],
            responsiblePerson: data.info.responsiblePerson[0],
        }
        return res
    },
    initValue: (data) => {
        let res = {
            info: {
                ...data,
                requester: [data.requester.personId],
                responsiblePerson: [data.responsiblePerson.personId],
                reviewer: [data.reviewer.personId],
            },
        }
        return res
    },
    edit: (data) => {
        let res = {
            ...data.info,
            equipmentClass: data.info.equipmentClass[0],
            requester: data.info.requester[0],
            reviewer: data.info.reviewer[0],
            responsiblePerson: data.info.responsiblePerson[0],
        }
        return res
    },
    apiToClient: (data) => {
        let res = data.map((item) => {
            return {
                ...item,
                submissionDate: convertDateFormat(item.submissionDate),
                requestedCompletionDate: convertDateFormat(item.requestedCompletionDate),
                createdAt: convertDateFormat(item.createdAt),
                updatedAt: convertDateFormat(item.updatedAt),
                plannedStart: convertDateFormat(item.plannedStart),
                responsiblePerson: item.responsiblePerson.personName,
            }
        })
        return res
    },
}

export const CMMSScheduleMapper = {
    // bảo trì theo lịch
    clientToAPI: (data) => {
        let res = {
            ...data.info,
            requester: data.info.requester[0],
        }
        return res
    },
    initValue: (data) => {
        let res = {
            info: {
                ...data,
                requester: [data.requester],
                responsiblePerson: [data.responsiblePerson],
            },
        }
        return res
    },
    edit: (data, equipmentClassId) => {
        let res = {
            ...data.info,
            equipmentClass: equipmentClassId,
            requester: data.info.requester[0],
            responsiblePerson: data.info.responsiblePerson[0],
            type: 1,
        }
        return res
    },
    apiToClient: (data) => {
        let res = data.map((item) => {
            return {
                ...item,
                plannedStart: convertDateFormatWithOutYear(item.plannedStart),
            }
        })
        return res
    },
}
export const CMMSMaintenanceMapper = {
    // bảo trì khắc phục
    clientToAPI: (data) => {
        let res = {
            ...data.info,
            equipmentClass: data.info.equipmentClass[0],
            requester: data.info.requester[0],
            reviewer: data.info.reviewer[0],
            responsiblePerson: data.info.responsiblePerson[0],
        }
        return res
    },
    initValue: (data) => {
        let res = {
            info: {
                ...data,
                requester: [data.requester.personId],
                responsiblePerson: [data.responsiblePerson.personId],
                reviewer: [data.reviewer.personId],
            },
        }
        return res
    },
    edit: (data) => {
        let res = {
            ...data.info,
            equipmentClass: data.info.equipmentClass[0],
            requester: data.info.requester[0],
            reviewer: data.info.reviewer[0],
            responsiblePerson: data.info.responsiblePerson[0],
        }
        return res
    },
    apiToClient: (data) => {
        let res = data.map((item) => {
            return {
                ...item,
                // submissionDate: convertDateFormat(item.submissionDate),
                // requestedCompletionDate: convertDateFormat(item.requestedCompletionDate),
                createdAt: convertDateFormat(item.createdAt),
                updatedAt: convertDateFormat(item.updatedAt),
                plannedStart: convertDateFormat(item.plannedStart),
                plannedFinish: convertDateFormat(item?.plannedFinish),
                actualStartTime: convertDateFormat(item.actualStartTime),
                actualFinishTime: convertDateFormat(item.actualFinishTime),
                dueDate: convertDateFormat(item.dueDate),
            }
        })
        return res
    },
}
function chuyenDoiDinhDangNgay(goc) {
    // Chia chuỗi ngày tháng thành các phần
    var mangChia = goc.split("T")
    var ngayThang = mangChia[0]
    var gioPhut = mangChia[1].split(":")[0] + ":" + mangChia[1].split(":")[1]

    // Tạo chuỗi mới với định dạng mong muốn
    var ketQua = ngayThang + " " + gioPhut

    return ketQua
}
export const CMMSWorkingTimeMapper = {
    apiToClient: (data) => {
        let res = data.map((item) => {
            return {
                // calendarId: "alarm",
                id: item.workingTimeId,
                title: item.equipment,
                start: chuyenDoiDinhDangNgay(item.from),
                end: chuyenDoiDinhDangNgay(item.to),

                description: "",
                people: [item.responsiblePerson],
                // data: {
                //     a: "hehe",
                //     b: "hihi",
                // },
            }
        })
        return res
    },
}
export const MESProductionProgressMapper = {
    apiToClient: (data) => {
        let res = data.map((item) => {
            return {
                ...item,
                startTime: convertDateFormat(item.startTime),
                endTime: convertDateFormat(item.endTime),
                plannedStart: convertDateFormat(item.plannedStart),
                plannedFinish: convertDateFormat(item?.plannedFinish),
                actualStartTime: convertDateFormat(item.actualStartTime),
                actualFinishTime: convertDateFormat(item.actualFinishTime),
                dueDate: convertDateFormat(item.dueDate),
            }
        })
        return res
    },
    schedule: (data, statusFilter) => {
        let res = data.map((item) => {
            return {
                calendarId:
                    item.workOrderStatus == 2 ? "unstarted" : item.workOrderStatus == 3 ? "running" : "complete",
                id: item.workOrderId,
                title: item.workOrderId,
                start: chuyenDoiDinhDangNgay(item.startTime),
                end: chuyenDoiDinhDangNgay(item.endTime),

                description: "",
                // people: [item.responsiblePerson],
                // data: {
                //     a: "hehe",
                //     b: "hihi",
                // },
            }
        })
        return res
    },
}
export const MESProductionScheduleMapper = {
    apiToClient: (data) => {
        let res = data.map((item) => {
            return {
                ...item,
                startTime: convertDateFormat(item.startTime),
                endTime: convertDateFormat(item.endTime),
                plannedStart: convertDateFormat(item.plannedStart),
                plannedFinish: convertDateFormat(item?.plannedFinish),
                actualStartTime: convertDateFormat(item.actualStartTime),
                actualFinishTime: convertDateFormat(item.actualFinishTime),
                dueDate: convertDateFormat(item.dueDate),
            }
        })
        return res
    },
    schedule: (data, statusFilter) => {
        let res = data.map((item) => {
            return {
                calendarId:
                    item.workOrderStatus == 2 ? "unstarted" : item.workOrderStatus == 3 ? "running" : "complete",
                id: item.workOrderId,
                title: item.workOrderId,
                start: chuyenDoiDinhDangNgay(item.startTime),
                end: chuyenDoiDinhDangNgay(item.endTime),

                description: "",
                // people: [item.responsiblePerson],
                // data: {
                //     a: "hehe",
                //     b: "hihi",
                // },
            }
        })
        return res
    },
}
export const MESWorkUnitMapper = {
    clientToAPI: (data) => {
        let res = {
            ...data.info,
            correctionType: data.info.correctionType[0],
        }
        return res
    },
    initValue: (data) => {
        let res = {
            info: {
                ...data,
            },
        }
        return res
    },
    edit: (data) => {
        let res = {
            ...data.info,
        }
        return res
    },
}
export const MESOperationMapper = {
    clientToAPI: (data) => {
        let res = {
            prerequisiteOperation: [],
            ...data.info,
            equipmentRequirements: data.equipmentRequirements.map((item) => item.equipmentRequirementsItem),
        }
        return res
    },
    initValue: (data) => {
        let res = {
            info: {
                ...data,
                prerequisiteOperation: data.prerequisiteOperation,
            },
        }
        return res
    },
    edit: (data) => {
        let res = {
            ...data.info,
        }
        return res
    },
}
export const SETTINGUserMapper = {
    apiToClient: (data) => {
        let res = data.map((item) => {
            return {
                ...item,
                dateOfBirth: convertDateFormat(item.dateOfBirth),
            }
        })
        return res
    },
}
