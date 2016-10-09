function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

function btnEffect(event){
	console.log(event);
	let $el;
	if (event.target.nodeName == 'I'){
		$el = $(event.target.offsetParent);
	} else {
		$el = $(event.target);
	}
	$el.addClass("btn--click");
	setTimeout(function(){
		$el.removeClass("btn--click");
	}, 400);
	setTimeout(function(){
		$el.blur();
	}, 1000);
}

export { hasClass, btnEffect }