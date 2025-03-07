<script>
export default {
  name: "HomeView",
  computed: {
    userName() {
      return this.$store.state.user?.name || "Guest";
    },
    greeting() {
      const hour = new Date().getHours();
      if (hour < 12) {
        return "Good morning";
      } else if (hour < 18) {
        return "Good afternoon";
      } else {
        return "Good evening";
      }
    },
  },
};
</script>

<template>
  <div class="home-container">
    <h1>{{ greeting }}, {{ userName }} 🖐️</h1>
    <p>Welcome to the Student Information System.</p>
    <router-link to="/students" class="check-students">
      Check Students →
    </router-link>
  </div>
</template>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
  text-align: center;
  color: #333;
  font-weight: bold;
  font-size: 22px;
  overflow: hidden;
}
.home-container::before {
  content: "";
  position: absolute;
  width: 320px;
  height: 320px;
  background: rgba(147, 58, 67, 0.12);
  border-radius: 50%;
  top: 10%;
  left: 8%;
  filter: blur(80px);
}
.home-container::after {
  content: "";
  position: absolute;
  width: 280px;
  height: 280px;
  background: rgba(220, 53, 69, 0.1);
  border-radius: 50%;
  bottom: 18%;
  right: 12%;
  filter: blur(70px);
}
.check-students {
  font-size: 20px;
  color: #dc3545;
  text-decoration: none;
  font-weight: bold;
  margin-top: 20px;
  display: inline-block;
  transition: transform 0.2s ease-in-out;
}
.check-students:hover {
  transform: translateX(5px);
}
</style>
