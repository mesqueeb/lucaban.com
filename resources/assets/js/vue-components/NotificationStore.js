export default class NotificationStore {
	constructor(obj){
	    this.state = []; // here the notifications will be added
        this.state.push(obj);
	}
    addNotification(notification) {
        this.state.push(notification)
    }
    removeNotification(notification) {
        this.state.$remove(notification)
    }
}