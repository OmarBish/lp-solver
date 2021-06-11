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
        <b-row ref="row" v-if="replacementMode">
          <!-- Item Name -->
          <b-col md="4">
            <b-form-group
              :label="`Maximum Factory Capacity `"
              label-for="item-max-ptw"
            >
              <b-form-input
                id="item-max-ptw"
                type="number"
                placeholder="32"
                :value="max_capacity"
                @input="setMaxCapacity($event)"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <hr class="mb-3" />
          </b-col>
        </b-row>
      </b-form>
    </div>
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
    setMaxPtm(value) {
      this.$store.commit("lp/SET_MAX_PTM", value);
    },
    setMaxPtw(value) {
      this.$store.commit("lp/SET_MAX_PTW", value);
    },
    setMaxCapacity(value) {
      this.$store.commit("lp/SET_MAX_CAPACITY", value);
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
