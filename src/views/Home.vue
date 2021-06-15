e<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2 ob-mw-80">
      <!-- Login v1 -->
      <b-card class="mb-0">
        <b-link class="brand-logo ob-logo-warper">
          <img src="@/assets/images/logo/LOGO.jpg" alt="" class="ob-logo" />
          <h2 class="brand-text text-primary ml-1">
            Bussniss advisor
          </h2>
        </b-link>

        <b-card-title class="mb-1 text-center">
          Solving LP problems is as easy as going through the form in this page
          💪
        </b-card-title>
        <!-- <b-card-text class="mb-2 text-center">
        </b-card-text> -->

        <form-wizard
          color="#7367F0"
          :title="null"
          :subtitle="null"
          shape="square"
          finish-button-text="Find Result"
          back-button-text="Previous"
          class="mb-3"
          @on-complete="formSubmitted"
        >
          <!-- accoint details tab -->
          <tab-content title="Products Info">
            <validation-observer ref="accountRules" tag="form">
              <b-row>
                <b-col cols="10" class="mb-2">
                  <h5 class="mb-0">
                    Products Info
                  </h5>
                  <small class="text-muted">
                    Enter the products that is avaialable in the system
                  </small>
                </b-col>
                <b-col cols="2" class="mb-2">
                  <div class="d-flex f-justify-end">
                    <div>
                      <b-form-checkbox
                        v-model="replacementMode"
                        :value="true"
                        class="custom-control-primary"
                      >
                        Replacement mode
                      </b-form-checkbox>
                    </div>
                  </div>
                </b-col>
                <b-col md="12">
                  <form-repeater-products ref="form" />
                </b-col>
              </b-row>
            </validation-observer>
          </tab-content>

          <!-- personal details tab -->
          <tab-content title="Factory info">
            <validation-observer ref="infoRules" tag="form">
              <b-row>
                <b-col cols="12" class="mb-2">
                  <h5 class="mb-0">
                    Factory Info
                  </h5>
                  <small class="text-muted"
                    >Enter production hours the factory can provide for each
                    product.</small
                  >
                </b-col>
                <b-col md="12">
                  <factory-form ref="form" />
                </b-col>
              </b-row>
            </validation-observer>
          </tab-content>

          <!-- address  -->
          <tab-content title="Optmization" ref="form">
            <validation-observer ref="addressRules" tag="form">
              <b-row v-if="!replacementMode">
                <b-col cols="12" class="mb-2">
                  <h5 class="mb-0">
                    Optmization
                  </h5>
                  <small class="text-muted"
                    >Select the optmization target that you want to get the
                    result for.</small
                  >
                </b-col>
                <b-col md="12"> <optamize-form /> </b-col>
                <b-col md="3" v-if="results"></b-col>
                <b-col md="6" v-if="results">
                  <h3 class="text-center">
                    {{
                      ` the ${$store.state.lp.optamize.value} ${
                        $store.state.lp.optamize.value == "min"
                          ? "cost"
                          : "profit"
                      } is ${results.result} `
                    }}
                  </h3>
                  <b-list-group>
                    <b-list-group-item
                      class="d-flex justify-content-between align-items-center"
                      v-for="item in resultsItems"
                      :key="item.name"
                    >
                      <span>{{ item.name }} </span>
                      <b-badge variant="primary" pill class="badge-round">
                        {{ item.quantity }}
                      </b-badge>
                    </b-list-group-item>
                  </b-list-group>
                </b-col>
                <b-col md="3" v-if="results"></b-col>
              </b-row>
              <b-row v-if="replacementMode">
                <b-col cols="12" class="mb-2">
                  <h5 class="mb-0">
                    Optmization
                  </h5>
                  <small class="text-muted"
                    >Select the optmization target that you want to get the
                    result for.</small
                  >
                </b-col>
                <b-col md="12"> <optamize-form /> </b-col>
                <b-col md="3" v-if="replacmentResult"></b-col>
                <b-col md="6" v-if="replacmentResult">
                  <b-table responsive="sm" :items="replacmentResult" />
                </b-col>
                <b-col md="3" v-if="replacmentResult"></b-col>
              </b-row>
            </validation-observer>
          </tab-content>
        </form-wizard>
      </b-card>
      <!-- /Login v1 -->
    </div>
  </div>
</template>

<script>
import { FormWizard, TabContent } from "vue-form-wizard";
import { ValidationObserver } from "vee-validate";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

import "vue-form-wizard/dist/vue-form-wizard.min.css";
import {
  BRow,
  BCol,
  BLink,
  // BFormGroup,
  BCardTitle,
  // BCardText,
  // BFormInput,
  BBadge,
  BCard,
  BFormCheckbox,
  BListGroup,
  BListGroupItem,
  BTable,
} from "bootstrap-vue";
import solver from "javascript-lp-solver";
import munkres from "munkres-js";

import FormRepeaterProducts from "./Home/FormRepeaterProducts.vue";
import FactoryForm from "./Home/FactoryForm.vue";
import OptamizeForm from "./Home/OptamizeForm.vue";

