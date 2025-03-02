const {
    TextMessage,
    ImageMessage,
    FileMessage,
    MessageTypes
} = require("./NotificationTypes.js")

const chatNotificationsCategories = {
    [TextMessage]: {
        type: "%Name%",
        template: "%messageData%",
        path: "/ChatScreen"
    },
    [ImageMessage]: {
        type: "%Name%",
        template: "sent a Image !",
        path: "/ChatScreen"
    },
    [FileMessage]: {
        type: "%Name%",
        template: "sent a Document",
        path: "/ChatScreen"
    }
}

module.exports = { chatNotificationsCategories }