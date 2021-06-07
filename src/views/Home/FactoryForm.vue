<template>
  <b-card-code>
    <div>
      <b-form
        ref="form"
        :style="{ height: trHeight }"
        class="form"
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
          <b-col md="4">
            <b-form-group
              :label="`Provide '${item.name}' production hours`"
              label-for="item-fph"
            >
              <b-form-input
                id="item-fph"
                type="number"
                placeholder="32"
                :value="item.fph"
                @input="setFph($event, item, index)"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <hr class="mb-3" />
          </b-col>
        </b-row>
      </b-form>
    </div>
  </b-card-code>
</template>

<script>
import BCardCode from "@core/components/b-card-code";
// eslint-disable-next-line object-curly-newline
import { BForm, BFormGroup, BFormInput, BRow, BCol } from "bootstrap-vue";
import { heightTransition } from "@core/mixins/ui/transition";
import Ripple from "vue-ripple-directive";

export default {
  components: {
    BCardCode,
    BForm,
    BRow,
    BCol,
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
      return this.$store.state.lp.products;
    },
  },
  mounted() {
    // this.initTrHeight();
  },
  created() {
    window.addEventListener("resize", this.initTrHeight);
  },
  destroyed() {
    window.removeEventListener("resize", this.initTrHeight);
  },
  methods: {
    setFph(value, item, index) {
      const tempItem = item;
      tempItem.fph = value;
      this.$store.commit("lp/SET_ITEM", {
        index,
        product: tempItem,
      });
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
