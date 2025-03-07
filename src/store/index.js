import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
  },
  getters: {
    isAuthenticated: state=>!!state.user,
  },
  mutations: {
    setUser(state,user){
      state.user=user;
    }
  },
  actions: {
    login({commit},{email,password}){
      if(email==="visar@gmail.com" && password ==="password"){
        commit("setUser",{email});
       return true;
      }else{
        return false;
      }
    },
    logout({commit}){
      commit("logout");
    }
  },
  modules: {},
});
