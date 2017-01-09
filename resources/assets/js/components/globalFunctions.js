function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

function sortObjectArrayByProperty(array, propertyName){
	return array.sort(function(a, b){
		console.log('a[propertyName]');
		console.log(a[propertyName]);
		console.log(a);
		console.log('b[propertyName]');
		console.log(b[propertyName]);
		console.log(b);
	    let textA = a[propertyName].toUpperCase();
	    let textB = b[propertyName].toUpperCase();
	    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
	}.bind(propertyName));
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
		// $el.blur();
	}, 1000);
}

function isElementInViewport (el) {

    //special bonus for those using jQuery
    // if (typeof jQuery === "function" && el instanceof jQuery) {
    //     el = el[0];
    // }

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
}

export { hasClass, btnEffect, isElementInViewport, sortObjectArrayByProperty }