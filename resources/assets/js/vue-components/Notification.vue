<template id="popup-template">
    <div class="popup callout animated"
        :class="popup.type ? popup.type : 'secondary'"
        transition="fade"
    >
        <button @click="triggerClose(popup)" class="close-button" aria-label="Close alert" type="button">
            <span aria-hidden="true">&times;</span>
        </button>
        <h5 v-if="popup.title">{{popup.title}}</h5>
        <p>{{popup.text}}</p>
    </div>

</template>
<script>

export default {
    name: 'APopup',
    template: '#popup-template',
    props: ['popup'],
    data () {
        return { timer: null }
    },
    ready () {
        let timeout = this.popup.hasOwnProperty('timeout') ? this.popup.timeout : true
        if (timeout) {
          	let delay = this.popup.delay || 3000
            this.timer = setTimeout(function () {
                this.triggerClose(this.popup)
            }.bind(this), delay)
        }
    },
    methods: {
        triggerClose: function (popup) {
        	clearTimeout(this.timer)
            this.$dispatch('close-popup', popup)
        },
    },
}
</script>