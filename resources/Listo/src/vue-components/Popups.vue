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
    data(){ return { flatPickConfig }; },
    computed: {
        get(){ return this.$store.getters },
        state(){ return this.$store.state },
        popups(){ return this.state.popups },
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
<style lang="scss">
@import '../css/_variables.scss';
#c-popups{
    top: 0;
    position: fixed;
    width: 100%;
    z-index: 5;
    display: flex;
    flex-direction: column;
    background: rgba(248,248,248,0.95);
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
}
.c-popup {
    padding: 0.6em;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
}
.c-popup__top{
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 0.5em;
}
.c-popup__title{
    font-weight: 600;
    margin: 0 auto;
}
.c-popup__body{
    display: flex;
    flex-grow: 1;
}
.c-popup{
    input, textarea{
        @include text-settings();
        padding: 0.3em;
        margin-right: 1em;
        background: none;
        border: 1px solid rgb(146, 146, 146);
        border-radius: 0.3em;
    }
    label.done-after-done {
        cursor: pointer;
        font-weight: inherit;
        border-bottom: 1px solid;
        input {
            border: none;
        }
    }
}
.c-popup__completion-memo,
.c-popup__completion-memo__txtarea{
    display: flex;
    flex-direction: column;
    flex-grow: 2;
    margin-right: 0.3em;
}
.mobile .popup{
    .completion-memo{
        font-size: 16px;
    }
}
.c-popup__close-button {
    padding-left: 0.5em;
    font-size:2em;
    color:black;
}
.c-popup__used-time{
    display: flex;
    flex-direction: column;
    flex-grow: 0;
    span{
        font-size: 1.4em;
        margin-left: 1em;
    }
    >div>div{
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
    }
    button{
        padding: 0.3em 0.3em 0;
    }
}
</style>