<template>
	<div class="header">
		<div class="back">
		</div>
		<div class="publish">
			<a-button
				type="primary"
				@click="add"
				icon="file-add"
				>新增</a-button
			>
		</div>
	</div>
</template>

<script>
export default {
	name: "FlowListHeader",
	data() {
		return {};
	},
	methods: {
		add() {
			this.$emit("add");
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
