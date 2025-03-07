import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {email:"visar@gmial.com", name:"Visar Uruqi"},
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
        commit("setUser",{email, name:"Visar Uruqi"});
       return true;
      }else{
        return false;
      }
    },
    logout({commit}){
      commit("setUser",null);
    }
  },
  modules: {},
});
