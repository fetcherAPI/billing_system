import axios from 'axios'
import { tokenAvailability } from '../lib/helpers/tokenAvailability'
import { TOKEN, REFRESH_TOKEN } from '../lib/const/localstorage'
import { message } from 'antd'
import { errorHandler } from 'shared/lib'

const $api = axios.create({
    baseURL: 'http://10.200.24.107:8080',
})

$api.interceptors.request.use((config: any) => {
    if (tokenAvailability()) {
        config.headers.Authorization = `Bearer ${localStorage.getItem(TOKEN)}`
    }
    return config
})

const clearLocalStorage = () => {
    localStorage.removeItem(TOKEN)
    localStorage.removeItem(REFRESH_TOKEN)
    window.location.replace('/')
    window.location.reload()
}
const refreshAccessToken = async () => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/auth/token/refresh`,
            {
                refresh: localStorage.getItem(REFRESH_TOKEN),
            }
        )
        localStorage.setItem(TOKEN, response.data.access)
        return response.data.accessToken
    } catch (error) {
        clearLocalStorage()
    }
}

$api.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        message.error(errorHandler(error))
        const originalRequest = error.config
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true // Помечаем, что мы уже пытались повторить запрос
            const newAccessToken = await refreshAccessToken() // Получаем новый access токен
            axios.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${newAccessToken}` // Обновляем токен в заголовках
            originalRequest.headers[
                'Authorization'
            ] = `Bearer ${newAccessToken}` // Обновляем токен в текущем запросе
            return $api(originalRequest) // Повторяем запрос с новым токеном
        }
        return Promise.reject(error) // Передаем ошибку дальше, если условия не совпадают
    }
)

export default $api
