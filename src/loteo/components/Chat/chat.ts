import {CometChat} from "@cometchat-pro/chat";
import config from "./config";
export default {
    LISTENER_KEY_MESSAGE: "msglistener",
    appId: config.appId,
    apiKey: config.apiKey,
    LISTENER_KEY_GROUP: "grouplistener",
    init: function() {
        return CometChat.init(config.appId);
    },
    getTextMessage: function(uid, text, msgType) {
        if (msgType === "user") {
            return new CometChat.TextMessage(uid, text, CometChat.MESSAGE_TYPE.TEXT, CometChat.RECEIVER_TYPE.USER);
        } else {
            return new CometChat.TextMessage(uid, text, CometChat.MESSAGE_TYPE.TEXT, CometChat.RECEIVER_TYPE.GROUP);
        }
    },
    getLoggedinUser: function() {
        return CometChat.getLoggedinUser();
    },
    login: function(UID) {
        return CometChat.login(UID, this.apiKey);
    },
    getGroupMessages: function(GUID, callback, limit = 30) {
        const messagesRequest = new CometChat.MessagesRequestBuilder()
            .setGUID(GUID)
            .setLimit(limit)
            .build();
        callback();
        return messagesRequest.fetchPrevious();
    },
    sendGroupMessage: function(UID, message) {
        const textMessage = this.getTextMessage(UID, message, "group");
        return CometChat.sendMessage(textMessage);
    },
    joinGroup: function(GUID) {
        return CometChat.joinGroup(GUID, CometChat.GROUP_TYPE.PUBLIC, "");
    },
    addMessageListener: function(callback) {
        CometChat.addMessageListener(
            "msglistener",
            new CometChat.MessageListener({
                onTextMessageReceived: textMessage => {
                    console.log("Incoming Message Log", { textMessage })
                    callback(textMessage);
                }
            })
        );
    }
}
