<script>
export default {
  name: "PaginationComponent",
  props: {
    currentPage: Number,
    totalPages: Number,
  },
  emits: ["update:currentPage"],
  methods: {
    changePage(newPage) {
      if (newPage > 0 && newPage <= this.totalPages) {
        this.$emit("update:currentPage", newPage);
      }
    },
  },
};
</script>

<template>
  <div class="pagination">
    <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">
      ← Prev
    </button>

    <span v-for="page in totalPages" :key="page">
      <button
        :class="{ active: page === currentPage }"
        @click="changePage(page)"
      >
        {{ page }}
      </button>
    </span>

    <button
      @click="changePage(currentPage + 1)"
      :disabled="currentPage === totalPages"
    >
      Next →
    </button>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
}

button {
  padding: 8px 12px;
  border: none;
  background-color: #dc3545;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
  transition: 0.2s;
}

button.active {
  background-color: #b71c1c;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
