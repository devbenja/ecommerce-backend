export const logout = (req, res) => {
    res.clearCookie('jwt_token');
    res.sendStatus(200);
}