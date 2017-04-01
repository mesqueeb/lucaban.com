function MD(val) {
  // model -> view
  // formats the value when updating the input element.
  	// return moment(val).format("M/D");
  // // view -> model
  // // formats the value when writing to the data.
  // write: function(val, oldVal) {
  //   var number = +val.replace(/[^\d.]/g, '')
  //   return isNaN(number) ? 0 : parseFloat(number.toFixed(2))
  // }
}
function min_to_hours(val)
{
  	let nr = val/60;
  	if (val == 10){ nr = nr.toFixed(2); }
    return nr;
  // view -> model
  // formats the value when writing to the data.
  // write: function(val, oldVal) {
  //   let nr = parseFloat(val)*60;
  //   return nr;
  // }
}
function countdown(val)
{
	let item = allItems.nodes[val];
	let p = item.planned_time;
	let u = item.used_time;
	let time = parseFloat(p)*60-parseFloat(u);
	return calc_hhmmss(time);
}
function sec_to_hhmmss(val)
{
	return calc_hhmmss(val);
}
function calc_hhmmss(val){
	function pad(num){
	    return ("0"+num).slice(-2);
	}
	let secs;
	let minutes = Math.floor(val/60);
	secs = val%60;
	let hours = Math.floor(minutes/60)
	minutes = minutes%60;
	if (hours>0){
		return pad(hours)+":"+pad(minutes)+":"+pad(secs);
	} else {
		return pad(minutes)+":"+pad(secs);
	}
}
function sec_to_hourminsec(val)
{
	function pad(num, unit){
	    if (num>0){
	    	return num+" "+unit;
	    } return '';
	}
	let secs;
	let minutes = Math.floor(val/60);
	secs = val%60;
	let hours = Math.floor(minutes/60)
	minutes = minutes%60;
	if (hours>0){
		return pad(hours,vm.text.global.hour+' ')+pad(minutes, vm.text.global.min);
	} else if (minutes>0) {
		return pad(minutes,vm.text.global.min+' ')+pad(secs,vm.text.global.sec);
	} else {
		return pad(secs,vm.text.global.sec);
	}
}
function hourmin(val)
{
	function pad(num, unit){
	    if (num>0){
	    	return num+" "+unit;
	    } return '';
	}
	let minutes = val%60;
	let hours = Math.floor(val/60)
	if (hours>0){
		return pad(hours,vm.text.global.hour+' ')+pad(minutes, vm.text.global.min);
	} else {
		return pad(minutes,vm.text.global.min)
	}
}
function sec_to_hourmin(val)
{
	function pad(num, unit){
	    if (num>0){
	    	return num+" "+unit;
	    } return '';
	}
	let secs;
	let minutes = Math.floor(val/60);
	secs = val%60;
	let hours = Math.floor(minutes/60)
	minutes = minutes%60;
	if (hours>0){
		return pad(hours,vm.text.global.hour+' ')+pad(minutes, vm.text.global.min);
	} else {
		return pad(minutes,vm.text.global.min)
	}
}
function momentRelative(val)
{
  	return moment(val).fromNow();
}
function momentCalendar(val)
{
  	return moment(val).startOf('day').calendar(null, {
	    sameDay: '[Today]',
	    nextDay: '[Tomorrow]',
	    nextWeek: 'dddd',
	    lastDay: '[Yesterday]',
	    lastWeek: '[Last] dddd',
	    sameElse: 'YYYY/MM/DD'
	});
}
function momentDate(val)
{
  	return moment(val).startOf('day').calendar(null, {
	    sameDay: 'YYYY/MM/DD',
	    nextDay: 'YYYY/MM/DD',
	    nextWeek: 'YYYY/MM/DD',
	    lastDay: 'YYYY/MM/DD',
	    lastWeek: 'YYYY/MM/DD',
	    sameElse: 'YYYY/MM/DD',
	});
}

function linkify(val)
{
  	let a = linkifyHtml(val, {
		defaultProtocol: 'https'
	});
	return a;
}

export { MD, min_to_hours, countdown, sec_to_hhmmss, sec_to_hourminsec, hourmin, sec_to_hourmin, momentRelative, momentCalendar, momentDate, linkify }