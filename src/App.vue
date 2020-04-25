<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <form @submit="handleNewItemSubmit">
      <label for="new-item"></label>
      <input id="new-item" v-model="newItem" type="text" />
    </form>
    <div v-show="hasAnyItems">
      <ul>
        <li v-for="item in requestedItems" :key="item.id">
          <label :for="'complete-' + item.id">Complete</label>
          <input
            type="checkbox"
            :id="'complete-' + item.id"
            :name="'complete-' + item.id"
            v-model="item.isComplete"
          />
          {{ item.message }}
          <button @click="handleRemoveClick(item.id)">Delete</button>
        </li>
      </ul>
      <span>{{ totalActiveItems }}</span>
      <label for="request-all">All</label>
      <input
        type="radio"
        id="request-all"
        name="request-type"
        value="all"
        v-model="requestedType"
      />
      <label for="request-active">Active</label>
      <input
        type="radio"
        id="request-active"
        name="request-type"
        value="active"
        v-model="requestedType"
      />
      <label for="request-completed">Completed</label>
      <input
        type="radio"
        id="request-completed"
        name="request-type"
        value="completed"
        v-model="requestedType"
      />
    </div>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  data() {
    return {
      requestedType: "all",
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
    requestedItems() {
      return this[`requestItems-${this.requestedType}`]();
    },
    hasAnyItems() {
      return Boolean(this.items.length);
    },
    totalActiveItems() {
      const total = this["requestItems-active"]().length;
      const itemPlural = total === 1 ? "item" : "items";
      return `${total} ${itemPlural} left`;
    },
  },
  methods: {
    handleNewItemSubmit(event) {
      if (this.newItem !== "") {
        const item = {
          id: `${Math.random()}`,
          isComplete: false,
          message: this.newItem,
        };

        this.items = [...this.items, item];
        this.newItem = "";
      }

      event.preventDefault();
    },
    handleRemoveClick(removeId) {
      this.items = this.items.filter(({ id }) => id !== removeId);
    },
    "requestItems-all"() {
      return this.items;
    },
    "requestItems-active"() {
      return this.items.filter(({ isComplete }) => !isComplete);
    },
    "requestItems-completed"() {
      return this.items.filter(({ isComplete }) => isComplete);
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
