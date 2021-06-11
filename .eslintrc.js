module.exports = {
  root: false,
  env: {
    node: true,
  },
  extends: ["plugin:vue/recommended", "@vue/airbnb"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",

    "max-len": "off",
    "linebreak-style": "off",
    "operator-linebreak": "off",
    camelcase: [
      "error",
      { properties: "never", ignoreDestructuring: true, ignoreImports: true },
    ],
    "arrow-parens": ["warn", "as-needed"],
    "vue/multiline-html-element-content-newline": "off",

    //custom
    quotes: [2, "double"],
  },
};
