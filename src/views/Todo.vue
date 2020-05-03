<template>
  <main class="card">
    <div class="card-header">
      <h1 class="h3 m-0">{{ $t("heading.app") }}</h1>
    </div>
    <div class="card-body border-bottom">
      <form @submit="handleNewItemSubmit" class="form-group">
        <label for="new-item">{{ $t("label.add.one") }}</label>
        <input
          class="form-control"
          id="new-item"
          v-model="newItemMessage"
          type="text"
        />
      </form>
      <div v-show="hasAnyItems" class="form-group form-check mb-0">
        <input
          type="checkbox"
          class="form-check-input"
          id="complete-all"
          name="complete-all"
          :indeterminate.prop="hasPartialCompletedItems"
          @change="handleCompleteAllChange"
          v-model="isCompleteAllToggled"
        />
        <label class="form-check-label" for="complete-all">{{
          $t("label.complete.all")
        }}</label>
      </div>
    </div>
    <ul v-show="hasAnyItems" class="list-group list-group-flush">
      <li
        class="list-group-item bg-light d-flex"
        v-for="item in requestedItems"
        :key="item.id"
      >
        <div class="form-group form-check mb-0">
          <input
            type="checkbox"
            class="form-check-input"
            :id="'complete-' + item.id"
            :name="'complete-' + item.id"
            @change="handleCompleteItemChange"
            v-model="item.isComplete"
          />
          <label
            class="form-check-label sr-only"
            :for="'complete-' + item.id"
            >{{ $t("label.complete.one") }}</label
          >
        </div>
        {{ item.message }}
        <button
          type="button"
          class="btn btn-light btn-sm ml-auto align-self-start"
          @click="handleRemoveClick(item.id)"
        >
          <svg height="24" viewBox="0 0 24 24" width="24">
            <path
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
            />
          </svg>
          <span class="sr-only">{{ $t("action.remove.one") }}</span>
        </button>
      </li>
    </ul>
    <div class="card-body">
      <div class="h5">{{ $tc("label.active.all", totalActiveItems) }}</div>
      <div class="form-check">
        <input
          type="radio"
          class="form-check-input"
          id="request-all"
          name="request-type"
          value="all"
          v-model="requestedType"
        />
        <label class="form-check-label" for="request-all">{{
          $t("label.filter.all")
        }}</label>
      </div>
      <div class="form-check">
        <input
          type="radio"
          class="form-check-input"
          id="request-active"
          name="request-type"
          value="active"
          v-model="requestedType"
        />
        <label class="form-check-label" for="request-active">{{
          $t("label.filter.active")
        }}</label>
      </div>
      <div class="form-check">
        <input
          type="radio"
          class="form-check-input"
          id="request-completed"
          name="request-type"
          value="completed"
          v-model="requestedType"
        />
        <label class="form-check-label" for="request-completed">{{
          $t("label.filter.completed")
        }}</label>
      </div>
      <button
        type="button"
        class="btn btn-outline-danger mt-3"
        v-show="hasAnyCompletedItems"
        @click="handleClearCompletedClick"
      >
        {{ $t("action.remove.completed") }}
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
