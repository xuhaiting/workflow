<template>
	<div>
		<a-row type="flex">
			<a-col flex="10"><a-input disabled :value="config.formOption ? `${config.formOption[0]['formName']}-${config.formOption[0]['formCode']}` : ''" /></a-col>
			<a-col flex="2"
				><a-button type="primary" block @click="onHandleSearch"
					>查找</a-button
				></a-col
			>
		</a-row>
		<a-modal
			:visible="visible"
			:zIndex="999999"
			width="800px"
			class="formTableModal"
			title="表单列表"
			okText="确定"
			cancelText="取消"
			:ok-button-props="{ props: { disabled: selectedRowKeys.length === 0 } }"
			@cancel="onHandleCancel"
			@ok="handleOk"
		>
			<a-table
				:columns="columns"
				:data-source="data"
				rowKey="id"
				:row-selection="{ selectedRowKeys: selectedRowKeys,type: 'radio',onChange: onSelectChange }"
			></a-table>
		</a-modal>
	</div>
</template>
<script>
export default {
	name: "FormResource",
	props:{
		config:{
			type: Object,
			default: ()=>{
				return {}
			}
		}
	},
	components: {},
	data() {
		return {
			visible: false,
			selectedRowKeys: [],
			selectedRowObjects: [],
			columns: [
				{
					title: "表单代号",
					dataIndex: "formCode",
					key: "formCode",
				},
				{
					title: "表单名称",
					dataIndex: "formName",
					key: "formName",
				},
				{
					title: "创建时间",
					key: "createTime",
					dataIndex: "createTime",
				},
			],
			data: [
				{
					id: 1,
					formCode: "form-00001",
					formName: "请假流程表单1",
					createTime: "2022-12-23",
				},
				{
					id: 2,
					formCode: "form-00002",
					formName: "请假流程表单2",
					createTime: "2022-12-23",
				},
				{
					id: 3,
					formCode: "form-00003",
					formName: "请假流程表单3",
					createTime: "2022-12-23",
				},
				{
					id: 4,
					formCode: "form-00004",
					formName: "请假流程表单4",
					createTime: "2022-12-23",
				},
			],
		};
	},
	computed: {
		selectNode() {
			return this.$store.state.selectedNode;
		},
	},
	methods: {
		onSelectChange(rowKeys, rowObjects) {
			this.selectedRowKeys = rowKeys;
			this.selectedRowObjects = rowObjects;
		},
		onHandleCancel() {
			this.visible = false;
		},
		handleOk() {
			this.visible = false;
			const { selectNode, selectedRowObjects = [] } = this;
			selectNode.props["formOption"] = selectedRowObjects;
			this.$store.commit("selectedNode", selectNode);
		},
		onHandleSearch() {
			const { formOption = [] } = this.config;
			if (formOption.length > 0) {
				const option = formOption[0];
				const ids = [option['id']];
				this.selectedRowKeys = ids;
				this.selectedRowObjects = option;
			}
			this.visible = true;
		},
	},
};
</script>

<style lang="less" scoped></style>
