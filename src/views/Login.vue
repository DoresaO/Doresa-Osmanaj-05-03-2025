<script>
export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      rememberMe: false,
      errorMessage: "",
    };
  },
  methods: {
    async handleLogin() {
      const success = await this.$store.dispatch("login", {
        email: this.email,
        password: this.password,
        rememberMe: this.rememberMe,
      });

      if (success) {
        this.$router.push({ name: "home" });
      } else {
        this.errorMessage = "Invalid credentials. Please try again.";
      }
    },
  },
};
</script>

<template>
  <div
    class="login-container d-flex justify-content-center align-items-center vh-100"
  >
    <div
      class="card p-4 shadow-lg rounded text-center"
      style="max-width: 400px; width: 100%"
    >
      <div class="d-flex align-items-center justify-content-center mb-3">
        <img src="@/assets/logo.png" alt="Logo" class="logo me-2" />
        <h4 class="custom-title m-0">Student Information System</h4>
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="alert alert-danger">
        {{ errorMessage }}
      </div>

      <form @submit.prevent="handleLogin">
        <div class="form-group row align-items-center mb-3">
          <label class="col-4 text-right">Email</label>
          <div class="col-8">
            <input
              type="email"
              v-model="email"
              class="form-control"
              placeholder="Email"
              required
            />
          </div>
        </div>

        <div class="form-group row align-items-center mb-3">
          <label class="col-4 text-right">Password</label>
          <div class="col-8">
            <input
              type="password"
              v-model="password"
              class="form-control"
              placeholder="Password"
              required
            />
          </div>
        </div>
        <div class="form-check form-switch d-flex justify-content-around mb-4">
          <label class="ms-5" for="rememberMe">Remember Me</label>
          <input
            class="form-check-input custom-switch"
            type="checkbox"
            v-model="rememberMe"
            id="rememberMe"
          />
        </div>

        <button
          class="btn btn-danger btn-sm w-50 align-items-right"
          type="submit"
        >
          <i class="fas fa-sign-in-alt"></i> Login
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  background: var(--background-color);
}

.card {
  background: white;
  border-radius: 10px;
}

.logo {
  width: 80px;
  height: 80px;
}
.custom-title {
  color: black;
}
.custom-switch {
  margin-right: 25px;
  width: 40px;
  height: 20px;
  background-color: #dc3545 !important;
  border: 2px solid #dc3545 !important;
}
.custom-switch:checked {
  background-color: #c82333 !important;
  border-color: #c82333 !important;
}
</style>
