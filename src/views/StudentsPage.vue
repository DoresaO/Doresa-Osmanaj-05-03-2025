<script>
import { mapActions, mapGetters } from "vuex";
import PaginationComponent from "@/components/PaginationComponent.vue";
import StudentForm from "@/components/StudentForm.vue";
import EditStudentForm from "@/components/EditStudentForm.vue";
import Swal from "sweetalert2";

export default {
  components: { PaginationComponent, StudentForm, EditStudentForm },
  data() {
    return {
      searchQuery: "",
      currentPage: 1,
      rowsPerPage: 6,
      showForm: false,
      studentToEdit: null,
      sortColumn: "name",
      sortOrder: "asc",
    };
  },
  computed: {
    ...mapGetters(["getStudents"]),

    filteredStudents() {
      if (!this.searchQuery.trim()) return this.sortedStudents;

      return this.sortedStudents.filter((student) => {
        const searchLower = this.searchQuery.toLowerCase();
        return (
          student.name.toLowerCase().includes(searchLower) ||
          student.index.toString().includes(this.searchQuery) ||
          student.municipality.toLowerCase().includes(searchLower)
        );
      });
    },

    sortedStudents() {
      return [...this.getStudents].sort((a, b) => {
        if (!this.sortColumn) return 0;

        const valueA = a[this.sortColumn];
        const valueB = b[this.sortColumn];

        if (typeof valueA === "string") {
          return this.sortOrder === "asc"
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
        } else {
          return this.sortOrder === "asc" ? valueA - valueB : valueB - valueA;
        }
      });
    },

    paginatedStudents() {
      const start = (this.currentPage - 1) * this.rowsPerPage;
      return this.filteredStudents.slice(start, start + this.rowsPerPage);
    },

    totalPages() {
      return Math.ceil(this.filteredStudents.length / this.rowsPerPage);
    },
  },

  methods: {
    ...mapActions(["addStudent", "deleteStudent", "editStudent"]),

    toggleForm() {
      this.showForm = !this.showForm;
    },

    handleAddStudent(student) {
      this.addStudent(student);
      this.showForm = false;
    },

    editStudent(student) {
      this.studentToEdit = { ...student };
    },

    handleUpdateStudent(updatedStudent) {
      this.$store.dispatch("editStudent", updatedStudent);
      this.studentToEdit = null;
    },

    handleSort(column) {
      if (this.sortColumn === column) {
        this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
      } else {
        this.sortColumn = column;
        this.sortOrder = "asc";
      }
    },

    getSortIcon(column) {
      if (this.sortColumn !== column) return "⬍";
      return this.sortOrder === "asc" ? "⬆" : "⬇";
    },

    async confirmDelete(student){
      const result = await Swal.fire({
        title: `Are you sure?`,
        text:`Do you want to delete ${student.name}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel!",
        backdrop:true,
      });
      if(result.isConfirmed){
        this.deleteStudent(student.index);
        Swal.fire({
          title: "Deleted!",
          text: `${student.name} has been deleted.`,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    },
  },
};
</script>

<template>
  <div class="students-container">
    <div class="header">
      <h2>Students</h2>
      <span class="register-student" @click="toggleForm"
        >+ Register New Student</span
      >
    </div>

    <StudentForm
      v-if="showForm"
      @add-student="handleAddStudent"
      @close="toggleForm"
    />

    <EditStudentForm
      v-if="studentToEdit"
      :student="studentToEdit"
      @update-student="handleUpdateStudent"
      @close="studentToEdit = null"
    />

    <div class="search-container">
      <input
        v-model="searchQuery"
        type="text"
        class="search-input"
        placeholder=" "
      />
      <span class="search-placeholder">
        <i class="fas fa-search"></i> Search...
      </span>
    </div>

    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Index</th>
            <th @click="handleSort('name')">Name {{ getSortIcon("name") }}</th>
            <th @click="handleSort('dob')">DoB {{ getSortIcon("dob") }}</th>
            <th @click="handleSort('municipality')">
              Municipality {{ getSortIcon("municipality") }}
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in paginatedStudents" :key="student.index">
            <td>{{ student.index }}</td>
            <td>{{ student.name }}</td>
            <td>{{ student.dob }}</td>
            <td>{{ student.municipality }}</td>
            <td>
              <a href="#" @click.prevent="editStudent(student)">Edit</a> |
              <a href="#" @click.prevent="confirmDelete(student)"
                >Delete</a
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pagination-wrapper">
      <PaginationComponent
        :currentPage="currentPage"
        :totalPages="totalPages"
        @update:currentPage="currentPage = $event"
      />
    </div>
  </div>
</template>

<style scoped>
.students-container {
  width: 100%;
  padding: 20px;
  min-height: 100vh;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}
h2 {
  font-size: 24px;
  font-weight: bold;
}
.register-student {
  font-size: 18px;
  color: #dc3545;
  text-decoration: underline;
  cursor: pointer;
}
.search-container {
  position: relative;
  width: 100%;
  max-width: 400px;
  margin-bottom: 15px;
}
.search-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  background: transparent;
  position: relative;
}
.search-placeholder {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  color: #888;
  pointer-events: none;
  display: flex;
  align-items: center;
  gap: 6px;
}
.search-placeholder i {
  font-size: 14px;
}
.search-input:focus + .search-placeholder,
.search-input:not(:placeholder-shown) + .search-placeholder {
  display: none;
}
.table-wrapper {
  overflow-x: auto;
}
table {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
}
th,
td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ccc;
}
th {
  cursor: pointer;
  font-weight: bold;
}
th:hover {
  color: #dc3545;
}
.pagination-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
}
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
  }
  .register-student {
    margin-top: 10px;
  }
  .search-container {
    width: 100%;
  }
  table {
    font-size: 14px;
  }
  th,
  td {
    padding: 8px;
  }
}
@media (max-width: 480px) {
  .students-container {
    padding: 10px;
    min-height: 80svh;
  }
  h2 {
    font-size: 20px;
  }
  .register-student {
    font-size: 16px;
  }
  .search-input {
    font-size: 14px;
  }
  table {
    font-size: 12px;
  }
  th,
  td {
    padding: 6px;
  }
  .pagination-wrapper {
    justify-content: center;
  }
}
</style>
