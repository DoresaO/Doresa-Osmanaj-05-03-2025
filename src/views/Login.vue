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
  <div class="login-page">
    <div class="login-image"></div>

    <div class="login-form-container">
      <div class="card p-4 shadow-lg rounded text-center">
        <div class="logo-container">
          <img src="@/assets/logo.png" alt="Logo" class="logo" />
        </div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="alert alert-danger">
          {{ errorMessage }}
        </div>

        <form @submit.prevent="handleLogin">
          <div class="form-group mb-3 text-left">
            <label class="form-label">Email</label>
            <input type="email" v-model="email" class="form-control" required />
          </div>

          <div class="form-group mb-4 text-left">
            <label class="form-label">Password</label>
            <input type="password" v-model="password" class="form-control" required />
          </div>

          <div class="form-bottom d-flex justify-content-between align-items-center flex-wrap">
            <div class="form-check custom-checkbox">
              <input class="form-check-input" type="checkbox" v-model="rememberMe" id="rememberMe" />
              <label class="form-check-label ms-2" for="rememberMe">Remember Me</label>
            </div>
            <button class="btn btn-danger btn-sm btn-login" type="submit">
              <i class="fas fa-sign-in-alt"></i> Login
            </button>
          </div>
        </form>

        <div class="forgot-password">
          <a href="#">Forgot your password?</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  display: flex;
  height: 100vh;
}
.login-image {
  flex: 1;
  background: url("@/assets/login.jpg") center/cover no-repeat;
}
.login-form-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4f4f4;
}
.card {
  background: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 400px;
  text-align: center;
}
.logo-container {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}
.logo {
  width: 80px;
  height: 80px;
}
.form-label {
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
  text-align: left;
}
.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s ease-in-out;
}
.form-control:focus {
  border-color: #d32f2f;
  outline: none;
  box-shadow: 0px 0px 5px rgba(211, 47, 47, 0.5);
}
.custom-checkbox {
  display: flex;
  align-items: center;
}
.form-check-input {
  width: 16px;
  height: 16px;
  border: 2px solid #d32f2f;
  transition: all 0.3s ease-in-out;
}
.form-check-input:checked {
  background-color: #d32f2f;
  border-color: #b71c1c;
}
.forgot-password {
  margin-top: 10px;
  font-size: 14px;
}
.forgot-password a {
  color: #d32f2f;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease-in-out;
}
.forgot-password a:hover {
  color: #b71c1c;
  text-decoration: underline;
}
.btn-login {
  padding: 8px 15px;
  font-size: 14px;
  border-radius: 5px;
  transition: background-color 0.3s ease-in-out;
}
.btn-login:hover {
  background-color: #b71c1c;
}
@media (max-width: 768px) {
  .login-page {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .login-image {
    display: none;
  }
  .login-form-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;
    background: url("@/assets/login.jpg") center/cover no-repeat;
  }
  .card {
    max-width: 350px;
    width: 90%;
    padding: 25px;
    background: rgba(255, 255, 255, 0.95);
  }
  .logo {
    width: 60px;
    height: 60px;
  }
  .form-bottom {
    flex-direction: column;
    align-items: center;
  }
  .custom-checkbox {
    margin-bottom: 10px;
  }
  .btn-login {
    width: 100%;
  }
}
</style>
