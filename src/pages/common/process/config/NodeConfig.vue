<template>
	<div>
		<component
			v-if="noForm.includes(selectNode.type)"
			:is="(selectNode.type || '').toLowerCase()"
			:config="selectNode.props"
		/>
		<el-tabs v-model="active" v-else>
			<el-tab-pane :label="name" name="properties">
				<component
					:is="(selectNode.type || '').toLowerCase()"
					:config="selectNode.props"
				/>
			</el-tab-pane>
			<el-tab-pane label="表单权限设置" name="permissions">
				<el-button type="primary" @click="setFormData">设置表单数据</el-button>
				<el-button type="error" @click="resetFormData">清空</el-button>
				<FormAuthorityConfig :formItems="formItems"/>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
import Approval from "./ApprovalNodeConfig.vue";
import Condition from "./ConditionNodeConfig.vue";
import Delay from "./DelayNodeConfig.vue";
import Cc from "./CcNodeConfig.vue";
import Trigger from "./TriggerNodeConfig.vue";
import FormAuthorityConfig from "./FormAuthorityConfig.vue";
import Root from "./RootNodeConfig.vue";
import Concurrent from "./ConcurrentGroupItemConfig.vue";
//CONCURRENT
export default {
	name: "NodeConfig",
	components: {
		Approval,
		Condition,
		Trigger,
		Delay,
		Root,
		Cc,
		FormAuthorityConfig,
		Concurrent,
	},
	data() {
		return {
			active: "properties",
			noForm: ["CONCURRENT", "CONDITION", "DELAY", "TRIGGER"],
			formItems: [
				{
					title: "多行文本输入",
					name: "TextareaInput",
					icon: "el-icon-more-outline",
					value: "",
					valueType: "String",
					props: {
						required: false,
						enablePrint: true,
					},
					id: "field9309669418551",
				},
				{
					title: "金额输入框",
					name: "AmountInput",
					icon: "iconfont icon-zhufangbutiezhanghu",
					value: "",
					valueType: "Number",
					props: {
						required: false,
						enablePrint: true,
						showChinese: true,
					},
					id: "field2468269681076",
				},
				{
					title: "单选框",
					name: "SelectInput",
					icon: "el-icon-circle-check",
					value: "",
					valueType: "String",
					props: {
						required: false,
						enablePrint: true,
						expanding: false,
						options: ["选项1", "选项2"],
					},
					id: "field9628269688300",
				},
			],
		};
	},
	computed: {
		selectNode() {
			return this.$store.state.selectedNode;
		},
		formConfig() {
			return this.$store.state.design.formItems;
		},
		name() {
			switch (this.selectNode.type) {
				case "ROOT":
					return "设置发起人";
				case "APPROVAL":
					return "设置审批人";
				case "CC":
					return "设置抄送人";
				default:
					return null;
			}
		},
	},
	methods: {
		resetFormData() {
			const selectNode = this.selectNode;
			selectNode.props['formPerms'] = [];
			selectNode.props['formItems'] = [];
			this.$store.commit('selectedNode', selectNode);
		},
		setFormData() {
			const selectNode = this.selectNode;
			const formPerms = this.formItems.map(form => {
				return {
					id: form.id,
					title: form.title,
					required: form.props.required,
					perm: this.$store.state.selectedNode.type === 'ROOT' ? 'E' : 'R'
				}
			})
			console.log('formPerms', formPerms);
			selectNode.props['formPerms'] = formPerms;
			selectNode.props['formItems'] = this.formItems;
			this.$store.commit('selectedNode', selectNode);
		}
	},
};
</script>

<style lang="less" scoped></style>
