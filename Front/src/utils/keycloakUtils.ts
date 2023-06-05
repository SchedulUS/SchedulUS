export function logout() {
    const logoutURL = "http://localhost:8180//realms/usager/protocol/openid-connect/logout";
    window.location.href = logoutURL;
}
export function getKeyCloakObj() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Unreachable code error
    return keycloak;
}
export function requestForTeacher() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Unreachable code error
    requestTeacher();
}
export function requestForStudent() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Unreachable code error
    requestStudent();
}