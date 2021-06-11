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
        <b-row ref="row">
          <!-- Item Name -->
          <b-col md="4">
            <b-form-group label="Optamize For" label-for="optamize">
              <v-select
                id="optamize"
                v-model="optamize"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="optamizeOptions"
                :selectable="(option) => !option.value.includes('select_value')"
                label="text"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </div>
  </b-card>
</template>

<script>
/* eslint-disable */

// eslint-disable-next-line object-curly-newline
import { BForm, BFormGroup, BRow, BCol, BButton, BCard } from "bootstrap-vue";
import { heightTransition } from "@core/mixins/ui/transition";
import Ripple from "vue-ripple-directive";
import vSelect from "vue-select";
// eslint-disable-next-line

export default {
  components: {
    BCard,
    BForm,
    BRow,
    BCol,
    BFormGroup,
    vSelect,
    BButton,
  },
  directives: {
    Ripple,
  },
  mixins: [heightTransition],
  data() {
    return {
      result: "",
    };
  },
  computed: {
    optamizeOptions() {
      if (this.replacementMode) {
        return [
          { value: "select_value", text: "Select Value" },
          { value: "max", text: "Max Cost" },
          { value: "min", text: "Min Cost" },
        ];
      } else {
        return [
          { value: "select_value", text: "Select Value" },
          { value: "max", text: "Max profit" },
          { value: "min", text: "Min profit" },
        ];
      }
    },
    replacementMode: {
      get() {
        return this.$store.state.lp.replacementMode;
      },
    },
    optamize: {
      get() {
        this.$store.state.lp.optamize;
      },
      set(value) {
        this.$store.commit("lp/SET_OPTAMIZE", value);
      },
    },
    items() {
      return this.$store.getters["lp/prodcuts"];
    },
    max_ptm() {
      return Number(this.$store.state.lp.max_ptm);
    },
    max_ptw() {
      return Number(this.$store.state.lp.max_ptw);
    },
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
