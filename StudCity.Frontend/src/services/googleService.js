import axios from 'axios';

export const googleAuthenticate = async (token) => {
    try {
        const { data } = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`);
        if (data) {
            return data;
        }

        throw new Error('Google authentication failed');
    } catch (err) {
        throw Error(err);
    }
};
