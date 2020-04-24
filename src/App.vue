<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <form @submit="handleNewItemSubmit">
      <label for="new-item"></label>
      <input id="new-item" v-model="newItem" type="text" />
    </form>
    <ul>
      <li v-for="item in requestedItems" :key="item.id">{{ item.message }}</li>
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
      itemIds: ["foo"],
      items: {
        foo: {
          isComplete: false,
          message: "My first task",
        },
      },
    };
  },
  computed: {
    requestedItems: function() {
      return this.itemIds.map((itemId) => ({
        ...this.items[itemId],
        id: itemId,
      }));
    },
  },
  methods: {
    handleNewItemSubmit: function(event) {
      const itemId = `${Math.random()}`;
      const item = { isComplete: true, message: this.newItem };

      this.itemIds = [...this.itemIds, itemId];
      this.items = { ...this.items, [itemId]: item };
      this.newItem = "";

      event.preventDefault();
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
