const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);

const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/images', express.static('images'))


const io = new Server(httpServer, {
    maxHttpBufferSize: 1e8
})

const User = require("./models/User.js")
const Conversation = require("./models/Conversation.js")
const TextMessage = require("./models/TextMessage.js")
const ImageMessage = require("./models/ImageMessage.js")
const Message = require("./models/Message.js")
const MessageContentType = require("./models/MessageContentType.js")
const Participant = require("./models/Participant.js")
const { QueryTypes } = require("sequelize")

const ConversationModule = require('./socket/ConversationModule.js')
const TextMessageModule = require("./socket/TextMessageModule.js")
const ImageMessageModule = require("./socket/ImageMessageModule.js")
const TypingModule = require("./socket/TypingModule.js")
const ParticipantModule = require("./socket/ParticipantModule.js")
const UserModule = require("./socket/UserModule.js")

io.on("connection", (socket) => {

    console.log("a user connected")

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    const conversationModule = new ConversationModule(socket)
    const textMessageModule = new TextMessageModule(socket)
    const imageMessageModule = new ImageMessageModule(socket)
    const typingModule = new TypingModule(socket)
    const participantModule = new ParticipantModule(socket)
    const userModule = new UserModule(socket)
    conversationModule
    textMessageModule
    imageMessageModule
    typingModule
    participantModule
    userModule
})



const userRoutes = require("./routes/UserRoutes.js")
app.use('/api/user', userRoutes)
const conversationRoutes = require("./routes/ConversationRoutes.js");
const { sequelize } = require("./database/mysql.js");
app.use('/api/conversation', conversationRoutes)


app.get('/test', (req, res) => {
    User.findAll({
        attributes: ['token'], // Yalnızca token alanını seçiyoruz
        include: [{
          model: Conversation,
          attributes: [], // Conversation bilgilerini döndürmüyoruz
          where: { id: 1 },
          through: { attributes: [] } // Participant tablosundaki ilişkisel veriyi atlamak için
        }]
      }).then(result => {
        res.send(result)
    })
})


app.get('/aaa', (req, res) => {


    User.findAll({
        where: {
            id: 1
        },
        attributes: { exclude: ['id','email','userName','password'] },
        include: [
            {
                model: Conversation,
                through: { attributes: [] },
                include: [
                    { 
                        model: Message,
                        attributes: { exclude: ['userId'] },
                        include: [
                            { model: User, attributes: { exclude: ['password'] } },
                            { model: MessageContentType, as: 'messageContentType' },
                            { model: TextMessage, as: 'textMessage' },
                            { model: ImageMessage, as: 'imageMessage', attributes: { exclude: ['imageBlob'] } }
                        ],
                        order: [['id', 'ASC']],
                        separate: true
                    },
                    {
                        model: User,
                        attributes: { exclude: ['password'] },
                        through: { attributes: [] },
                        as: 'groupMembers'
                    }
                ]
            }
        ],
        nest: true,
        type: QueryTypes.SELECT
    }).then(result => {
        res.send(result)
    })
})


  
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})



httpServer.listen(process.env.SERVER_PORT, () => {
    console.log(`Server listening on port: ${process.env.SERVER_PORT}`);
});
  
