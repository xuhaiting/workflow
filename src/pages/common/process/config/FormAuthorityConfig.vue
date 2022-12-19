<template>
	<div>
		<el-table
			:header-cell-style="{ background: '#f5f6f6' }"
			:data="formPerms"
			border
			style="width: 100%"
		>
			<el-table-column
				prop="title"
				show-overflow-tooltip
				label="表单字段"
			>
				<template slot-scope="scope">
					<span v-if="scope.row.required" style="color: #c75450">
						*
					</span>
					<span>{{ scope.row.title }}</span>
				</template>
			</el-table-column>
			<template v-for="(item, index) in columns">
				<el-table-column
					:prop="item.prop"
					:key="index"
					:label="item.label"
					width="90"
					v-if="nowNode.type !== item.node"
				>
					<template slot="header">
						<el-radio
							:label="item.value"
							v-model="permSelect"
							@change="() => allSelect(item.value)"
							>{{ item.label }}</el-radio
						>
					</template>
					<template slot-scope="scope">
						<el-radio
							v-model="scope.row.perm"
							:label="item.value"
							:name="scope.row.id"
						></el-radio>
					</template>
				</el-table-column>
			</template>
		</el-table>
		<!-- <el-table
			:header-cell-style="{ background: '#f5f6f6' }"
			:data="formPerms"
			border
			style="width: 100%"
		>
			<el-table-column
				prop="title"
				show-overflow-tooltip
				label="表单字段"
			>
				<template slot-scope="scope">
					<span v-if="scope.row.required" style="color: #c75450">
						*
					</span>
					<span>{{ scope.row.title }}</span>
				</template>
			</el-table-column>
			<template v-for="(item, index) in columns">
				<el-table-column
					:prop="item.prop"
					:key="index"
					:label="item.label"
					width="90"
					v-if="nowNode.type !== item.node"
				>
					<template slot="header">
						<el-radio
							:label="item.value"
							v-model="permSelect"
							@change="() => allSelect(item.value)"
							>{{ item.label }}</el-radio
						>
					</template>
					<template slot-scope="scope">
						<el-radio
							v-model="scope.row.perm"
							:label="item.value"
							:name="scope.row.id"
						></el-radio>
					</template>
				</el-table-column>
			</template>
			<el-table-column prop="readOnly" label="只读" width="80">
				<template slot="header" slot-scope="scope">
					<el-radio
						label="R"
						v-model="permSelect"
						@change="allSelect('R')"
						>只读</el-radio
					>
				</template>
				<template slot-scope="scope">
					<el-radio
						v-model="scope.row.perm"
						label="R"
						:name="scope.row.id"
					></el-radio>
				</template>
			</el-table-column>
			<el-table-column
				prop="editable"
				label="可编辑"
				width="90"
				v-if="nowNode.type !== 'CC'"
			>
				<template slot="header" slot-scope="scope">
					<el-radio
						label="E"
						v-model="permSelect"
						@change="allSelect('E')"
						>可编辑</el-radio
					>
				</template>
				<template slot-scope="scope">
					<el-radio
						v-model="scope.row.perm"
						label="E"
						:name="scope.row.id"
					></el-radio>
				</template>
			</el-table-column>
			<el-table-column prop="hide" label="隐藏" width="80">
				<template slot="header" slot-scope="scope">
					<el-radio
						label="H"
						v-model="permSelect"
						@change="allSelect('H')"
						>隐藏</el-radio
					>
				</template>
				<template slot-scope="scope">
					<el-radio
						v-model="scope.row.perm"
						label="H"
						:name="scope.row.id"
					></el-radio>
				</template>
			</el-table-column>
		</el-table> -->
	</div>
</template>

<script>
export default {
	name: "FormAuthorityConfig",
	components: {},
	data() {
		return {
			tableData: [],
			isIndeterminate: false,
			permSelect: "",
			checkStatus: {
				readOnly: true,
				editable: false,
				hide: false,
			},
			columns: [
				{
					label: "只读",
					prop: "readOnly",
					value: "R",
					slots: { title: 'title' },
				},
				{
					label: "编辑",
					prop: "editable",
					value: "E",
					node: "CC",
					slots: { title: 'title' },
				},
				{
					label: "隐藏",
					prop: "hide",
					value: "H",
					slots: { title: 'title' },
				},
			],
		};
	},
	created() {
		//备份
		let oldPermMap = this.formPerms.toMap("id");
		//重新清空，按顺序加载权限
		this.formPerms.length = 0;
		this.formPermsLoad(oldPermMap, this.formData);
	},
	computed: {
		nowNode() {
			return this.$store.state.selectedNode;
		},
		formData() {
			return (
				this.$store.state.selectedNode.props.formItems ||
				this.$store.state.design.formItems
			);
		},
		formPerms() {
			return this.$store.state.selectedNode.props.formPerms;
		},
	},
	methods: {
		allSelect(type) {
			this.formPerms.forEach((f) => (f.perm = type));
			//不知道为什么第一次无效
			setTimeout(() => {
				this.permSelect = type;
			});
		},
		formPermsLoad(oldPermMap, forms) {
			forms.forEach((form) => {
				if (form.name === "SpanLayout") {
					this.formPermsLoad(oldPermMap, form.props.items);
				} else {
					//刷新名称
					let old = oldPermMap.get(form.id);
					if (old) {
						old.title = form.title;
						old.required = form.props.required;
						this.formPerms.push(old);
					} else {
						this.formPerms.push({
							id: form.id,
							title: form.title,
							required: form.props.required,
							perm:
								this.$store.state.selectedNode.type === "ROOT"
									? "E"
									: "R",
						});
					}
				}
			});
		},
		handleCheckAllChange() {},
	},
	watch: {
		formPerms: {
			deep: true,
			handler() {
				const set = new Set(this.formPerms.map((f) => f.perm));
				this.permSelect = set.size === 1 ? set.values()[0] : "";
			},
		},
	},
};
</script>

<style lang="less" scoped>
/deep/ .el-table__row {
	& > td:first-child {
		.cell {
			text-align: left;
		}
	}

	.cell {
		text-align: center;
	}

	.el-radio__label {
		display: none;
	}
}
</style>
