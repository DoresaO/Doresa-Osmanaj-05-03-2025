<script>
import Swal from "sweetalert2";
export default {
  props: {
    student: Object,
  },
  data() {
    return {
      editedStudent: {},
      nameError:"",
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
    };
  },
  watch: {
    student: {
      handler(newStudent) {
        this.editedStudent = { ...newStudent };
      },
      immediate: true,
    },
  },
  mounted() {
    this.$el.focus();
  },
  methods: {
    validateName() {
      const regex = /^[A-Za-z\s]+$/; // Only letters and spaces
      if (this.editedStudent.name.length > 20) {
        this.nameError = "⚠ Name must be under 20 characters";
      } else if (!regex.test(this.editedStudent.name)) {
        this.nameError = "⚠ Name can only contain letters";
      } else {
        this.nameError = "";
      }
    },
    handleUpdate() {
      if (!this.editedStudent.name || !this.editedStudent.dob || !this.editedStudent.municipality) {
        alert("All fields except Index are required.");
        return;
      }
      if(this.nameError){
        alert("Please enter a valid name.");
        return;
      }
      Swal.fire({
        title: "Are you sure?",
        text: "You are about to update this student's information.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, save it!",
        confirmButtonColor: "#dc3545",
        cancelButtonColor: "#6c757d", 
      }).then((result) =>{
        if (result.isConfirmed) {
          this.$emit("update-student", this.editedStudent);
          Swal.fire("Saved!", "Student information has been updated.", "success");
        }
      });
    },
  },
};
</script>

<template>
  <div class="edit-student-modal" @click.self="$emit('close')" @keyup.esc="$emit('close')" tabindex="0">
    <div class="modal-content">
      <h3>Edit Student</h3>

      <div class="form-group">
        <label for="name">Name:</label>
        <input id="name" v-model.trim="editedStudent.name" type="text" required @input="validateName" />
        <p v-if="nameError" class="error-message">{{ nameError }}</p>
      </div>

      <div class="form-group">
        <label for="index">Index:</label>
        <input id="index" v-model="editedStudent.index" type="number" disabled />
      </div>

      <div class="form-group">
        <label for="dob">Date of Birth:</label>
        <input id="dob" v-model="editedStudent.dob" type="date" disabled />
      </div>

      <div class="form-group">
        <label for="municipality">Municipality:</label>
        <select id="municipality" v-model="editedStudent.municipality" required>
          <option value="" disabled>Select Municipality</option>
          <option v-for="city in municipalities" :key="city" :value="city">
            {{ city }}
          </option>
        </select>
      </div>

      <div class="buttons">
        <button @click="handleUpdate" class="save">Save</button>
        <button class="cancel" @click="$emit('close')">Cancel</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .edit-student-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    outline: none;
  }

  .modal-content {
    background: white;
    padding: 18px;
    border-radius: 8px;
    width: 320px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    animation: fadeIn 0.2s ease-in-out;
  }

  h3 {
    margin-bottom: 12px;
    text-align: center;
    font-size: 18px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }

  label {
    font-size: 14px;
    font-weight: bold;
  }

  /* Input & Select Styling */
  input, select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
  }

  .buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 14px;
    gap: 10px;
  }

  button {
    flex: 1;
    padding: 8px 14px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    font-size: 14px;
    transition: background 0.2s;
  }

  .save {
    background: #dc3545;
    color: white;
  }

  .cancel {
    background: #ccc;
    color: white;
  }

  button:hover {
    opacity: 0.85;
  }
  .error-message {
    color: red;
    font-size: 12px;
    margin-top: 4px;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
