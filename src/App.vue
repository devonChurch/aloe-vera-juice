<template>
  <main id="app">
    <h1>{{ $t("message.heading.app") }}</h1>
    <div v-show="hasAnyItems">
      <label for="complete-all">{{ $t("message.label.complete.all") }}</label>
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
      <label for="new-item">{{ $t("message.label.add.one") }}</label>
      <input id="new-item" v-model="newItemMessage" type="text" />
    </form>
    <div v-show="hasAnyItems">
      <ul>
        <li v-for="item in requestedItems" :key="item.id">
          <label :for="'complete-' + item.id">{{
            $t("message.label.complete.one")
          }}</label>
          <input
            type="checkbox"
            :id="'complete-' + item.id"
            :name="'complete-' + item.id"
            @change="handleCompleteItemChange"
            v-model="item.isComplete"
          />
          {{ item.message }}
          <button @click="handleRemoveClick(item.id)">
            {{ $t("message.action.remove.one") }}
          </button>
        </li>
      </ul>
      <span>{{ $tc("message.label.active.all", totalActiveItems) }}</span>
      <label for="request-all">{{ $t("message.label.filter.all") }}</label>
      <input
        type="radio"
        id="request-all"
        name="request-type"
        value="all"
        v-model="requestedType"
      />
      <label for="request-active">{{
        $t("message.label.filter.active")
      }}</label>
      <input
        type="radio"
        id="request-active"
        name="request-type"
        value="active"
        v-model="requestedType"
      />
      <label for="request-completed">{{
        $t("message.label.filter.completed")
      }}</label>
      <input
        type="radio"
        id="request-completed"
        name="request-type"
        value="completed"
        v-model="requestedType"
      />
      <button v-show="hasAnyCompletedItems" @click="handleClearCompletedClick">
        {{ $t("message.action.remove.completed") }}
      </button>
    </div>
  </main>
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
    totalActiveItems() {
      return this["requestItems-active"]().length;
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
