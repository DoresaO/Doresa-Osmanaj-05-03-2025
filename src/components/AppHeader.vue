<script>
export default {
  name: "AppHeader",
  computed: {
    userName() {
      return (
        this.$store.state.user?.name || this.$store.state.user?.email || "Guest"
      );
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light px-4">
      <div class="navbar-brand d-flex align-items-center">
        <img src="@/assets/logo.png" alt="Logo" class="logo me-2" />
        <span class="project-name">Student Information System</span>
      </div>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mx-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/students" class="nav-link">Students</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/archive" class="nav-link">Archive</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/help" class="nav-link">Help</router-link>
          </li>
        </ul>
      </div>

      <div class="dropdown">
        <button
          class="btn dropdown-toggle d-flex align-items-center"
          type="button"
          data-bs-toggle="dropdown"
        >
          <i class="fas fa-user-circle profile-icon me-2"></i>
          <span>{{ userName }}</span>
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
          <li>
            <button class="dropdown-item text-danger" @click="logout">
              <i class="fas fa-sign-out-alt"></i> Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>

    <div class="nav-underline"></div>
  </div>
</template>

<style scoped>
.logo {
  width: 40px;
  height: 40px;
}
.project-name {
  font-size: 18px;
}
.navbar-nav .nav-link {
  font-size: 16px;
  font-weight: 500;
  padding: 8px 15px;
}
.profile-icon {
  font-size: 30px;
  color: #333;
}
.dropdown-toggle {
  background: none;
  border: none;
}
.navbar-toggler {
  border: none;
  outline: none;
}
.navbar-toggler-icon {
  padding: 5px;
  border-radius: 5px;
}
.nav-underline {
  width: 100%;
  height: 3px;
  background-color: #dc3545;
}
</style>
