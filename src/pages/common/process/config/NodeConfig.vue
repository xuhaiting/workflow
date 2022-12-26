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
			<el-tab-pane label="选择表单" name="formResource">
				<FormResource :config="selectNode.props"/>
			</el-tab-pane>
			<el-tab-pane v-if="false" label="表单权限设置" name="permissions">
				<a-form
					layout="inline"
					:form="paramsForm"
					@submit="handleSubmit"
				>
					<a-row
						:key="index"
						v-for="(k, index) in paramsForm.getFieldValue('keys')"
					>
						<a-form-item
							v-for="(item, i) in jsonArray"
							:key="i"
							:label="item.label"
						>
							<a-input
								v-decorator="[`params[${k}][${item.field}]`]"
								:placeholder="item.placeholder"
							/>
						</a-form-item>
						<a-form-item>
							<a-icon
								v-if="
									paramsForm.getFieldValue('keys').length > 1
								"
								type="minus-circle-o"
								:disabled="
									paramsForm.getFieldValue('keys').length ===
									1
								"
								@click="() => remove(k)"
							/>
						</a-form-item>
					</a-row>
					<a-row type="flex" justify="center">
						<a-col>
							<a-form-item>
								<a-button type="primary" block @click="add">
									<a-icon type="plus" />增加参数
								</a-button>
							</a-form-item>
						</a-col>
						<a-col>
							<a-form-item>
								<a-button
									type="primary"
									block
									html-type="submit"
								>
									<a-icon type="save" />获取表单字段
								</a-button>
							</a-form-item>
						</a-col>
					</a-row>
				</a-form>
				<el-button type="primary" @click="setFormData"
					>设置表单数据</el-button
				>
				<el-button type="error" @click="resetFormData">清空</el-button>
				<FormAuthorityConfig :formItems="formItems" />
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
let id = 0;
import Approval from "./ApprovalNodeConfig.vue";
import Condition from "./ConditionNodeConfig.vue";
import Delay from "./DelayNodeConfig.vue";
import Cc from "./CcNodeConfig.vue";
import Trigger from "./TriggerNodeConfig.vue";
import FormAuthorityConfig from "./FormAuthorityConfig.vue";
import Root from "./RootNodeConfig.vue";
import Concurrent from "./ConcurrentGroupItemConfig.vue";
import FormResource from "./FormResource.vue"
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
		FormResource
	},
	data() {
		return {
			active: "properties",
			noForm: ["CONCURRENT", "CONDITION", "DELAY", "TRIGGER"],
			jsonArray: [
				{
					label: "字段",
					field: "key",
					placeholder: "参数键",
				},
				{
					label: "值",
					field: "value",
					placeholder: "参数值",
				},
			],
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
	beforeCreate() {
		this.paramsForm = this.$form.createForm(this, { name: "paramsForm" });
		this.paramsForm.getFieldDecorator("keys", {
			initialValue: [],
			preserve: true,
		});
	},
	methods: {
		handleSubmit(e) {
			e.preventDefault();
			this.paramsForm.validateFields((err, values) => {
				console.log("values", values);
				if (!err) {
					const { keys, params } = values;
					console.log("Received values of form: ", values);
					console.log(
						"Merged values:",
						keys.map((key) => params[key])
					);
				}
			});
		},

		remove(k) {
			const { paramsForm } = this;
			const keys = paramsForm.getFieldValue("keys");
			if (keys.length === 1) {
				return;
			}
			paramsForm.setFieldsValue({
				keys: keys.filter((key) => key !== k),
			});
		},

		add() {
			const { paramsForm } = this;
			const keys = paramsForm.getFieldValue("keys");
			const nextKeys = keys.concat(id++);
			paramsForm.setFieldsValue({
				keys: nextKeys,
			});
		},

		resetFormData() {
			const selectNode = this.selectNode;
			selectNode.props["formPerms"] = [];
			selectNode.props["formItems"] = [];
			this.$store.commit("selectedNode", selectNode);
		},
		setFormData() {
			const selectNode = this.selectNode;
			const formPerms = this.formItems.map((form) => {
				return {
					id: form.id,
					title: form.title,
					required: form.props.required,
					perm:
						this.$store.state.selectedNode.type === "ROOT"
							? "E"
							: "R",
				};
			});
			console.log("formPerms", formPerms);
			selectNode.props["formPerms"] = formPerms;
			selectNode.props["formItems"] = this.formItems;
			this.$store.commit("selectedNode", selectNode);
		},
	},
};
</script>

<style lang="less" scoped></style>
