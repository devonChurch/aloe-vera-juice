<template>
  <div id="app">
    <div v-show="hasAnyItems">
      <label for="complete-all">Complete all</label>
      <input
        type="checkbox"
        id="complete-all"
        name="complete-all"
        :indeterminate.prop="hasPartialCompletedItems"
        @change="handleCompleteAllChange"
        v-model="isCompleteAllToggled"
      />
    </div>
    <form @submit="handleNewItemSubmit">
      <label for="new-item"></label>
      <input id="new-item" v-model="newItemMessage" type="text" />
    </form>
    <div v-show="hasAnyItems">
      <ul>
        <li v-for="item in requestedItems" :key="item.id">
          <label :for="'complete-' + item.id">Complete</label>
          <input
            type="checkbox"
            :id="'complete-' + item.id"
            :name="'complete-' + item.id"
            @change="handleCompleteItemChange"
            v-model="item.isComplete"
          />
          {{ item.message }}
          <button @click="handleRemoveClick(item.id)">Delete</button>
        </li>
      </ul>
      <span>{{ activeItemsMessage }}</span>
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
      <button v-show="hasAnyCompletedItems" @click="handleClearCompletedClick">
        Clear completed
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isCompleteAllToggled: false,
      requestedType: "all",
      newItemMessage: "",
      items: [],
    };
  },
  computed: {
    requestedItems() {
      return this[`requestItems-${this.requestedType}`]();
    },
    hasAnyItems() {
      return Boolean(this["requestItems-all"]().length);
    },
    hasAnyCompletedItems() {
      return Boolean(this["requestItems-completed"]().length);
    },
    hasPartialCompletedItems() {
      const totalItems = this["requestItems-all"]().length;
      const totalCompletedItems = this["requestItems-completed"]().length;
      return totalCompletedItems && totalCompletedItems < totalItems;
    },
    activeItemsMessage() {
      const total = this["requestItems-active"]().length;
      const itemPlural = total === 1 ? "item" : "items";
      return `${total} ${itemPlural} left`;
    },
  },
  watch: {
    items() {
      this.setCompleteAllToggle();
    },
  },
  methods: {
    handleNewItemSubmit(event) {
      if (this.newItemMessage !== "") {
        const item = {
          id: `${Math.random()}`,
          isComplete: false,
          message: this.newItemMessage,
        };

        this.items = [...this.items, item];
        this.newItemMessage = "";
      }

      event.preventDefault();
    },
    handleRemoveClick(removeId) {
      this.items = this.items.filter(({ id }) => id !== removeId);
    },
    handleClearCompletedClick() {
      this.items = this.items.filter(({ isComplete }) => !isComplete);
    },
    handleCompleteAllChange() {
      this.items = [...this.items].map((item) => ({
        ...item,
        isComplete: this.isCompleteAllToggled,
      }));
    },
    handleCompleteItemChange() {
      this.setCompleteAllToggle();
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
    setCompleteAllToggle() {
      this.isCompleteAllToggled = !this.items.some(
        ({ isComplete }) => !isComplete
      );
    },
  },
  components: {},
};
</script>

<style>
/** ... */
</style>
