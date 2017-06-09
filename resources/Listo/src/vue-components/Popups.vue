<template id="popups-template">
<div id="c-popups">
<div
    v-for="popup in popups"
    :class="popup.type ? popup.type : 'secondary'"
    transition="fade"
>
    <div
        class="c-popup callout animated"
        v-if="popup.type=='afterDone'"
    >
        <div class="c-popup__top">
            <div class="c-popup__title">{{ get.text.popups.completed }} {{ popup.item.body }} {{ get.text.popups.completedB }}
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
        
        <div class="c-popup__body">
            <div class="c-popup__completion-memo">
              <label>{{ get.text.popups.journalNotes }}</label>
              <textarea name="c-popup__completion_memo__txtarea"
                v-model="popup.item.completion_memo"
                @keydown="keydownInCompletionMemo(popup, $event)"
                v-focus.noMobile
                v-autoheight
              ></textarea>
            </div>
            <div class="c-popup__used-time">
              <div>
                <label class="">{{ get.text.popups.usedTime }}</label>
                <!-- <input v-model="popup.item.used_time" type="number"/> -->
                <span class="">{{ sec_to_hhmmss(popup.item.used_time) }}</span>
              </div>
              <div class="buttons">
                <div>
                  <button class="o-btn forward"
                    @click="incrementUsedTime(popup.item, 60)"
                    @keydown="keydownInPopup(popup, $event, 'forward')"
                  >+1 {{ get.text.global.min }}</button>
                  <button class="o-btn forward"
                    @click="incrementUsedTime(popup.item, 300)"
                    @keydown="keydownInPopup(popup, $event, 'forward')"
                  >+5 {{ get.text.global.min }}</button>
                  <button class="o-btn forward"
                    @click="incrementUsedTime(popup.item, 600)"
                    @keydown="keydownInPopup(popup, $event, 'forward')"
                  >+10 {{ get.text.global.min }}</button>
                </div><div>
                  <button class="o-btn forward"
                    @click="incrementUsedTime(popup.item, 1800)"
                    @keydown="keydownInPopup(popup, $event, 'forward')"
                  >+30 {{ get.text.global.min }}</button>
                  <!-- <button class="o-btn forward"
                    @click="incrementUsedTime(popup.item, 3600)"
                    @keydown="keydownInPopup(popup, $event, 'forward')"
                  >+1 hour</button> -->
                  <button class="o-btn reset"
                    @click="resetUsedTime(popup.item)"
                    @keydown="keydownInPopup(popup, $event, 'reset')"
                  >{{ get.text.popups.reset }}</button>
                  <button class="o-btn undo-completion"
                    @click="setNotDone(popup)"
                    @keydown="keydownInPopup(popup, $event, 'setNotDone')"
                  >{{ get.text.popups.setNotDone }}</button>
                </div>
              </div>
            </div>
        </div>
        <button
          @click="removePopup(popup)"
          @keydown="keydownInPopup(popup, $event, 'closeButton')"
          class="o-btn c-popup__close-button"
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
import { sec_to_hhmmss, momentCalendar } from '../helpers/valueMorphers2.js'
import autosize from 'autosize';
import flatPickConfig from '../config/flatPickrOptions.js';

export default {
    name: 'Popups',
    template: '#popups-template',
    props: ['popups'],
    data(){ return { flatPickConfig }; },
    computed: {
        get(){ return this.$store.getters },
        state(){ return this.$store.state },
    },
    methods: {
        sec_to_hhmmss, momentCalendar,
        commit(action, payload){ this.$store.commit(action, payload) },
        dispatch(action, payload){ this.$store.dispatch(action, payload) },
        addPopup(popup) { this.commit('addPopup',{popup}) },
        removePopup(popup) {
            clearTimeout(popup.timer);
            if( popup.type=='afterDone' ){
                if(popup.item.used_time){
                    this.dispatch('patch', { id:popup.item.id, field:'used_time' });
                }
                if(popup.item.completion_memo){
                    this.dispatch('patch', { id:popup.item.id, field:'completion_memo' });
                }
            }
            let index = this.state.popups.indexOf(popup);
            this.commit('removePopup', { index });
            let self = this;
            Vue.nextTick(function () {
                if(self.state.popups.length){
                    document.querySelector('#c-popups>div:first-child textarea').focus();
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
            this.dispatch('markDone', { id:popup.item.id, markAs:'notDone' });
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
}
</script>