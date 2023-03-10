const { connect } = require('getstream');
const bcrypt = require('bcrypt');
const StreamChat = require('stream-chat').StreamChat;
const crypto = require('crypto');

require('dotenv').config();

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

const signup = async (request, response) => {
    try {
        const { fullName, userName, password, phoneNumber } = request.body;

        const userId = crypto.randomBytes(16).toString('hex');

        const serverClient = connect(api_key, api_secret, app_id);

        const hashedPassword = await bcrypt.hash(password, 10);

        const token = serverClient.createUserToken(userId);

        response.status(200).json({ token, fullName, userName, userId, hashedPassword, phoneNumber });

    } catch (error) {
        // console.log(error);
        response.status(500).json({ message: error });
    }
};

const login = async (request, response) => {
    try {
        const { userName, password } = request.body;

        const serverClient = connect(api_key, api_secret, app_id);
        const client = StreamChat.getInstance(api_key, api_secret);

        const { users } = await client.queryUsers({ name: userName });

        if (!users.length) return response.status(400).json({ message: 'User not found' });

        const success = await bcrypt.compare(password, users[0].hashedPassword);

        const token = serverClient.createUserToken(users[0].id);

        if (success) {
            response.status(200).json({ token, fullName: users[0].fullName, userName, userId: users[0].id });
        } else {
            response.status(500).json({ message: 'Incorrect password' });
        }
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: error });
    }
};

module.exports = { signup, login };