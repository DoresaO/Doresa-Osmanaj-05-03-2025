import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {email:"visar@gmial.com", name:"Visar Uruqi"},
    students: JSON.parse(localStorage.getItem("students")) || [
      { index: 1458, name: "Mergim Bajrami", dob: "1989-10-05", municipality: "Prishtinë" },
      { index: 1452, name: "Blerton Rexha", dob: "1988-10-05", municipality: "Prishtinë" },
      { index: 1461, name: "Abdullah Krasniqi", dob: "1987-10-05", municipality: "Prishtinë" },
      { index: 1472, name: "Sami Salihu", dob: "1986-10-05", municipality: "Prishtinë" },
      { index: 1491, name: "Visar Uruqi", dob: "1985-10-05", municipality: "Prishtinë" },
      { index: 1232, name: "Naim Krasniqi", dob: "1984-10-05", municipality: "Prishtinë" },
      { index: 1111, name: "Florie Osmanaj", dob: "1983-10-05", municipality: "Prishtinë" },
      { index: 1112, name: "Bekim Gashi", dob: "1982-10-05", municipality: "Istog" },
      { index: 1113, name: "Abdullah Bajraktari", dob: "1981-10-05", municipality: "Prishtinë" },
      { index: 1114, name: "Erion Gashi", dob: "1980-10-05", municipality: "Istog" },
      { index: 1115, name: "Krenar Gashi", dob: "1979-10-05", municipality: "Prishtinë" },
      { index: 1116, name: "Yll Berisha", dob: "1978-10-05", municipality: "Prishtinë" },
    ],
  },
  getters: {
    isAuthenticated: state=>!!state.user,
    getStudents: (state) => state.students,
  },
  mutations: {
    setUser(state,user){
      state.user=user;
    },
    ADD_STUDENT(state, student) {
      state.students.push(student);
      localStorage.setItem("students", JSON.stringify(state.students));
    },
    EDIT_STUDENT(state, updatedStudent) {
      const index = state.students.findIndex((s) => s.index === updatedStudent.index);
      if (index !== -1) {
        state.students.splice(index, 1, updatedStudent);
        localStorage.setItem("students", JSON.stringify(state.students));
      }
    },
    DELETE_STUDENT(state, studentIndex) {
      state.students = state.students.filter((s) => s.index !== studentIndex);
      localStorage.setItem("students", JSON.stringify(state.students));
    },
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
    },
    addStudent({ commit }, student) {
      commit("ADD_STUDENT", student);
    },
    editStudent({ commit }, student) {
      commit("EDIT_STUDENT", student);
    },
    deleteStudent({ commit }, studentIndex) {
      commit("DELETE_STUDENT", studentIndex);
    },
  },
  modules: {},
});
