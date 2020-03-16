import axios from 'axios';
//'https://my-burger-first-react-app.firebaseio.com/'
// 'https://www.luzy-s3.net:5079/'

const instance = axios.create({
    baseURL: 'https://www.luzy-s3.net:5079/'
});
export default instance;