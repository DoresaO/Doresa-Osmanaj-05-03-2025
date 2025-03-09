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
    archivedStudents: JSON.parse(localStorage.getItem("archived")) || [
      { index: 1117, name: "Besa Gashi", dob: "1962-10-05", municipality: "Istog", archiveDate: "2021-10-05" },
      { index: 1118, name: "Yllka Bajraktari", dob: "1961-10-05", municipality: "Prishtinë", archiveDate: "2021-10-05" },
      { index: 1119, name: "Argjend Gashi", dob: "1960-10-05", municipality: "Istog", archiveDate: "2021-10-05" },
      { index: 1120, name: "Arta Gashi", dob: "1969-10-05", municipality: "Prishtinë", archiveDate: "2021-10-05" },
    ],
  },
  getters: {
    isAuthenticated: state=>!!state.user,
    getStudents: (state) => state.students,
    getArchivedStudents: (state) => state.archivedStudents,
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
      const studentIndexInArray = state.students.findIndex(s => s.index === studentIndex);
      
      if (studentIndexInArray !== -1) { 
        // Copy the student object and add archive date
        const archivedStudent = { 
          ...state.students[studentIndexInArray], 
          archiveDate: new Date().toISOString().split('T')[0] 
        };
    
        // Push to archive list
        state.archivedStudents.push(archivedStudent);
    
        // Remove from students list
        state.students.splice(studentIndexInArray, 1);
        localStorage.setItem("students", JSON.stringify(state.students));
        localStorage.setItem("archived", JSON.stringify(state.archivedStudents));
      } else {
        console.warn(`Student with index ${studentIndex} not found.`);
      }
    },    
    RESTORE_STUDENT(state, studentIndex) {
      const studentIndexInArray = state.archivedStudents.findIndex(s => s.index === studentIndex);
      
      if (studentIndexInArray !== -1) {
        const student = state.archivedStudents[studentIndexInArray];
    
        delete student.archiveDate; 
        state.students.push(student);
        state.archivedStudents.splice(studentIndexInArray, 1);
    
        //Save updated lists to localStorage
        localStorage.setItem("students", JSON.stringify(state.students));
        localStorage.setItem("archived", JSON.stringify(state.archivedStudents));
      } else {
        console.warn(`Archived student with index ${studentIndex} not found.`);
      }
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
    restoreStudent({ commit }, studentIndex) {
      commit("RESTORE_STUDENT", studentIndex);
    },
  },
  modules: {},
});
