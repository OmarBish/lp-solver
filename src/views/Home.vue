<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2 ob-mw-80">
      <!-- Login v1 -->
      <b-card class="mb-0">
        <b-link class="brand-logo">
          <h2 class="brand-text text-primary ml-1">
            Linear Programming solver
          </h2>
        </b-link>

        <b-card-title class="mb-1 text-center">
          Solving LP problems is as easy as going throw the form in this page 💪
        </b-card-title>
        <!-- <b-card-text class="mb-2 text-center"> </b-card-text> -->

        <form-wizard
          color="#7367F0"
          :title="null"
          :subtitle="null"
          shape="square"
          finish-button-text="Submit"
          back-button-text="Previous"
          class="mb-3"
          @on-complete="formSubmitted"
        >
          <!-- accoint details tab -->
          <tab-content title="Products Info" :before-change="validationForm">
            <validation-observer ref="accountRules" tag="form">
              <b-row>
                <b-col cols="12" class="mb-2">
                  <h5 class="mb-0">
                    Products Info
                  </h5>
                  <small class="text-muted">
                    Enter the products that is avaialable in the system
                  </small>
                </b-col>
                <b-col md="12">
                  <form-repeater-products />
                </b-col>
              </b-row>
            </validation-observer>
          </tab-content>

          <!-- personal details tab -->
          <tab-content title="Factory info" :before-change="validationFormInfo">
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
                  <factory-form />
                </b-col>
              </b-row>
            </validation-observer>
          </tab-content>

          <!-- address  -->
          <tab-content title="Address" :before-change="validationFormAddress">
            <validation-observer ref="addressRules" tag="form">
              <b-row>
                <b-col cols="12" class="mb-2">
                  <h5 class="mb-0">
                    Address
                  </h5>
                  <small class="text-muted">Enter Your Address.</small>
                </b-col>
                <b-col md="6">
                  <b-form-group label="Address" label-for="address">
                    <validation-provider
                      #default="{ errors }"
                      name="Address"
                      rules="required"
                    >
                      <b-form-input
                        id="address"
                        v-model="address"
                        :state="errors.length > 0 ? false : null"
                        placeholder="98 Borough bridge Road, Birmingham"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col md="6">
                  <b-form-group label="Landmark" label-for="landmark">
                    <validation-provider
                      #default="{ errors }"
                      name="Landmark"
                      rules="required"
                    >
                      <b-form-input
                        id="landmark"
                        v-model="landMark"
                        :state="errors.length > 0 ? false : null"
                        placeholder="Borough bridge"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col md="6">
                  <b-form-group label="Pincode" label-for="pincode">
                    <validation-provider
                      #default="{ errors }"
                      name="Pincode"
                      rules="required"
                    >
                      <b-form-input
                        id="pincode"
                        v-model="pincode"
                        :state="errors.length > 0 ? false : null"
                        type="number"
                        placeholder="658921"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col md="6">
                  <b-form-group label="City" label-for="city">
                    <validation-provider
                      #default="{ errors }"
                      name="City"
                      rules="required"
                    >
                      <b-form-input
                        id="city"
                        v-model="city"
                        :state="errors.length > 0 ? false : null"
                        placeholder="Birmingham"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
              </b-row>
            </validation-observer>
          </tab-content>

          <!-- social link -->
          <tab-content
            title="Social Links"
            :before-change="validationFormSocial"
          >
            <validation-observer ref="socialRules" tag="form">
              <b-row>
                <b-col cols="12" class="mb-2">
                  <h5 class="mb-0">
                    Social Links
                  </h5>
                  <small class="text-muted">Enter Your Social Links</small>
                </b-col>
                <b-col md="6">
                  <b-form-group label="Twitter" label-for="twitter">
                    <validation-provider
                      #default="{ errors }"
                      name="Twitter"
                      rules="required|url"
                    >
                      <b-form-input
                        id="twitter"
                        v-model="twitterUrl"
                        :state="errors.length > 0 ? false : null"
                        placeholder="https://twitter.com/abc"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col md="6">
                  <b-form-group label="Facebook" label-for="facebook">
                    <validation-provider
                      #default="{ errors }"
                      name="Facebook"
                      rules="required|url"
                    >
                      <b-form-input
                        id="facebook"
                        v-model="facebookUrl"
                        :state="errors.length > 0 ? false : null"
                        placeholder="https://facebook.com/abc"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col md="6">
                  <b-form-group label="Google+" label-for="google-plus">
                    <validation-provider
                      #default="{ errors }"
                      name="Google+"
                      rules="required|url"
                    >
                      <b-form-input
                        id="google-plus"
                        v-model="googleUrl"
                        :state="errors.length > 0 ? false : null"
                        placeholder="https://plus.google.com/abc"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col md="6">
                  <b-form-group label="LinkedIn" label-for="linked-in">
                    <validation-provider
                      #default="{ errors }"
                      name="LinkedIn"
                      rules="required|url"
                    >
                      <b-form-input
                        id="linked-in"
                        v-model="linkedinUrl"
                        :state="errors.length > 0 ? false : null"
                        placeholder="https://linkedin.com/abc"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
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
import { ValidationProvider, ValidationObserver } from "vee-validate";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import {
  BRow,
  BCol,
  BLink,
  BFormGroup,
  BCardTitle,
  // BCardText,
  BFormInput,
  BCard,
} from "bootstrap-vue";

