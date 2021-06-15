export default {
  namespaced: true,
  state: {
    replacementMode: false,
    max_ptw: null,
    max_ptm: null,
    max_cost: null,
    min_cost: null,
    max_capacity: null,
    products: [
      {
        id: 1,
        name: "",
        ptw: 5,
        ptm: 10,
      },
    ],
    storages: [{ capacity: null, rent_per_cm: null }],
  },
  getters: {
    prodcuts: (state) => state.products,
    storages: (state) => state.storages,
  },
  mutations: {
    SET_ITEM(state, payload) {
      state.products[payload.index] = payload.product;
      state.products = [...state.products];
    },
    SET_STORAGE_ITEM(state, payload) {
      state.storages[payload.index] = payload.storage;
      state.storages = [...state.storages];
    },
    ADD_NEW_PRODUCT(state, payload) {
      state.products.push(payload);
    },
    ADD_NEW_STORAGE(state, payload) {
      state.storages.push(payload);
    },
    REMOVE_STORAGE(state, index) {
      state.storages.splice(index, 1);
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
    SET_MAX_COST(state, payload) {
      state.max_cost = payload;
    },
    SET_MIN_COST(state, payload) {
      state.min_cost = payload;
    },
  },
  actions: {},
};
