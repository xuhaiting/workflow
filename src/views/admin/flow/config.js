const tableColumns = [{
    title: "序号",
    scopedSlots: { 
        customRender: 'index' 
    },
}, {
    title: "流程节点",
    dataIndex: "flowCode",
}, {
    title: "流程名称",
    dataIndex: "flowName",
}, {
    title: "状态",
    dataIndex: "status",
}, {
    title: "是否启动",
    dataIndex: "isStart",
}, {
    title: "时间",
    dataIndex: "createTime",
}, {
    title: "操作",
    scopedSlots: { 
        customRender: 'action' 
    },
}];

const tableData = [{
    id: 1,
    flowCode: "task_000001",
    flowName: "task_请假审批流程",
    createTime: "2022-12-14 00:00:00",
    status: 1,
    isStart: 1
}, {
    id: 2,
    flowCode: "task_000002",
    flowName: "task_请假审批流程",
    createTime: "2022-12-14 01:00:00",
    status: 2,
    isStart: 2
}, {
    id: 3,
    flowCode: "task_000003",
    flowName: "task_请假审批流程",
    createTime: "2022-12-14 02:00:00",
    status: 1,
    isStart: 1
}, {
    id: 4,
    flowCode: "task_000004",
    flowName: "task_请假审批流程",
    createTime: "2022-12-14 03:00:00",
    status: 2,
    isStart: 2
}, {
    id: 5,
    flowCode: "task_000005",
    flowName: "task_请假审批流程",
    createTime: "2022-12-14 04:00:00",
    status: 1,
    isStart: 1
}];

const flowDesignData = {
    init: {
        formItems: [],
        process: {
            id: "root",
            parentId: null,
            type: "ROOT",
            name: "发起人",
            desc: "任何人",
            props: {
                assignedUser: [],
                formPerms: [],
            },
            children: {},
        },
    },
    id: {
        "groupId": null,
        "formItems": [],
        "process": {
            "id": "root",
            "parentId": null,
            "type": "ROOT",
            "name": "发起人",
            "desc": "任何人",
            "props": {
                "assignedUser": [{
                    "id": 381496,
                    "name": "旅人",
                    "type": "user",
                    "selected": false
                }],
                "formPerms": []
            },
            "children": {
                "id": "node_175165093969",
                "parentId": "root",
                "props": {},
                "type": "CONCURRENTS",
                "name": "并行分支",
                "children": {
                    "id": "node_175165095850",
                    "parentId": "node_175165093969",
                    "type": "EMPTY",
                    "children": {
                        "id": "node_179767887916",
                        "parentId": "node_175165095850",
                        "props": {
                            "shouldAdd": true,
                            "assignedUser": [{
                                "id": 381496,
                                "name": "旅人",
                                "type": "user",
                                "selected": false
                            }],
                            "formPerms": []
                        },
                        "type": "CC",
                        "name": "抄送人",
                        "children": {
                            "id": "node_175200761413",
                            "parentId": "node_179767887916",
                            "props": {
                                "assignedType": "LEADER",
                                "mode": "AND",
                                "sign": false,
                                "nobody": {
                                    "handler": "TO_PASS",
                                    "assignedUser": []
                                },
                                "timeLimit": {
                                    "timeout": {
                                        "unit": "H",
                                        "value": 0
                                    },
                                    "handler": {
                                        "type": "REFUSE",
                                        "notify": {
                                            "once": true,
                                            "hour": 1
                                        }
                                    }
                                },
                                "assignedUser": [],
                                "formPerms": [],
                                "selfSelect": {
                                    "multiple": false
                                },
                                "leaderTop": {
                                    "endCondition": "TOP",
                                    "endLevel": 1
                                },
                                "leader": {
                                    "level": 1
                                },
                                "role": [],
                                "refuse": {
                                    "type": "TO_END",
                                    "target": ""
                                },
                                "formUser": ""
                            },
                            "type": "APPROVAL",
                            "name": "直接上级",
                            "children": {
                                "id": "node_179536938690",
                                "parentId": "node_175200761413",
                                "props": {
                                    "type": "FIXED",
                                    "time": "120",
                                    "unit": "M",
                                    "dateTime": ""
                                },
                                "type": "DELAY",
                                "name": "延时处理",
                                "children": {
                                    "id": "node_175253654903",
                                    "parentId": "node_179536938690",
                                    "props": {
                                        "assignedType": "LEADER_TOP",
                                        "mode": "AND",
                                        "sign": false,
                                        "nobody": {
                                            "handler": "TO_PASS",
                                            "assignedUser": []
                                        },
                                        "timeLimit": {
                                            "timeout": {
                                                "unit": "H",
                                                "value": 0
                                            },
                                            "handler": {
                                                "type": "REFUSE",
                                                "notify": {
                                                    "once": true,
                                                    "hour": 1
                                                }
                                            }
                                        },
                                        "assignedUser": [],
                                        "formPerms": [],
                                        "selfSelect": {
                                            "multiple": false
                                        },
                                        "leaderTop": {
                                            "endCondition": "TOP",
                                            "endLevel": 1
                                        },
                                        "leader": {
                                            "level": 1
                                        },
                                        "role": [],
                                        "refuse": {
                                            "type": "TO_NODE",
                                            "target": ""
                                        },
                                        "formUser": ""
                                    },
                                    "type": "APPROVAL",
                                    "name": "经理",
                                    "children": {}
                                }
                            }
                        }
                    }
                },
                "branchs": [{
                        "id": "node_175165096142",
                        "name": "分支1",
                        "parentId": "node_175165093969",
                        "type": "CONCURRENT",
                        "props": {},
                        "children": {}
                    },
                    {
                        "id": "node_175165092978",
                        "name": "分支2",
                        "parentId": "node_175165093969",
                        "type": "CONCURRENT",
                        "props": {},
                        "children": {}
                    },
                    {
                        "id": "node_175175339339",
                        "parentId": "node_175165093969",
                        "name": "分支3",
                        "props": {},
                        "type": "CONCURRENT",
                        "children": {}
                    }
                ]
            }
        }
    }
}

export default{
    tableColumns,
    tableData,
    flowDesignData
}