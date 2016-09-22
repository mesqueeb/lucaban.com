<template id="popups-template">
    <div class="popups">
      <div v-for="popup in popups"
          class="popup callout animated"
          :class="popup.type ? popup.type : 'secondary'"
          transition="fade"
      >
          <div v-if="popup.title" class="title">{{popup.title}}</div>
          <div v-if="popup.text">{{popup.text}}</div>
          <div v-if="popup.type=='afterDone'" class="body">
              <div class="completion-memo">
                <label>Completion note</label>
                <textarea name="completion_memo"
                  v-model="popup.item.completion_memo"
                  v-autosize="popup.item.completion_memo"
                >{{ popup.item.completion_memo }}</textarea>
              </div>
              <div class="used-time">
                <div>
                    <label>Used time</label>
                    <input v-model="popup.item.used_time" type="number"/>
                    <span>{{ popup.item.used_time | hhmmss }}</span>
                </div>
                <div>
                    <button class="forward"
                      @click="incrementUsedTime(popup.item, 60)"
                    >+1 minute</button>
                    <button class="forward"
                      @click="incrementUsedTime(popup.item, 300)"
                    >+5 minutes</button>
                    <button class="forward"
                      @click="incrementUsedTime(popup.item, 600)"
                    >+10 minutes</button>
                    <button class="reset"
                      @click="resetUsedTime(popup.item)"
                    >Reset</button>
                </div>
              </div>
          </div>
          <button @click="removePopup(popup)" class="close-button" aria-label="Close alert" type="button">
              <span aria-hidden="true">&times;</span>
          </button>
      </div>
    </div>
</template>
<script>
import radio from './Radio.vue';
import buttonz from './ButtonGroup.vue';
// import radio from '../../../../node_modules/vue-strap/src/radio'
// import buttonz from 'vue-strap/src/buttonGroup'
export default {
    name: 'Popups',
    template: '#popups-template',
    components: {radio, buttonz},
    props: ['popups'],
    methods: {
        addPopup(popup) {
            this.$root.popups.push(popup)
        },
        removePopup(popup) {
            clearTimeout(popup.timer);
            if( popup.type=='afterDone' ){
              
              this.$root.patch(popup.item.id, 'used_time');
              this.$root.patch(popup.item.id, 'completion_memo');
            }
            this.$root.popups.$remove(popup);
        },
        incrementUsedTime(item, amount) {
            if (!item.used_time){ 
                item.used_time = amount;
            } else {
                item.used_time = parseFloat(item.used_time)+amount;
            }
        },
        resetUsedTime(item){
            item.used_time = 0;
        }
    },
}
</script>