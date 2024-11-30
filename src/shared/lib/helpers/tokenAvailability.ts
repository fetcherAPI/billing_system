import { TOKEN, REFRESH_TOKEN } from '../const/localstorage';

export function tokenAvailability() {
    return localStorage.getItem(TOKEN);
}

export function refreshTokenAvailability() {
    return localStorage.getItem(REFRESH_TOKEN);
}
