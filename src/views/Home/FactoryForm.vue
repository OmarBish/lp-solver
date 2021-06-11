<template>
  <b-card>
    <div>
      <b-form
        ref="form"
        :style="{ height: trHeight }"
        class="form"
        @submit.prevent=""
      >
        <!-- Row Loop -->
        <b-row ref="row" v-if="!replacementMode">
          <!-- Item Name -->
          <b-col md="4">
            <b-form-group
              :label="`number of workers hours the factory can provide`"
              label-for="item-max-ptw"
            >
              <b-form-input
                id="item-max-ptw"
                type="number"
                placeholder="32"
                :value="max_ptw"
                @input="setMaxPtw($event)"
              />
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group
              :label="`number of machine hours the factory can provide`"
              label-for="item-max-ptm"
            >
              <b-form-input
                id="item-max-ptm"
                type="number"
                placeholder="32"
                :value="max_ptm"
                @input="setMaxPtm($event)"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <hr class="mb-3" />
          </b-col>
        </b-row>
        <!-- Row Loop -->
        <div v-if="replacementMode">
          <b-row
            v-for="(item, index) in items"
            :id="item.id"
            :key="item.id"
            ref="row"
          >
            <!-- Item Name -->
            <b-col md="2">
              <b-form-group label="Storage Name" label-for="item-name">
                <b-form-input
                  id="item-name"
                  type="text"
                  placeholder="EX: Nasra storage"
                  :value="item.name"
                  @input="setName($event, item, index)"
                />
              </b-form-group>
            </b-col>

            <!-- Capacity -->
            <!-- <b-col md="2">
              <b-form-group label="Max Capacity" label-for="capacity">
                <b-form-input
                  id="capacity"
                  type="number"
                  placeholder="32"
                  :value="item.capacity"
                  @input="setCapacity($event, item, index)"
                />
              </b-form-group>
            </b-col> -->

            <!-- Rent -->
            <b-col md="2">
              <b-form-group label="Rent" label-for="rent">
                <b-form-input
                  id="rent"
                  type="number"
                  placeholder="32"
                  :value="item.rent"
                  @input="setRent($event, item, index)"
                />
              </b-form-group>
            </b-col>

            <!-- Remove Button -->
            <b-col lg="2" md="3" class="mb-50">
              <b-button
                v-ripple.400="'rgba(234, 84, 85, 0.15)'"
                variant="outline-danger"
                class="mt-0 mt-md-2"
                @click="removeItem(index)"
              >
                <feather-icon icon="XIcon" class="mr-25" />
                <span>Delete</span>
              </b-button>
            </b-col>

            <!-- Seperator -->
            <b-col cols="12">
              <hr />
            </b-col>
          </b-row>
        </div>
      </b-form>
    </div>
    <b-button
      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
      variant="primary"
      @click="repeateAgain"
    >
      <feather-icon icon="PlusIcon" class="mr-25" />
      <span>Add New</span>
    </b-button>
  </b-card>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import {
  BForm,
  BFormGroup,
  BFormInput,
  BRow,
  BCol,
  BCard,
  BButton,
} from "bootstrap-vue";
import { heightTransition } from "@core/mixins/ui/transition";
import Ripple from "vue-ripple-directive";

export default {
  components: {
    BCard,
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BButton,
  },
  directives: {
    Ripple,
  },
  mixins: [heightTransition],
  data() {
    return {
      nextTodoId: 2,
    };
  },
  computed: {
    max_ptm() {
      return this.$store.state.lp.max_ptm;
    },
    max_ptw() {
      return this.$store.state.lp.max_ptw;
    },
    max_capacity() {
      return this.$store.state.max_capacity;
    },
    replacementMode() {
      return this.$store.state.lp.replacementMode;
    },
    items() {
      return this.$store.getters["lp/storages"];
    },
  },
  mounted() {
    this.initTrHeight();
    setInterval(() => this.initTrHeight(), 1000);
  },
  created() {
    window.addEventListener("resize", this.initTrHeight);
  },
  destroyed() {
    window.removeEventListener("resize", this.initTrHeight);
  },
  methods: {
    setName(value, item, index) {
      const tempItem = item;
      tempItem.name = value;
      this.$store.commit("lp/SET_STORAGE_ITEM", {
        index,
        storage: tempItem,
      });
    },
    setRent(value, item, index) {
      const tempItem = item;
      tempItem.rent = value;
      this.$store.commit("lp/SET_STORAGE_ITEM", {
        index,
        storage: tempItem,
      });
    },
    setCapacity(value, item, index) {
      const tempItem = item;
      tempItem.capacity = value;
      this.$store.commit("lp/SET_STORAGE_ITEM", {
        index,
        storage: tempItem,
      });
    },
    setMaxPtm(value) {
      this.$store.commit("lp/SET_MAX_PTM", value);
    },
    setMaxPtw(value) {
      this.$store.commit("lp/SET_MAX_PTW", value);
    },
    setMaxCapacity(value) {
      this.$store.commit("lp/SET_MAX_CAPACITY", value);
    },
    repeateAgain() {
      this.$store.commit("lp/ADD_NEW_STORAGE", {
        id: (this.nextTodoId += this.nextTodoId),
      });

      this.$nextTick(() => {
        this.trAddHeight(this.$refs.row[0].offsetHeight);
      });
    },
    removeItem(index) {
      this.$store.commit("lp/REMOVE_STORAGE", index);
      this.trTrimHeight(this.$refs.row[0].offsetHeight);
    },
    initTrHeight() {
      this.trSetHeight(null);
      this.$nextTick(() => {
        this.trSetHeight(this.$refs.form.scrollHeight);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.repeater-form {
  overflow: hidden;
  transition: 0.35s height;
}
</style>
