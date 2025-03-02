class Constants {
    static connection = "connection"

    // USER
    static getAllUsersSuccess = "Users successfully fetch."
    static getAllUsersError = "Users fetch error."

    static getAllUsersTokenSuccess = "Users token successfully fetch."
    static getAllUsersTokenError = "Users token fetch error."

    static loginSuccess = "User successfully login."
    static loginError = "User login error."

    static findUserByIdSuccess = "User successfully fetch."
    static findUserByIdError = "User fetch error."

    static findUserByEmailSuccess = "User successfully fetch."
    static findUserByEmailError = "User fetch error."

    static getUserConversationSuccess = "User conversations successfully fetch."
    static getUserConversationError = "User conversations fetch error."

    static createUserSuccess = "User successfully created."
    static createUserError= "User create error."

    static updateUserSuccess = "User successfully updated."
    static updateUserError = "User update error."

    static deleteUserSuccess = "User successfully deleted."
    static deleteUserError = "User update error."

    // TEXTMESSAGE
    static createTextMessageSuccess = "Text message successfully created."
    static createTextMessageError = "Text message create error." 

    // IMAGEMESSAGE
    static createImageMessageSuccess = "Image message successfully created."
    static createImageMessageError = "Image message create error."

    // PARTICIPANT
    static createParticipantSuccess = "Participant successfully created."
    static createParticipantError = "Participant create error."

    static findParticipantConversationSuccess = "Participant conversations successfully fetch."
    static findParticipantConversationError = "Participant conversation fetch error."

    // CONVERSATION
    static createConversationSuccess = "Conversation successfully created."
    static createConversationError = "Conversation create error."

    // SOCKET
    static connection = "connection"
    
    // CONVERSATION MODULE
    

    // TEXTMESSAGE MODULE
    

    // IMAGEMESSAGE MODULE
    

    // TYPING MODULE
    
    // UTILS
    static defultPath = process.cwd()
    static imagePath = process.cwd() + "/images"
    //static imageEndPoint = "http://192.168.2.4:8080/images/"
    static imageEndPoint = "http://172.19.192.1:8080/images/"
    static mimTpe = ".JPEG"
}

module.exports = Constants