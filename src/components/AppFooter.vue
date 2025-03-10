<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-logo">
        <img
          src="@/assets/logoBlack.png"
          alt="Student Information System Logo"
        />
      </div>

      <nav class="footer-nav">
        <div class="footer-nav-group">
          <router-link to="/home">Home</router-link>
          <router-link to="/students">Students</router-link>
        </div>
        <div class="footer-nav-group">
          <router-link to="/archive">Archive</router-link>
          <router-link to="/help">Help</router-link>
        </div>
      </nav>

      <div class="footer-copyright">
        © 2025 Student Information System. All rights reserved.
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #a81524;
  color: white;
  text-align: center;
  padding: 30px 15px;
  font-size: 14px;
}
.footer-container {
  max-width: 1000px;
  margin: 0 auto;
}
.footer-logo img {
  width: 120px; 
  margin-bottom: 10px;
}
.footer-nav {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 10px;
}
.footer-nav-group {
  display: flex;
  gap: 15px;
}
.footer-nav a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 14px; 
}
.footer-nav a:hover {
  text-decoration: underline;
}
.footer-copyright {
  font-size: 12px;
  opacity: 0.9;
}
@media (max-width: 600px) {
  .footer-nav {
    flex-direction: column;
    align-items: center;
  }
  .footer-nav-group {
    display: flex;
    justify-content: center;
    gap: 15px;
    width: 100%;
  }
  .footer-logo img {
    width: 100px; 
  }
  .footer-nav a {
    font-size: 12px; 
  }
  .footer-copyright {
    font-size: 11px;
  }
}
</style>
