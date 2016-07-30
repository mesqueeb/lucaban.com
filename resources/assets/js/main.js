import Panel from './vue-components/panel.vue';
var VueAutosize = require('vue-autosize')
Vue.use(VueAutosize)

new Vue({
	el:'body',
	data: {
		import_data: { null },
	},
	components: { Panel },
	methods:{
		fetchAll(){
			this.$http.get('/api/things').then(function(data) {
  				var data = data.json();
				var data = data[Object.keys(data)[0]];
  		// 		$.each(data, function(k, v) {
  		// 			console.log(k['body']);
  		// 			console.log(v['body']);
  		// 			console.log("k = "+k+" // v = "+v);
  		// 			// var nl = v['body'].split(/\r\n|\r|\n/).length;
  		// 			// v['rows'] = nl;
				// });
				this.import_data = data;
				console.log(JSON.stringify(data));
				console.log('...fetchedAll!');
			});
		},
		fetchTreeMetaFlat(){
			this.$http.post('/api/things/fetchTreeMetaFlat').then(function(data) {
  				var data = data.json();
				var result = {};
				for (var i=0; i<data.length; i++) {
				  result[data[i].lft] = data[i];
				}
  				console.log('printing flat data:');
  				console.log(result);
				var vm = this.$root.$children[0];
				vm.flatData = result;
			});
		},
	},
	created(){
    	this.fetchAll();
    	this.fetchTreeMetaFlat();
	},
	ready: function() {
      var vm = this;
      window.addEventListener('keydown', function(e) {
        if ( $('input:focus').length > 0 ||  $('textarea:focus').length > 0 ) {
          // INPUT AREAS IN FOCUS
		  switch(e.keyCode) { 
		  	case 13:
		  		if (e.shiftKey){
		  			break;
		  		}
		  		e.preventDefault();
		  		vm.$broadcast('enterOnFocussedInput');
		  		break;
		  } // end switch
		} else { 
		  // INPUT AREAS NOT IN FOCUS
          switch(e.keyCode) { 
			case 40: // arrowDown
				e.preventDefault();
				vm.$broadcast('arrowDown');
				break;
			case 38: // arrowUp
				e.preventDefault();
				vm.$broadcast('arrowUp');
				break;
			case 32: // spaceBar
				e.preventDefault();
				vm.$broadcast('spaceBar');
				break;
			case 9: // tab
				e.preventDefault();
				vm.$broadcast('tab');
				break;
			case 13: // enter
				e.preventDefault();
				vm.$broadcast('enter');
				break;
			case 'xexx':
				vm.$broadcast('unindent');
				break;
			case 'xexx':
				vm.$broadcast('unindent');
				break;
			case 'xexx':
				vm.$broadcast('unindent');
				break;
          } // end switch
    	} // END INPUT AREAS NOT IN FOCUS
      });
    },
	http: {
		root: '/root',
		headers: {
			'X-CSRF-TOKEN': document.querySelector('#token').getAttribute('value'),
		},
    },
});