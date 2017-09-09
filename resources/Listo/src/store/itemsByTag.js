// imports
import { Utilities } from '../helpers/globalFunctions.js'
let { tagSlugToName } = Utilities;

let cachedItemsByTag = {};
export default function(tagSlug) {
	if (cachedItemsByTag[tagSlug]) { return cachedItemsByTag[tagSlug] }
	console.log(`creating new Vue for itemsByTag ${tagSlug}!`)
	return cachedItemsByTag[tagSlug] = new Vue({
		props: ['tag'],
		data(){ return {} },
		computed:
		{
			get(){ return store.getters },
			state(){ return store.state },
			selection(){ return this.state.selection },
			idsFlat()
			{
				console.log(`running itemsByTag(${tagSlug}).idsFlat`);
				return Object.keys(this.state.nodes)
				.map(k => (Number(k)) ? Number(k) : k)
				.filter(id => {
					return this.state.nodes[id].tagged
					.filter(tagObject => {
						return tagObject.tag_slug == tagSlug
					}).length
				})
			},
			countFlat(){ return this.idsFlat.length },
			flat(){ return this.idsFlat.map(id => this.state.nodes[id]) },
			idsTree()
			{
				console.log(`running itemsByTag(${tagSlug}).idsTree`);
				return Object.keys(this.state.nodes)
				.map(k => (Number(k)) ? Number(k) : k)
				.filter(id => {
					return this.state.nodes[id].tagged
					.filter(tagObject => {
						if (tagObject.tag_slug == tagSlug)
						{
							return !this.get.hasParentWithTag(id, tagSlug)
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
			// 		return this.get.hasParentWithTag(id, tagSlug)
			// 	})
			// },
			// itemsWhoseParentHasTag()
			// {
			// 	return idsWhoseParentHasTag.map(id => this.state.nodes[id])
			// },
		},
		methods:
		{
			commit(action, payload){ store.commit(action, payload) },
			dispatch(action, payload){ store.dispatch(action, payload) },
			tagSlugToName,
		},
	});
}