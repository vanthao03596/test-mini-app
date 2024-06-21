import axios from 'axios';

const initData = Telegram.WebApp.initData;
// const initData =
//     'user=%7B%22id%22%3A827738864%2C%22first_name%22%3A%22Ph%E1%BA%A1m%22%2C%22last_name%22%3A%22Th%E1%BA%A3o%22%2C%22username%22%3A%22phamthao03596%22%2C%22language_code%22%3A%22vi%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=8141968843457848536&chat_type=sender&auth_date=1718092648&hash=802e1ec920b4a83148b756e51fa57ed70e78193e214bdcb342590d4b4972c614';

const BASE_URL = 'https://api.gemx.io/api/miniapp';

const axiosClient = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

const axiosAuth = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

axiosAuth.interceptors.request.use((config) => {
    config.headers['Authorization'] = `tma ${initData}`;
    return config;
});

export { axiosClient };
export default axiosAuth;
