
export default {
    loginAction ({ commit }, item) {
      commit('loginMuta', item)
    },
    logOutAction({commit}){
      commit('logoutMuta')
    },
}
