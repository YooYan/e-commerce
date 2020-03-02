
export function isAuth() {
    let auth = sessionStorage.getItem('token') ? true : false
    return auth
}

export function Logout() {
    sessionStorage.setItem('token', '');
    window.location.reload();
}