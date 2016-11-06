export default function(Vue){

Vue.filter('M/D', {
  // model -> view
  // formats the value when updating the input element.
  read: function(val) {
  	return moment(val).format("M/D");
  },
  // // view -> model
  // // formats the value when writing to the data.
  // write: function(val, oldVal) {
  //   var number = +val.replace(/[^\d.]/g, '')
  //   return isNaN(number) ? 0 : parseFloat(number.toFixed(2))
  // }
});
Vue.filter('min_to_hours', {
  // model -> view
  // formats the value when updating the input element.
  read: function(val) {
  	let nr = val/60;
  	if (val == 10){ nr = nr.toFixed(2); }
    return nr;
  },
  // view -> model
  // formats the value when writing to the data.
  write: function(val, oldVal) {
    let nr = parseFloat(val)*60;
    return nr;
  }
});
Vue.filter('countdown', {
	read: function(val) {
		let item = allItems.nodes[val];
		let p = item.planned_time;
		let u = item.used_time;
		let time = parseFloat(p)*60-parseFloat(u);
		return calc_hhmmss(time);
	},
});
Vue.filter('hhmmss', {
	read: function(val) {
		return calc_hhmmss(val);
	},
});
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
Vue.filter('hourminsec', {
	read: function(val) {
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
			return pad(hours,'hour ')+pad(minutes, 'min');
		} else if (minutes>0) {
			return pad(minutes,'min ')+pad(secs,'sec');
		} else {
			return pad(secs,'sec');
		}
	},
});
Vue.filter('hourmin', {
	read: function(val) {
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
	},
});
Vue.filter('momentRelative', {
	read: function(val) {
  		return moment(val).fromNow();
	},
});
Vue.filter('momentCalendar', {
	read: function(val) {
	  	return moment(val).startOf('day').calendar(null, {
		    sameDay: '[Today]',
		    nextDay: '[Tomorrow]',
		    nextWeek: 'dddd',
		    lastDay: '[Yesterday]',
		    lastWeek: '[Last] dddd',
		    sameElse: 'YYYY/MM/DD'
		});
  	},
});
Vue.filter('momentDate', {
	read: function(val) {
	  	return moment(val).startOf('day').calendar(null, {
		    sameDay: 'YYYY/MM/DD',
		    nextDay: 'YYYY/MM/DD',
		    nextWeek: 'YYYY/MM/DD',
		    lastDay: 'YYYY/MM/DD',
		    lastWeek: 'YYYY/MM/DD',
		    sameElse: 'YYYY/MM/DD',
		});
  	},
});

Vue.filter('linkify', {
	read: function(val) {
	  	return linkifyHtml(val, {
			defaultProtocol: 'https'
		});
  	},
});

} // export default function(Vue)