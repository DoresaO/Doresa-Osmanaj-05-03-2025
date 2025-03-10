<template>
  <div class="not-found">
    <div class="spot spot1"></div>
    <div class="spot spot2"></div>
    <div class="spot spot3"></div>

    <h1>404</h1>
    <p>Oops! The page you are looking for does not exist.</p>
    <router-link to="/" class="back-home"> ← Go to Home </router-link>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding: 80px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: #f8f9fa; 
  z-index: 1; 
}
h1 {
  font-size: 100px;
  font-weight: bold;
  color: #d32f2f;
  margin-bottom: 10px;
  position: relative;
  z-index: 2; 
}
p {
  font-size: 20px;
  color: black;
  margin-bottom: 20px;
  position: relative;
  z-index: 2; 
}
.back-home {
  font-size: 18px;
  color: #d32f2f;
  text-decoration: none;
  font-weight: bold;
  transition: transform 0.2s ease-in-out;
  position: relative;
  z-index: 2; 
}
.back-home:hover {
  color: #b71c1c;
  transform: translateX(-5px);
}
.spot {
  position: absolute;
  width: 200px;
  height: 200px;
  background: rgba(211, 47, 47, 0.2); 
  border-radius: 50%;
  filter: blur(60px);
  z-index: 0; 
}
.spot1 {
  top: 10%;
  left: 15%;
  width: 150px;
  height: 150px;
}
.spot2 {
  bottom: 20%;
  right: 10%;
  width: 180px;
  height: 180px;
}
.spot3 {
  bottom: 5%;
  left: 40%;
  width: 220px;
  height: 220px;
}
@media (max-width: 768px) {
  h1 {
    font-size: 80px;
  }
  p {
    font-size: 18px;
  }
  .back-home {
    font-size: 16px;
  }
}
</style>
