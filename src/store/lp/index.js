export default {
  namespaced: true,
  state: {
    replacementMode: false,
    max_ptw: null,
    max_ptm: null,
    max_capacity: null,
    products: [
      {
        id: 1,
        name: "",
        ptw: 5,
        ptm: 10,
      },
    ],
  },
  getters: {
    prodcuts: (state) => state.products,
  },
  mutations: {
    SET_ITEM(state, payload) {
      state.products[payload.index] = payload.product;
      state.products = [...state.products];
    },
    ADD_NEW_PRODUCT(state, payload) {
      state.products.push(payload);
    },
    REMOVE_PRODUCT(state, index) {
      state.products.splice(index, 1);
    },
    SET_MAX_PTM(state, payload) {
      state.max_ptm = payload;
    },
    SET_MAX_PTW(state, payload) {
      state.max_ptw = payload;
    },
    SET_REPLACEMENT_MODE(state, payload) {
      state.replacementMode = payload;
    },
    SET_OPTAMIZE(state, payload) {
      state.optamize = payload;
    },
    SET_MAX_CAPACITY(state, payload) {
      state.max_capacity = payload;
    },
  },
  actions: {},
};
