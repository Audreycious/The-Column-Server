const TokenService = {
    makeBasicAuthToken(userName, password) {
        return window.btoa(`${userName}:${password}`)
      },
    saveAuthToken(token) {
        window.localStorage.setItem(config.TOKEN_KEY, token)
    },
}
  
module.exports = TokenService