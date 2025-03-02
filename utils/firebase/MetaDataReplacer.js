const UserManager = require("../../Business/UserManager.js")

async function chatTemplatePlaceholder(type, template, messageData, senderId) {
    const fetchData = await UserManager.getUserFcmToken(senderId)
    const name = fetchData.data.userName
    const replaceUserNameTemplates = type.replace(/%Name%/, name)
    let replaceMessageTemplate
    if(messageData)
        replaceMessageTemplate = template.replace(/%messageData%/, messageData)
    else if(messageData == null)
        replaceMessageTemplate = template
    
    const chatTemplateData = [ replaceUserNameTemplates, replaceMessageTemplate]
    return chatTemplateData
}

module.exports = {
    chatTemplatePlaceholder
}

