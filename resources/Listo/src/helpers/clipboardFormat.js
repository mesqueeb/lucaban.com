function clipboardFormat(childrenArray, {depth = 0, includeChildren = true, first = false} = {depth:0, includeChildren:false, first:false}){
	let bulletin = store.state.userSettings.clipboardSettings.bulletin;
	let depthSpace = store.state.userSettings.clipboardSettings.depthSpace;
	let spaces = depthSpace.repeat(depth);
    let formattedList = childrenArray.reduce(function(all, val){
    	let list = `${all}
${spaces}${bulletin}${val.body}`;
		let children = (!itemGetters[val.id]) ? [] : itemGetters[val.id].visibleDirectChildren;
		let childList = (includeChildren && children.length) ? clipboardFormat(children, {depth: depth+1}) : '';
		return list+childList;
	}, '');
    return (!first) ? formattedList : formattedList.substr(1);
}
export default clipboardFormat;