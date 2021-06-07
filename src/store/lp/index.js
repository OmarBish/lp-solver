export default {
  namespaced: true,
  state: {
    products: [
      {
        id: 1,
        name: "",
        profit: null,
        ptw: 5,
        ptm: 10,
      },
    ],
  },
  getters: {},
  mutations: {
    SET_ITEM(state, payload) {
      state.products[payload.index] = payload.product;
    },
    ADD_NEW_PRODUCT(state, payload) {
      state.products.push(payload);
    },
    REMOVE_PRODUCT(state, index) {
      state.products.splice(index, 1);
    },
  },
  actions: {},
};
