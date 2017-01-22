function sec_to_hourmin(val){
	function pad(num, unit){
	    if (num>0){
	    	return num+" "+unit;
	    } return '';
	}
	let minutes = val%60;
	let hours = Math.floor(val/60)
	if (hours>0){
		return pad(hours,'hour ')+pad(minutes, 'min');
	} else {
		return pad(minutes,'min')
	}
}

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

function removeEmptyValuesFromArray(array){
	let cleanArray = [];
	array.forEach(function(val){
		if(val.replace(/\s/g, "").length){
			cleanArray.push(val);
		}
	}.bind(cleanArray));
	return cleanArray;
}

function sortObjectArrayByProperty(array, propertyName){
	return array.sort(function(a, b){
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

export { sec_to_hourmin, hasClass, btnEffect, isElementInViewport, sortObjectArrayByProperty, removeEmptyValuesFromArray }