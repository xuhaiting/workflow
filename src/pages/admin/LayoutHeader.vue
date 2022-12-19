<template>
	<div class="header">
		<div class="back">
			<el-button
				@click="exit"
				size="medium"
				icon="el-icon-arrow-left"
				circle
			></el-button>
			<span>
				<span>{{ setup.formName }}</span>
			</span>
		</div>
		<div class="publish">
				<el-button
					size="mini"
					type="error"
					@click="reset"
					round
					icon="el-icon-refresh"
					>重置</el-button
				>
			<el-button
				size="mini"
				type="primary"
				@click="preview"
				round
				icon="el-icon-view"
				>预览</el-button
			>
			<el-button
				size="mini"
				type="primary"
				@click="publish"
				round
				icon="el-icon-s-promotion"
				>发布</el-button
			>
		</div>
	</div>
</template>

<script>
export default {
	name: "FlowHeader",
	computed: {
		setup() {
			return this.$store.state.design;
		},
	},
	data() {
		return {};
	},
	methods: {
		publish() {
			this.$emit("publish");
		},

		preview() {
			this.$emit("preview");
		},

		reset() {
			this.$emit("reset");
		},

		exit() {
			this.$confirm({
				title: '提示',
				content: "未发布的内容将不会被保存，是否直接退出?",
				onOk: () => {
					this.$router.back()
				},
				onCancel() {},
      		});
		},
	},
};
</script>
<style lang="less" scoped>
.header {
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;

	.el-menu {
		top: 0;
		z-index: 999;
		display: flex;
		justify-content: center;
		width: 100%;
	}
}
</style>
