<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Collin Sinclair</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" active-class="active" to="/"
              >Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" active-class="active" class="nav-link"
              >About
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/jupiter" active-class="active" class="nav-link"
              >Jupiter
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/activity" active-class="active" class="nav-link"
              >Activity
            </router-link>
          </li>
          <li class="nav-item dropdown">
            <router-link
              class="nav-link dropdown-toggle"
              active-class="active"
              to="/guidebooks"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Guidebook Library
            </router-link>
            <ul class="dropdown-menu">
              <li>
                <router-link class="dropdown-item disabled" to="#"
                  >Best Hikes Rocky Mountain National Park
                </router-link>
                <router-link class="dropdown-item disabled" to="#"
                  >Best Trail Runs Denver, Boulder & Colorado Springs
                </router-link>
                <router-link
                  class="dropdown-item"
                  :to="{ name: 'colorado-snow-climbs' }"
                  >Colorado Snow Climbs
                </router-link>
                <router-link class="dropdown-item disabled" to="#"
                  >Colorado Summit Hikes
                </router-link>
                <router-link class="dropdown-item disabled" to="#"
                  >Hiking Colorado
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <router-view />
</template>

<script>
export default {
  name: "TheNavbar",
};
</script>

<style scoped></style>
