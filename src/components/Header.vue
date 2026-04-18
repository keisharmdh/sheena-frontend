<template>
  <header class="header">
    <!-- LEFT: LOGO -->
    <div class="left">
      <h2 class="logo">SHEENA</h2>
    </div>

    <!-- CENTER: MENU -->
    <nav class="center">
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/shop">Shop</router-link></li>
        <li><router-link to="/about">About</router-link></li>
      </ul>
    </nav>

    <!-- RIGHT: ICON -->
    <div class="right">
      <span>🔍</span>
      <span>🛒</span>
      <span>👤</span>
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  height: 80px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  padding: 0 24px;
  border-bottom: 1px solid #eee;
}

/* LEFT */
.left .logo {
  font-size: 20px;
  font-weight: bold;
}

/* CENTER */
.center ul {
  display: flex;
  gap: 24px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.center a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
}

/* RIGHT */
.right {
  display: flex;
  gap: 16px;
  font-size: 18px;
  cursor: pointer;
}

@font-face {
  font-family: "The Seasons";
  src: url("./assets/fonts/theseasons-reg.otf") format("reguler");
  font-weight: 200;
}
</style>
