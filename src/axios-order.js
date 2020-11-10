import axios from 'axios';

const instance = axios.create({
    baseURL:'https://burger-builder-react-f6058.firebaseio.com'
});

export default instance;