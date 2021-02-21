import React from 'react'
import './Sidebar.css'
import SidebarChat from './SidebarChat'
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { Avatar, IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { useStateValue } from './StateProvider';
import { auth } from './firebase'

function Sidebar({ messages }) {
	const [{ user }] = useStateValue();

	return (
		<div className="sidebar">
			<div className="sidebar__header">
				<Avatar onClick={() => auth.signOut()} src={user?.photoURL} />
				<div className="sidebar__headerRight">
					<IconButton>
						<DonutLargeIcon />
					</IconButton>
					<IconButton>
						<ChatIcon />
					</IconButton>
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				</div>
			</div>

			<div className="sidebar__search">
				<div className="sidebar__searchContainer">
					<SearchOutlinedIcon />
					<input type="text" placeholder="Search or start new group" />
				</div>
			</div>

            <div className="sidebar__chats">
                <SidebarChat messages={messages} />
            </div>
		</div>
	);
}

export default Sidebar
