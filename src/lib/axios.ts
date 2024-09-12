import axios from 'axios';

const initData =
    Telegram.WebApp.initData ||
    'user=%7B%22id%22%3A5416621515%2C%22first_name%22%3A%22Nguy%E1%BB%85n%20Ti%E1%BA%BFn%22%2C%22last_name%22%3A%22%C4%90%E1%BA%A1t%22%2C%22username%22%3A%22ntdat1306%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-5513797663202197809&chat_type=sender&auth_date=1724119097&hash=ab17e56deadc3dc9f6fd90707dad472f70562a571e548a1a667fc1c01ffd7328';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.gemx.io/api/miniapp';

const axiosAuth = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

axiosAuth.interceptors.request.use((config) => {
    config.headers['Authorization'] = `tma ${initData}`;
    return config;
});

export default axiosAuth;
