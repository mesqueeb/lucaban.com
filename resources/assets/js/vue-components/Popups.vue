<template id="popups-template">
<div id="popups">
<div
    v-for="popup in popups"
    :class="popup.type ? popup.type : 'secondary'"
    transition="fade"
>
    <div
        class="popup callout animated"
        v-if="popup.type=='afterDone'"
    >
        <div class="top">
            <div class="title">{{ basis.text.popups.completed }} {{popup.item.body}} {{ basis.text.popups.completedB }}
            <label class="done-after-done"
                @keydown="keydownInPopup(popup, $event, 'flatPicker')"
            >{{ momentCalendar(popup.item.done_date) }}
                <input
                    v-flatpicky
                    :id="'done-date-edit-'+popup.item.id"
                    class="flatpickr"
                    :name="popup.item.id"
                    v-model="popup.item.done_date"
                >
            </label></div>
        </div>
        
        <div class="body">
            <div class="completion-memo">
              <label>{{ basis.text.popups.journalNotes }}</label>
              <textarea name="completion_memo"
                v-model="popup.item.completion_memo"
                @keydown="keydownInCompletionMemo(popup, $event)"
                v-focus
                v-autoheight
              ></textarea>
            </div>
            <div class="used-time">
              <div>
                <label class="">{{ basis.text.popups.usedTime }}</label>
                <!-- <input v-model="popup.item.used_time" type="number"/> -->
                <span class="">{{ sec_to_hhmmss(popup.item.used_time) }}</span>
              </div>
              <div class="buttons">
                <div>
                  <button class="o-btn forward"
                    @click="incrementUsedTime(popup.item, 60)"
                    @keydown="keydownInPopup(popup, $event, 'forward')"
                  >+1 {{ basis.text.global.min }}</button>
                  <button class="o-btn forward"
                    @click="incrementUsedTime(popup.item, 300)"
                    @keydown="keydownInPopup(popup, $event, 'forward')"
                  >+5 {{ basis.text.global.min }}</button>
                  <button class="o-btn forward"
                    @click="incrementUsedTime(popup.item, 600)"
                    @keydown="keydownInPopup(popup, $event, 'forward')"
                  >+10 {{ basis.text.global.min }}</button>
                </div><div>
                  <button class="o-btn forward"
                    @click="incrementUsedTime(popup.item, 1800)"
                    @keydown="keydownInPopup(popup, $event, 'forward')"
                  >+30 {{ basis.text.global.min }}</button>
                  <!-- <button class="o-btn forward"
                    @click="incrementUsedTime(popup.item, 3600)"
                    @keydown="keydownInPopup(popup, $event, 'forward')"
                  >+1 hour</button> -->
                  <button class="o-btn reset"
                    @click="resetUsedTime(popup.item)"
                    @keydown="keydownInPopup(popup, $event, 'reset')"
                  >{{ basis.text.popups.reset }}</button>
                  <button class="o-btn undo-completion"
                    @click="setNotDone(popup)"
                    @keydown="keydownInPopup(popup, $event, 'setNotDone')"
                  >{{ basis.text.popups.setNotDone }}</button>
                </div>
              </div>
            </div>
        </div>
        <button
          @click="removePopup(popup)"
          @keydown="keydownInPopup(popup, $event, 'closeButton')"
          class="o-btn close-button"
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
import autosize from 'autosize';
import flatPickConfig from '../components/flatPickrOptions.js';

export default {
    name: 'Popups',
    template: '#popups-template',
    props: ['popups'],
    data(){ return { flatPickConfig }; },
    computed: {
        basis()
        {
          return this.$root;
        },
    },
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
            Vue.nextTick(function () {
                if(vm.popups.length){
                    document.querySelector('#popups>div:first-child textarea').focus();
                }
            });

        },
        incrementUsedTime(item, amount) {
            if (!item.used_time){ 
                item.used_time = amount;
            } else {
                item.used_time = parseFloat(item.used_time)+amount;
            }
        },
        setNotDone(popup)
        {
            this.$root.markDone(popup.item.id, 'notDone');
            this.removePopup(popup);
        },
        resetUsedTime(item){
            item.used_time = 0;
        },
        keydownInCompletionMemo(popup, e){
            if ( // ESCape
                (e.keyCode == 13 && (e.ctrlKey || e.metaKey)) // Enter
                || e.keyCode == 27 // Escape
            ){
                this.removePopup(popup);
            }
        },
        keydownInPopup(popup, e, field){
            if(field == 'flatPickr'){
                if(e.keyCode == '9' && e.shiftKey){ // Tab
                    preventKeydownListener();
                    e.preventDefault();
                }
            }
            if(field == 'closeButton'){
                if(e.keyCode == '9' && !e.shiftKey){ // Tab
                    preventKeydownListener();
                    e.preventDefault();
                }
            }
            if(e.keyCode == 27) // Escape
            {
                this.removePopup(popup);
            }
        },
    },
    directives: {
        focus: {
          inserted(el)
          {
            Vue.nextTick(function () { el.focus(); });
          }
        },
        autoheight: {
          inserted(el, binding)
          {
            Vue.nextTick(function () { autosize(el); });
          }
        },
    },
}
</script>