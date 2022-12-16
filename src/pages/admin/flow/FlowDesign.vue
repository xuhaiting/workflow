<template>
	<el-container class="designContainer">
		<el-header class="designHeader">
			<flow-header @publish="publish" @preview="preview" @reset="reset"></flow-header>
		</el-header>
		<process-design ref="processDesign" class="designBody"/>
		<el-drawer
			title="流程数据结构"
			size="500px"
			class="drawerContainer"
			:visible.sync="flowDataVisible">
			<div class="drawerContent">
				<pre id="flowCode">{{flowCode}}</pre>
			</div>
		</el-drawer>
		<w-dialog :showFooter="false" v-model="validVisible" title="设置项检查">
			<el-steps align-center :active="validStep" finish-status="success">
				<el-step
					v-for="(step, i) in validOptions"
					:title="step.title"
					:key="i"
					:icon="step.icon"
					:status="step.status"
					:description="step.description"
				/>
			</el-steps>
			<el-result
				:icon="validIcon"
				:title="errTitle"
				:subTitle="validResult.desc"
			>
				<i
					slot="icon"
					style="font-size: 30px"
					v-if="!validResult.finished"
					class="el-icon-loading"
				></i>
				<div
					slot="subTitle"
					class="err-info"
					v-if="validResult.errs && validResult.errs.length > 0"
				>
					<ellipsis
						hover-tip
						v-for="(err, i) in validResult.errs"
						:key="i + '_err'"
						:content="err"
					>
						<i slot="pre" class="el-icon-warning-outline"></i>
					</ellipsis>
				</div>
				<template slot="extra">
					<el-button
						type="primary"
						v-if="validResult.finished"
						size="medium"
						@click="doAfter"
					>
						{{ validResult.action }}
					</el-button>
				</template>
			</el-result>
		</w-dialog>
	</el-container>
</template>
<script>
import FlowHeader from "./FlowHeader";
import ProcessDesign from "../layout/ProcessDesign";
import Config from "./config";

export default {
	name: "FlowDesign",
	components: { FlowHeader, ProcessDesign },
	data() {
		return {
			validStep: 0,
			timer: null,
			validVisible: false,
			validResult: {},
			validOptions: [
				{ title: "审批流程", description: "", icon: "", status: "" },
			],
			validComponents: ["processDesign"],
			flowDataVisible: false,
			flowCode: {}
		};
	},
	computed: {
		setup() {
			return this.$store.state.design;
		},
		errTitle() {
			if (this.validResult.finished && !this.validResult.success) {
				return (
					this.validResult.title +
					` (${this.validResult.errs.length}项错误) 😥`
				);
			}
			return this.validResult.title;
		},
		validIcon() {
			if (!this.validResult.finished) {
				return "el-icon-loading";
			} else if (this.validResult.success) {
				return "success";
			} else {
				return "warning";
			}
		},
	},
	created() {
		this.loadInitFrom();
		const group = this.$route.query.group;
		this.setup.groupId = this.$isNotEmpty(group) ? parseInt(group) : null;
	},
	methods: {
		reset() {
			this.$confirm({
				title: '提示',
				content: '重置将还原所有配置，是否继续',
				onOk: () => {
					this.loadInitFrom();
				},
				onCancel() {},
			});
		},

		loadInitFrom() {
			const id = this.$route.query.id;
			const { flowDesignData } = Config;
			const loadFormData = id ? flowDesignData.id : flowDesignData.init;
			const data = JSON.parse(JSON.stringify(loadFormData));
			this.$store.commit("loadForm", data);
		},

		preview() {
			this.validateDesign();
		},

		stopTimer() {
			if (this.timer) {
				clearInterval(this.timer);
			}
		},

		showValiding() {
			this.validResult = {
				errs: [],
				finished: false,
				success: false,
				title: "检查中...",
				action: "处理",
				desc: "正在检查设置项",
			};
			this.validStep = 0;
			this.validOptions.forEach((op) => {
				op.status = "";
				op.icon = "";
				op.description = "";
			});
		},

		showValidFinish(success, err) {
			this.validResult.success = success;
			this.validResult.finished = true;
			this.validResult.title = success ? "校验完成 😀" : "校验失败 ";
			this.validResult.desc = success
				? "设置项校验成功，是否提交？"
				: err;
			this.validResult.action = success ? "提 交" : "去修改";
		},

		getDefaultValidErr() {
			switch (this.validStep) {
				case 0:
					return "请检查基础设置项";
				case 1:
					return "请检查审批表单相关设置";
				case 2:
					return "请检查审批流程，查看对应标注节点错误信息";
				case 3:
					return "请检查扩展设置";
				default:
					return "未知错误";
			}
		},

		validateDesign() {
			this.validVisible = true;
			this.validStep = 0;
			this.showValiding();
			this.stopTimer();
			this.timer = setInterval(() => {
				this.validResult.errs =
					this.$refs[this.validComponents[this.validStep]].validate();
				if (
					Array.isArray(this.validResult.errs) &&
					this.validResult.errs.length === 0
				) {
					this.validStep++;
					if (this.validStep >= this.validOptions.length) {
						this.stopTimer();
						this.showValidFinish(true);
					}
				} else {
					this.stopTimer();
					this.validOptions[this.validStep].status = "error";
					this.showValidFinish(false, this.getDefaultValidErr());
				}
			}, 300);
		},

		doAfter() {
			if (this.validResult.success) {
				this.publish();
			} else {
				this.activeSelect = this.validComponents[this.validStep];
				this.validVisible = false;
			}
		},

		publish() {
			const template = {
				formId: this.setup.formId,
				formName: this.setup.formName,
				logo: JSON.stringify(this.setup.logo),
				settings: JSON.stringify(this.setup.settings),
				groupId: this.setup.groupId,
				formItems: this.setup.formItems,
				process: this.setup.process,
			};
			console.log("publish", template);
			this.flowCode = template;
			this.flowDataVisible = true;
		}
	},
};
</script>

<style lang="less" scoped>
.designContainer {
	// position: fixed;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
}

.designHeader {
	background-color: #fff;
	flex-shrink: 0;
}

.designBody {
	flex-grow: 1;
	width: 100%;
	overflow: auto;
}

.drawerContainer {
	/deep/.el-drawer {
		display: flex;
		flex-direction: column;

		.el-drawer__body {
			flex-grow: 1;
			display: flex !important;
			flex-direction: column;
			.drawerContent {
				padding: 20px;
				height: 0;
				overflow: auto;
				flex-grow: 1;
			}

			.drawerFooter {
				padding: 10px 20px;
				flex-shrink: 0;
				border-top: 1px solid #ddd;
			}
		}
	}
}

.btnList {
	display: flex;
	align-items: center;
	justify-content: flex-end;
}

/deep/ .el-step {
	.is-success {
		color: #2a99ff;
		border-color: #2a99ff;
	}
}

// ::-webkit-scrollbar {
// 	width: 2px;
// 	height: 2px;
// 	background-color: white;
// }

// ::-webkit-scrollbar-thumb {
// 	border-radius: 16px;
// 	background-color: #e8e8e8;
// }
</style>
