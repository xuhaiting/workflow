<template>
	<el-container class="designContainer">
		<el-header class="designHeader">
			<flow-header @add="add"></flow-header>
		</el-header>
		<a-table
			:columns="tableColumns"
			:data-source="tableData"
			rowKey="id"
		>
			<div slot="index" slot-scope="record, text, index">
				{{index + 1}}
			</div>
			<div slot="action" class="btn-list" slot-scope="record">
				<a-button type="primary" @click="edit(record)">
					编辑
				</a-button>
				<a-button type="primary" @click="stop(record)">
					停止
				</a-button>
			</div>
		</a-table>
	</el-container>
</template>
<script>
import FlowHeader from "./FlowListHeader";
import Config from "./config";

export default {
	name: "FlowList",
	components: { FlowHeader },
	data() {
		return {
			tableColumns: Config.tableColumns,
			tableData: Config.tableData
		};
	},
	computed: {
	},
	created() {
	},
	methods: {
		edit(record) {
			console.log('record', record);
			this.$router.push({
				path: "/flowDesign",
				query: {
					id: record.id
				}
			})
		},
		
		stop(record) {
			console.log('stop', record);
		},

		add() {
			console.log('add');
			this.$router.push("/flowDesign")
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

.btn-list {
	button {
		margin-right: 6px;
	}
}
</style>