import { required, email } from "@validations";
import FormRepeaterProducts from "./Home/FormRepeaterProducts.vue";
import FactoryForm from "./Home/FactoryForm.vue";

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    BCard,
    BCardTitle,
    BLink,
    // BCardText,

    FormWizard,
    TabContent,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,

    // tabs
    FormRepeaterProducts,
    FactoryForm,
  },
  data() {
    return {
      selectedContry: "",
      selectedLanguage: "",
      name: "",
      emailValue: "",
      PasswordValue: "",
      passwordCon: "",
      first_name: "",
      last_name: "",
      address: "",
      landMark: "",
      pincode: "",
      twitterUrl: "",
      facebookUrl: "",
      googleUrl: "",
      linkedinUrl: "",
      city: "",
      required,
      email,
      countryName: [
        { value: "select_value", text: "Select Value" },
        { value: "Russia", text: "Russia" },
        { value: "Canada", text: "Canada" },
        { value: "China", text: "China" },
        { value: "United States", text: "United States" },
        { value: "Brazil", text: "Brazil" },
        { value: "Australia", text: "Australia" },
        { value: "India", text: "India" },
      ],
      languageName: [
        { value: "nothing_selected", text: "Nothing Selected" },
        { value: "English", text: "English" },
        { value: "Chinese", text: "Mandarin Chinese" },
        { value: "Hindi", text: "Hindi" },
        { value: "Spanish", text: "Spanish" },
        { value: "Arabic", text: "Arabic" },
        { value: "Malay", text: "Malay" },
        { value: "Russian", text: "Russian" },
      ],
    };
  },
  methods: {
    formSubmitted() {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: "Form Submitted",
          icon: "EditIcon",
          variant: "success",
        },
      });
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
    validationFormInfo() {
      return new Promise((resolve, reject) => {
        this.$refs.infoRules.validate().then((success) => {
          if (success) {
            resolve(true);
          } else {
            reject();
          }
        });
      });
    },
    validationFormAddress() {
      return new Promise((resolve, reject) => {
        this.$refs.addressRules.validate().then((success) => {
          if (success) {
            resolve(true);
          } else {
            reject();
          }
        });
      });
    },
    validationFormSocial() {
      return new Promise((resolve, reject) => {
        this.$refs.socialRules.validate().then((success) => {
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

.ob-mw-80 {
  width: 80%;
  max-width: 1600px !important;
}
</style>
