const { sequelize } = require('../database/mysql.js');
const { DataTypes } = require('sequelize');
const Conversation = require('./Conversation.js');
const TextMessage = require('./TextMessage.js');
const ImageMessage = require('./ImageMessage.js');
const Message = require('./Message.js');
const Participant = require('./Participant.js');
const MessageContentType = require('./MessageContentType.js');

const User = sequelize.define('users', {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING
    },
    userName: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    token: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'users',
    timestamps: false
})



Conversation.hasMany(TextMessage, {
    foreignKey: 'id',
    as: 'textMessage'
})

Conversation.hasMany(ImageMessage, {
    foreignKey: 'id',
    as: 'imageMessage'
})

User.belongsToMany(Conversation, { through: Participant, foreignKey: 'userId' })
Conversation.belongsToMany(User, {through: Participant, as:'groupMembers', foreignKey: 'conversationId'})

Conversation.hasMany(Message, {
    foreignKey: 'conversationId', //as: 'ChatItems'
})
Message.belongsTo(Conversation, {
    foreignKey: 'conversationId'
})
Message.hasOne(MessageContentType, {
    foreignKey: 'id'
})
Message.belongsTo(MessageContentType, { 
    foreignKey: 'messageContentTypeId',
    as: 'messageContentType'
});
Message.hasOne(TextMessage, {
    foreignKey: 'id',
    as: 'textMessage'
})
Message.hasOne(ImageMessage, {
    foreignKey: 'id',
    as: 'imageMessage'
})
Message.hasOne(User, {
    foreignKey: 'id', sourceKey: 'userId'
})


/*Conversation.hasMany(TextMessage, {
    foreignKey: 'id',
    as: 'textMessage'
})

Conversation.hasMany(ImageMessage, {
    foreignKey: 'id',
    as: 'imageMessage'
})

User.belongsToMany(Conversation, { through: Participant, foreignKey: 'userId' })
Conversation.belongsToMany(User, {through: Participant, as:'groupMembers', foreignKey: 'conversationId'})

Conversation.hasMany(Message, {
    foreignKey: 'conversationId', //as: 'ChatItems'
})
Message.belongsTo(Conversation, {
    foreignKey: 'conversationId'
})
Message.hasOne(MessageContentType, {
    foreignKey: 'id'
})
Message.belongsTo(MessageContentType, { 
    foreignKey: 'messageContentTypeId',
    as: 'messageContentType'
});
Message.hasOne(TextMessage, {
    foreignKey: 'id',
    as: 'textMessage'
})
Message.hasOne(ImageMessage, {
    foreignKey: 'id',
    as: 'imageMessage'
})
Message.hasOne(User, {
    foreignKey: 'id', sourceKey: 'userId'
})*/


module.exports = User