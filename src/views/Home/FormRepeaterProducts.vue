<template>
  <b-card title="Repeating Forms">
    <div>
      <b-form
        ref="form"
        :style="{ height: trHeight }"
        class="repeater-form"
        @submit.prevent="repeateAgain"
      >
        <!-- Row Loop -->
        <b-row
          v-for="(item, index) in items"
          :id="item.id"
          :key="item.id"
          ref="row"
        >
          <!-- Item Name -->
          <b-col md="2">
            <b-form-group label="Product Name" label-for="item-name">
              <b-form-input
                id="item-name"
                type="text"
                placeholder="EX: Watch"
                :value="item.name"
                @input="setName($event, item, index)"
              />
            </b-form-group>
          </b-col>

          <!-- Price -->
          <b-col md="2" v-if="!replacementMode">
            <b-form-group label="Price" label-for="price">
              <b-form-input
                id="price"
                type="number"
                placeholder="32"
                :value="item.price"
                @input="setPrice($event, item, index)"
              />
            </b-form-group>
          </b-col>

          <!-- Profit -->
          <!-- <b-col md="2" v-if="replacementMode">
            <b-form-group label="Profit" label-for="profit">
              <b-form-input
                id="profit"
                type="number"
                placeholder="32"
                :value="item.profit"
                @input="setProfit($event, item, index)"
              />
            </b-form-group>
          </b-col> -->

          <!-- Cost -->
          <b-col md="2" v-if="!replacementMode">
            <b-form-group label="Cost" label-for="cost">
              <b-form-input
                id="cost"
                type="number"
                placeholder="32"
                :value="item.cost"
                @input="setCost($event, item, index)"
              />
            </b-form-group>
          </b-col>

          <!-- Wage -->
          <b-col md="2" v-if="!replacementMode">
            <b-form-group label="Wage" label-for="wage">
              <b-form-input
                id="wage"
                type="number"
                placeholder="32"
                :value="item.wage"
                @input="setWage($event, item, index)"
              />
            </b-form-group>
          </b-col>

          <!-- Size in CM -->
          <b-col md="2" v-if="replacementMode">
            <b-form-group label="Size in cupic CM" label-for="size">
              <b-form-input
                id="size"
                type="number"
                placeholder="32"
                :value="item.size"
                @input="setSize($event, item, index)"
              />
            </b-form-group>
          </b-col>

          <!-- Quantity -->
          <b-col md="2" v-if="replacementMode">
            <b-form-group label="Quantity" label-for="quantity">
              <b-form-input
                id="quantity"
                type="number"
                placeholder="32"
                :value="item.quantity"
                @input="setQuantity($event, item, index)"
              />
            </b-form-group>
          </b-col>

          <!-- Production Time for Worker -->
          <b-col md="2" v-if="!replacementMode">
            <b-form-group label="Production Time for Worker" label-for="ptw">
              <b-form-input
                id="ptw"
                type="number"
                placeholder="32"
                :value="item.ptw"
                @input="setPtw($event, item, index)"
              />
            </b-form-group>
          </b-col>

          <!-- Production Time for Machine -->
          <b-col md="2" v-if="!replacementMode">
            <b-form-group label="Production Time for Machine" label-for="ptm">
              <b-form-input
                id="ptm"
                type="number"
                placeholder="32"
                :value="item.ptm"
                @input="setPtm($event, item, index)"
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
import {
  BCard,
  BForm,
  BFormGroup,
  BFormInput,
  BRow,
  BCol,
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
    BButton,
    BFormGroup,
    BFormInput,
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
    items() {
      return this.$store.getters["lp/prodcuts"];
    },
    replacementMode() {
      return this.$store.state.lp.replacementMode;
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
      this.$store.commit("lp/SET_ITEM", {
        index,
        product: tempItem,
      });
    },
    setPrice(value, item, index) {
      const tempItem = item;
      tempItem.price = value;
      this.$store.commit("lp/SET_ITEM", {
        index,
        product: tempItem,
      });
    },
    setProfit(value, item, index) {
      const tempItem = item;
      tempItem.profit = value;
      this.$store.commit("lp/SET_ITEM", {
        index,
        product: tempItem,
      });
    },
    setCost(value, item, index) {
      const tempItem = item;
      tempItem.cost = value;
      this.$store.commit("lp/SET_ITEM", {
        index,
        product: tempItem,
      });
    },
    setWage(value, item, index) {
      const tempItem = item;
      tempItem.wage = value;
      this.$store.commit("lp/SET_ITEM", {
        index,
        product: tempItem,
      });
    },
    setSize(value, item, index) {
      const tempItem = item;
      tempItem.size = value;
      this.$store.commit("lp/SET_ITEM", {
        index,
        product: tempItem,
      });
    },
    setQuantity(value, item, index) {
      const tempItem = item;
      tempItem.quantity = value;
      this.$store.commit("lp/SET_ITEM", {
        index,
        product: tempItem,
      });
    },
    setPtw(value, item, index) {
      const tempItem = item;
      tempItem.ptw = value;
      this.$store.commit("lp/SET_ITEM", {
        index,
        product: tempItem,
      });
    },
    setPtm(value, item, index) {
      const tempItem = item;
      tempItem.ptm = value;
      this.$store.commit("lp/SET_ITEM", {
        index,
        product: tempItem,
      });
    },
    repeateAgain() {
      this.$store.commit("lp/ADD_NEW_PRODUCT", {
        id: (this.nextTodoId += this.nextTodoId),
      });

      this.$nextTick(() => {
        this.trAddHeight(this.$refs.row[0].offsetHeight);
      });
    },
    removeItem(index) {
      this.$store.commit("lp/REMOVE_PRODUCT", index);
      this.trTrimHeight(this.$refs.row[0].offsetHeight);
    },
    initTrHeight() {
      this.trSetHeight(null);
      // this.$nextTick(() => {
      //   this.trSetHeight(this.$refs.form.scrollHeight);
      // });
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
