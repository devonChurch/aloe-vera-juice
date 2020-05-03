<template>
  <div class="container">
    <header>
      <ul class="nav py-2">
        <li class="nav-item">
          <router-link class="nav-link" to="/en">English</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/de">German</router-link>
        </li>
      </ul>
    </header>
    <main id="app">
      <router-view />
    </main>
  </div>
</template>
