<script>
import { mapGetters, mapActions } from "vuex";
import PaginationComponent from "@/components/PaginationComponent.vue";

export default {
  components: { PaginationComponent },
  data() {
    return {
      searchQuery: "",
      currentPage: 1,
      rowsPerPage: 6,
      sortColumn: "name",
      sortOrder: "asc",
    };
  },
  computed: {
    ...mapGetters(["getArchivedStudents"]),

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
      return [...this.getArchivedStudents].sort((a, b) => {
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
    ...mapActions(["restoreStudent"]),

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
  },
};
</script>

<template>
  <div class="archive-container">
    <div class="header">
      <h2>Archived Students</h2>
    </div>

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
            <th @click="handleSort('archiveDate')">
              Archived Date {{ getSortIcon("archiveDate") }}
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
            <td>{{ student.archiveDate }}</td>
            <td>
              <a href="#" @click.prevent="restoreStudent(student.index)"
                >Restore</a
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
.archive-container {
  width: 100%;
  padding: 20px;
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
  .archive-container {
    padding: 10px;
  }
  h2 {
    font-size: 20px;
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