export default {
  components: {
    ValidationObserver,
    BCard,
    BCardTitle,
    BLink,
    BTable,
    // BCardText,

    FormWizard,
    TabContent,
    BRow,
    BCol,
    BBadge,
    // BFormGroup,
    // BFormInput,
    BFormCheckbox,

    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
    // tabs
    FormRepeaterProducts,
    FactoryForm,
    OptamizeForm,
    BListGroup,
    BListGroupItem,
  },
  data() {
    return {
      results: "",
      resultsItems: [],
      BListGroup: "",
      replacmentResult: [],
    };
  },
  computed: {
    replacementMode: {
      get() {
        return this.$store.state.lp.replacementMode;
      },
      set(value) {
        this.$store.commit("lp/SET_REPLACEMENT_MODE", value);
      },
    },
    max_ptm() {
      return Number(this.$store.state.lp.max_ptm);
    },
    max_ptw() {
      return Number(this.$store.state.lp.max_ptw);
    },
    max_cost() {
      return Number(this.$store.state.lp.max_cost);
    },
    min_cost() {
      return Number(this.$store.state.lp.min_cost);
    },
    max_capacity() {
      return Number(this.$store.state.lp.max_capacity);
    },
    products() {
      return this.$store.getters["lp/prodcuts"];
    },
    storages() {
      return this.$store.getters["lp/storages"];
    },
  },
  mounted() {
    // this.initTrHeight();
  },
  methods: {
    buildResultProductText() {
      this.resultsItems = [];
      for (let index = 0; index < this.products.length; index += 1) {
        const product = this.products[index];
        if (product.name in this.results) {
          this.resultsItems.push({
            name: product.name,
            quantity: this.results[product.name],
          });
        }
      }
    },
    solveLP() {
      let optimize = "cost";
      if (
        !this.replacementMode &&
        this.$store.state.lp.optamize.value == "max"
      ) {
        optimize = "profit";
      }

      const opType = this.$store.state.lp.optamize.value;
      let constraints = {};
      if (this.replacementMode) {
        constraints = {
          quantity: { max: Number(this.max_capacity) },
        };
      } else {
        constraints = {
          ptw: { max: Number(this.max_ptw) },
          ptm: { max: Number(this.max_ptm) },
        };
        if (optimize == "profit") {
          constraints["cost"] = {
            max: Number(this.max_cost),
            // min: Number(this.min_cost),
          };
        }
      }
      const variables = {};
      const ints = {};

      for (let index = 0; index < this.products.length; index += 1) {
        const product = this.products[index];
        const profit =
          Number(product.price) - (Number(product.cost) + Number(product.wage));
        let cost = Number(product.rent) / Number(product.quantity);
        cost += profit;
        if (this.replacementMode) {
          variables[product.name] = {
            cost,
            rent: Number(product.rent),
            quantity: Number(product.quantity),
          };
        } else {
          variables[product.name] = {
            profit,
            price: Number(product.price),
            cost: Number(product.cost),
            wage: Number(product.wage),
            ptw: Number(product.ptw),
            ptm: Number(product.ptm),
          };
        }
        ints[product.name] = 1;
      }
      const model = {
        optimize,
        opType,
        constraints,
        variables,
        ints,
      };
      console.log(JSON.stringify(model));
      const results = solver.Solve(model);
      this.results = results;
      console.log(results);
      this.buildResultProductText();
    },
    solveReplacement() {
      this.replacmentResult = [];
      const toSolve = [];
      const productMap = {};
      for (let i = 0; i < this.products.length; i++) {
        const product = this.products[i];
        productMap[product.name] = product.quantity;
        const productCostInStorage = [];
        for (let j = 0; j < this.storages.length; j++) {
          const storage = this.storages[j];
          const cost = Number(product.size) * Number(storage.rent);
          productCostInStorage.push(cost);
        }
        toSolve.push(productCostInStorage);
      }
      console.log(toSolve);
      let result = munkres(toSolve);
      for (let index = 0; index < result.length; index++) {
        const item = result[index];
        this.replacmentResult.push({
          "Product name": this.products[item[0]].name,
          "Storage Name": this.storages[item[1]].name,
          Cost: toSolve[item[0]][item[1]],
        });
      }

      console.log(result);
    },
    formSubmitted() {
      if (!this.replacementMode) {
        this.solveLP();
      } else {
        this.solveReplacement();
      }
    },
    validationForm() {
      return new Promise((resolve, reject) => {
        this.$refs.accountRules.validate().then((success) => {
          if (success) {
            resolve(true);
          } else {
            reject();
          }
        });
      });
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
@import "@core/scss/vue/libs/vue-select.scss";
@import "@core/scss/vue/libs/vue-wizard.scss";

.ob-mw-80 {
  width: 80%;
  max-width: 1600px !important;
}

.ob-logo {
  max-width: 160px;
}

.ob-logo-warper {
  flex-direction: column;
  align-items: center;
}

.f-justify-end {
  justify-content: flex-end;
}
</style>
