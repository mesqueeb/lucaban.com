<template id="popups-template">
    <div class="popups">
      <div v-for="popup in popups"
          class="popup callout animated"
          :class="popup.type ? popup.type : 'secondary'"
          transition="fade"
      >
          <button @click="removePopup(popup)" class="close-button" aria-label="Close alert" type="button">
              <span aria-hidden="true">&times;</span>
          </button>
          <div v-if="popup.title">{{popup.title}}</div>
          <div v-if="popup.text">{{popup.text}}</div>
          <div v-if="popup.type=='usedTime'">
            <input type="number"/>
          </div>
      </div>
    </div>
</template>
<script>

export default {
    name: 'Popups',
    template: '#popups-template',
    props: ['popups'],
    methods: {
        addPopup(popup) {
            this.$root.popups.push(popup)
        },
        removePopup(popup) {
            clearTimeout(this.timer)
            this.$root.popups.$remove(popup)
        },
    },
}
</script>