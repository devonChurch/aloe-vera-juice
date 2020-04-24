<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <form @submit="handleNewItemSubmit">
      <label for="new-item"></label>
      <input id="new-item" v-model="newItem" type="text" />
    </form>
    <ul>
      <li v-for="item in requestedItems" :key="item.id">
        {{ item.message }}
        <button @click="removeItem(item.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  data: function() {
    return {
      newItem: "",
      items: [
        {
          id: "foo",
          isComplete: false,
          message: "My first task",
        },
      ],
    };
  },
  computed: {
    requestedItems: function() {
      return this.items;
    },
  },
  methods: {
    handleNewItemSubmit: function(event) {
      const item = {
        id: `${Math.random()}`,
        isComplete: true,
        message: this.newItem,
      };

      this.items = [...this.items, item];
      this.newItem = "";

      event.preventDefault();
    },
    removeItem: function(removeId) {
      this.items = this.items.filter(({ id }) => id !== removeId);
    },
  },
  components: {
    HelloWorld,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
