<template>
</template>

<script>
import { Utilities } from '../helpers/globalFunctions.js'
let { tagSlugToName } = Utilities;

export default {
	props: ['tag'],
	data(){ return {} },
	created(){
		if (!window.itemsByTag)
		{
			window.itemsByTag = {}
		}
		window.itemsByTag[this.tag.slug] = this;
	},
	computed:
	{
		get(){ return this.$store.getters },
		state(){ return this.$store.state },
		selection(){ return this.state.selection },
		idsFlat()
		{
			console.log(`running itemsByTag[${this.tag.slug}].idsFlat`);
			return Object.keys(this.state.nodes)
			.map(k => (Number(k)) ? Number(k) : k)
			.filter(id => {
				return this.state.nodes[id].tagged
				.filter(tagObject => {
					return tagObject.tag_slug == this.tag.slug
				}).length
			})
		},
		countFlat(){ return this.idsFlat.length },
		flat(){ return this.idsFlat.map(id => this.state.nodes[id]) },
		idsTree()
		{
			console.log(`running itemsByTag[${this.tag.slug}].idsTree`);
			return Object.keys(this.state.nodes)
			.map(k => (Number(k)) ? Number(k) : k)
			.filter(id => {
				return this.state.nodes[id].tagged
				.filter(tagObject => {
					if (tagObject.tag_slug == this.tag.slug)
					{
						return !this.get.hasParentWithTag(id, this.tag.slug)
					}
				}).length
			})
		},
		countTree(){ return this.idsTree.length },
		tree(){ return this.idsTree.map(id => this.state.nodes[id]) },
		// idsWhoseParentHasTag()
		// {
		// 	console.log('running itemsWhoseParentHasTag...');
		// 	return Object.keys(this.state.nodes)
		// 	.map(k => (Number(k)) ? Number(k) : k)
		// 	.filter(id => {
		// 		return this.get.hasParentWithTag(id, this.tag.slug)
		// 	})
		// },
		// itemsWhoseParentHasTag()
		// {
		// 	return idsWhoseParentHasTag.map(id => this.state.nodes[id])
		// },
	},
	methods:
	{
		commit(action, payload){ this.$store.commit(action, payload) },
		dispatch(action, payload){ this.$store.dispatch(action, payload) },
		tagSlugToName,
	},
}
</script>

<style lang="scss">
@import '../css/_variables.scss';
</style>
