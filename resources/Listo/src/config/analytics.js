export default {
    logEvent(category, action, label, sessionId = 0) {
        dataLayer.push({
            'appEventCategory': category,
            'appEventAction': action,
            'appEventLabel': label,
            'sessionId': sessionId
        });
        dataLayer.push({ 'event': 'appEvent' });
    },
    logPage(path, name, sessionId = 0) {
        dataLayer.push({
            'screenPath': path,
            'screenName': name,
            'sessionId': sessionId
        });
        dataLayer.push({ 'event': 'appScreenView' });
    }
}