const firebase = require("../utils/firebase/Firebase.js")
const { notificationCategories } = require("../utils/firebase/NotificationCategories.js")
const UserManager = require("../Business/UserManager.js")
const { chatNotificationsCategories } = require("../utils/firebase/NotificationCategories.js")
const { chatTemplatePlaceholder } = require("../utils/firebase/MetaDataReplacer")
const { MessageTypes } = require("../utils/firebase/NotificationTypes.js")



async function sendMessageNotification(userId, conversationId, textMessage) {
    try {
        let user = await UserManager.findUserById(userId);
        let userTokensResult = await UserManager.getUsersConversationTokens(conversationId);

        if (userTokensResult.success) {
            let userTokens = userTokensResult.data;
            console.log(user.data.userName)
            for (let userToken of userTokens) {
                try {
                    let message = {
                        token: userToken.token,
                        notification: {
                            title: user.data.userName,
                            body: textMessage
                        }
                    };
                    const response = await firebase.admin.messaging().send(message);
                    console.log("Notification successfully sent:", response);
                } catch (error) {
                    console.error("notification sent error:", error);
                }
            }
        } else {
            console.error("Token error:", userTokensResult.error);
        }
    } catch (error) {
        console.error("User not found error:", error);
    }
}



async function sendImageMessageNotification() {

}

async function sendDocumentMessageNotification() {

}


async function sendChatNotification(userId, chatNotificationCategory, messageData, senderId) {
    const { type, tempalte, path} = chatNotificationsCategories[chatNotificationCategory]
    let userToken = await UserManager.getUserFcmToken(userId)

    const [ chatTemplateData, userType] = await Promise.all([
        chatTemplatePlaceholder(type, tempalte, messageData, senderId) //, getChatUserType(userId)
    ])

    let message = {
        token: userToken.data.toString(),
        notificationCategories: {
            title: chatTemplateData[0],
            body: chatTemplateData[1]
        }
    }

    try {
        const response = await firebase.messaging().send(message)
        console.log("valla gitti galiba aga.", response)
    } catch (error) {
        console.log("patladık galiba, ", error)
    }
}

module.exports = { sendChatNotification, sendMessageNotification }
