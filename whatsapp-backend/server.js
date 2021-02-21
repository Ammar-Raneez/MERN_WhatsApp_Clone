//imports
const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const MessageContent = require("./dbMessages")
const Pusher  = require('pusher')

//app config
const app = express()
const PORT = process.env.PORT || 9000

//pusher gives us ability for realtime sync (mongodb by itself aint realtime)
//whenever you post data to the mongodb db you'll need to refresh page in order to
//reflect it on the frontend - pusher makes this happen realtime
const pusher = new Pusher({
    appId: '1080084',
    key: '190f9f22f2e3f3646a67',
    secret: 'd73f26106d5cc9b5e3db',
    cluster: 'ap2',
    encrypted: true
});

//middleware
//*Without this line the json data isn't sent back to us
app.use(express.json())
dotenv.config()

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
})

//DB config
const connectionUrl = `mongodb+srv://admin:${process.env.PASSWORD}@cluster0.jj3il.mongodb.net/whatsappdb?retryWrites=true&w=majority`

//make mongoose run smoother
mongoose.connect(connectionUrl, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//open connection to database
const db = mongoose.connection
//once connection is open
db.once('open', () => {
    console.log("Db connected")

    //watch for any changes on the collection (realtime changes)
    const msgCollection = db.collection('messagecontents')
    const changeStream = msgCollection.watch()

    changeStream.on('change', change => {
        // console.log(change)

        //if the change is a new addition (a new message)
        if(change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            //trigger pusher - which has a channel (messages)
            //in which we'll insert the name and message into
            pusher.trigger('messages', 'inserted', 
            {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
            }) 
        } else {
            console.log("Error triggering Pusher")
        }
    })
})

//api routes
app.get("/", (req, res) => {
    res.statusCode = 200
    res.send("Hello World")
})

app.get("/api/messages/sync", (req, res) => {
    MessageContent.find((err, data) => {
        if(err) {
            res.statusCode = 500
            res.send(err)
        } else {
            res.statusCode = 200
            res.send(data)
        }
    })
})

//post messages
app.post("/api/messages/new", (req, res) => {
    const dbMessage = req.body;

    MessageContent.create(dbMessage, (err, data) => {
        if(err) {
            res.statusCode = 500
            res.send(err)
        } else {
            res.statusCode - 201
            res.send(data)
        }
    })
})

//listen
app.listen(PORT, () => console.log(`Listening of localhost: ${PORT}`))