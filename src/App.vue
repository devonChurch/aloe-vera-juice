<template>
  <div>
    <header>
      <ul>
        <li><router-link to="/en">English</router-link></li>
        <li><router-link to="/de">German</router-link></li>
      </ul>
    </header>
    <main id="app">
      <router-view />
    </main>
  </div>
</template>
