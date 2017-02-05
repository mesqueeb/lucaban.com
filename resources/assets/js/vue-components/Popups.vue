<template id="popups-template">
<div id="popups">
  <div v-for="popup in popups"
      :class="popup.type ? popup.type : 'secondary'"
      transition="fade"
  >
    <div
      class="popup callout animated"
      v-if="popup.type=='afterDone'"
    >
      <div class="top">
          <div class="title">Completed {{popup.item.body}}
          <label class="done-after-done"
              @keydown="keydownInPopup(popup, $event, 'flatPicker')"
          >{{ momentCalendar(popup.item.done_date) }}
            <input class="flatpickr"
              :id="'done-date-edit-'+popup.item.id+'-popup'"
              v-model="popup.item.done_date"
              @keydown="keydownInPopup(popup, $event, 'flatPicker')"
            >
          </label></div>
      </div>
      
      <div class="body">
          <div class="completion-memo">
            <label>Journal notes</label>
            <textarea name="completion_memo"
              v-model="popup.item.completion_memo"
              v-autosize="popup.item.completion_memo"
              @keydown="keydownInCompletionMemo(popup, $event)"
            ></textarea>
          </div>
          <div class="used-time">
            <div>
              <label class="">Used time</label>
              <!-- <input v-model="popup.item.used_time" type="number"/> -->
              <span class="">{{ sec_to_hhmmss(popup.item.used_time) }}</span>
            </div>
            <div class="buttons">
              <div>
                <button class="forward"
                  @click="incrementUsedTime(popup.item, 60)"
                >+1 min</button>
                <button class="forward"
                  @click="incrementUsedTime(popup.item, 300)"
                >+5 min</button>
                <button class="forward"
                  @click="incrementUsedTime(popup.item, 600)"
                >+10 min</button>
              </div><div>
                <button class="forward"
                  @click="incrementUsedTime(popup.item, 1800)"
                >+30 min</button>
                <!-- <button class="forward"
                  @click="incrementUsedTime(popup.item, 3600)"
                >+1 hour</button> -->
                <button class="reset"
                  @click="resetUsedTime(popup.item)"
                >Reset</button>
              </div>
            </div>
          </div>
      </div>
      <button
        @click="removePopup(popup)"
        @keydown="keydownInPopup(popup, $event, 'closeButton')"
        class="close-button"
        aria-label="Close alert"
        type="button"
      >
          <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</div>
</template>
<script>
import { sec_to_hhmmss, momentCalendar } from '../components/valueMorphers2.js'

export default {
    name: 'Popups',
    template: '#popups-template',
    props: ['popups'],
    methods: {
        sec_to_hhmmss, momentCalendar,
        addPopup(popup) {
            this.$root.popups.push(popup)
        },
        removePopup(popup) {
            clearTimeout(popup.timer);
            if( popup.type=='afterDone' ){
                if(popup.item.used_time){
                    this.$root.patch(popup.item.id, 'used_time');
                }
                if(popup.item.completion_memo){
                    this.$root.patch(popup.item.id, 'completion_memo');
                }
            }
            let index = this.$root.popups.indexOf(popup);
            this.$root.popups.splice(index, 1);
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
        },
        keydownInCompletionMemo(popup, e){
            if ( // ESCape
                (e.keyCode == 13 && (e.ctrlKey || e.metaKey))
                || e.keyCode == 27
            ){
                this.removePopup(popup);
                setTimeout(function(){
                    if(vm.popups.length){
                        document.querySelector('#popups>div:first-child textarea').focus();
                    }
                }.bind(this), 200);
            } else {

            }
        },
        keydownInPopup(popup, e, field){
            if(field == 'flatPickr'){
                if(e.keyCode == '9' && e.shiftKey){
                    e.preventDefault();
                }
            }
            if(field == 'closeButton'){
                if(e.keyCode == '9' && !e.shiftKey){
                    e.preventDefault();
                }
            }
        },
    },
}
</script>