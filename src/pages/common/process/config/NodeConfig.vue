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
				<FormAuthorityConfig />
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
		Concurrent
	},
	data() {
		return {
			active: "properties",
			noForm: ["CONCURRENT", "CONDITION", "DELAY", "TRIGGER"]
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
	methods: {},
};
</script>

<style lang="less" scoped></style>
