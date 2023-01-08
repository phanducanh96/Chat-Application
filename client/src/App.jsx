import React from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import { ChannelContainer, ChannelListContainer, Auth } from './components';
import './App.css';

const cookies = new Cookies();

const apikey = '99nmesjzdh2f';
const authToekn = cookies.get("token");

const client = StreamChat.getInstance(apikey);

if (authToken) {
    client.connectUser({
        token: cookies.get('token'),
        userName: cookies.get('userName'),
        fullName: cookies.get('fullName'),
        userId: cookies.get('userId'),
        phoneNumber: cookies.get('phoneNumber'),
        avatarURL: cookies.get('avatarURL'),
        hashedPassword: cookies.get('hashedPassword'),
    })
}

const authToken = false;
const App = () => {
    if (!authToken) return <Auth />

    return (
        <div className="app__wrapper">
            <Chat client={client} theme="team light">
                <ChannelListContainer
                />

                <ChannelContainer
                />
            </Chat>
        </div>
    )
}

export default App
