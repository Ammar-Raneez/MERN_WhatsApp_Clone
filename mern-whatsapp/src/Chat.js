import { Avatar, IconButton } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import './Chat.css'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import MicIcon from '@material-ui/icons/Mic';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import axios from './axios'
import { useStateValue } from './StateProvider';

function Chat({ messages }) {
    const [seed, setSeed] = useState("");
    const [{ user }] = useStateValue();
    const [input, setInput] = useState("");

    const sendMessage = async e => {
        e.preventDefault();

        await axios.post('/api/messages/new', {
            message: input,
            name: user?.displayName,
            timestamp: new Date().toUTCString(),
        })
        setInput('')
    }

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [])

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat__headerInfo">
                    <h4>Room name</h4>
                    <p>Last seen at {messages[messages.length -1]?.timestamp}</p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
						<SearchOutlinedIcon />
					</IconButton>

					<IconButton>
						<AttachFileOutlinedIcon />
					</IconButton>

					<IconButton>
						<MoreVertOutlinedIcon />
					</IconButton>
                </div>
            </div>

            <div className="chat__body">
                {messages.map(message => (
                    <p className={`chat__message ${message.name === user?.displayName ? "chat__receiver" : ""}`}>
                        <span className="chat__name">
                            {message.name}
                        </span>
                        {message.message}
                        <span className="chat__timestamp">
                            {message.timestamp}
                        </span>
                    </p>
                ))}
            </div>

            <div className="chat__footer">
				<IconButton>
					<InsertEmoticonIcon />
				</IconButton>
				<form>
					<input placeholder="Type a message" type="text" value={input} onChange={e => setInput(e.target.value)} />
					<button type="submit" onClick={sendMessage}>send</button>
				</form>
				<IconButton>
					<MicIcon />
				</IconButton>
			</div>
        </div>
    )
}

export default Chat
