<script>
import { mapGetters } from "vuex";

export default {
  name: "StudentForm",
  data() {
    return {
      newStudent: {
        index: "",
        name: "",
        dob: "",
        municipality: "",
      },
      municipalities: [
        "Prishtinë",
        "Mitrovica",
        "Pejë",
        "Gjakova",
        "Ferizaj",
        "Gjilan",
        "Prizren",
        "Podujevë",
        "Suharekë",
        "Vushtrri",
        "Malishevë",
        "Rahovec",
        "Kamenicë",
        "Leposavić",
        "Zvečan",
        "Dragash",
        "Klinë",
        "Skenderaj",
        "Shtime",
        "Fushë Kosovë",
        "Deçan",
        "Istog",
        "Lipjan",
        "Obiliq",
        "Kaçanik",
        "Novobërdë",
        "Graçanicë",
        "Ranilug",
        "Partesh",
        "Kllokot",
        "Hani i Elezit",
        "Mamuşa",
        "Zubin Potok",
        "Mitrovicë e Veriut",
      ],
      indexTaken: false,
      nameError: "",
      dobError: "",
    };
  },
  computed: {
    ...mapGetters(["getStudents"]),
  },
  methods: {
    validateIndex() {
      this.newStudent.index = this.newStudent.index
        .replace(/\D/g, "")
        .slice(0, 4);
      if (this.getStudents && Array.isArray(this.getStudents)) {
        this.indexTaken = this.getStudents.some(
          (student) => String(student.index) === this.newStudent.index
        );
      }
    },

    validateName() {
      const nameRegex = /^[A-Za-z\s]+$/; // Only letters and spaces
      if (this.newStudent.name.length > 20) {
        this.nameError = "⚠ Name must be under 20 characters";
      } else if (!nameRegex.test(this.newStudent.name)) {
        this.nameError = "⚠ Name can only contain letters";
      } else {
        this.nameError = "";
      }
    },

    validateDob() {
      const minYear = 1990;
      const maxYear = new Date().getFullYear() - 5; // Ensuring school-age students (5+ years old)
      const selectedYear = new Date(this.newStudent.dob).getFullYear();

      if (selectedYear < minYear || selectedYear > maxYear) {
        this.dobError = `⚠ Date must be between ${minYear} and ${maxYear}`;
      } else {
        this.dobError = "";
      }
    },

    submitForm() {
      this.validateName();
      this.validateDob();

      if (this.indexTaken) {
        alert("This index is alrady taken. Plesse enter a different one.");
        return;
      }

      if (this.nameError || this.dobError) {
        return;
      }

      if (
        this.newStudent.index.length === 4 &&
        this.newStudent.name &&
        this.newStudent.dob &&
        this.newStudent.municipality
      ) {
        this.$emit("add-student", { ...this.newStudent });
        this.newStudent = { index: "", name: "", dob: "", municipality: "" };
        this.indexTaken = false;
        this.nameError = "";
        this.dobError = "";
      } else {
        alert(
          "Please enter a valid Index (4 digits) and select a Municipality."
        );
      }
    },
  },
};
</script>

<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <h3>Add New Student</h3>

      <input
        v-model="newStudent.index"
        type="text"
        placeholder="Index (4-digit number)"
        maxlength="4"
        @input="validateIndex"
        required
      />
      <span v-if="indexTaken" class="error-message"
        >⚠ This index is already taken</span
      >
      <input
        v-model="newStudent.name"
        type="text"
        placeholder="Name"
        @input="validateName"
        required
      />
      <span v-if="nameError" class="error-message">{{ nameError }}</span>

      <input
        v-model="newStudent.dob"
        type="date"
        @input="validateDob"
        required
      />
      <span v-if="dobError" class="error-message">{{ dobError }}</span>

      <select v-model="newStudent.municipality" required>
        <option value="" disabled>Select Municipality</option>
        <option v-for="city in municipalities" :key="city" :value="city">
          {{ city }}
        </option>
      </select>
      <div class="buttons">
        <button @click="submitForm">Add</button>
        <button class="cancel" @click="$emit('close')">Cancel</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 15px;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  text-align: center;
  max-width: 400px;
  width: 100%;
}
input,
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  font-size: 14px;
}
.buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
}
button {
  flex: 1;
  padding: 8px;
  background-color: #dc3545;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
  transition: background 0.3s ease-in-out;
}
button.cancel {
  background-color: #ccc;
}
button:hover {
  opacity: 0.8;
}
@media (max-width: 480px) {
  .modal-content {
    width: 90%;
    max-width: 300px;
    padding: 15px;
  }
  input,
  select {
    font-size: 12px;
    padding: 8px;
  }
  .buttons {
    flex-direction: column;
  }
  button {
    font-size: 12px;
    padding: 8px;
  }
}
</style>
