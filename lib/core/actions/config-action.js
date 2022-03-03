
const { setAttributes, getAttributes } = require("../../config/lzo.config");

const setConfigAction = (key, value) => {
  setAttributes(key, value);
};

const getConfigAction = (key) => {
  getAttributes(key);
};

module.exports = {
  setConfigAction,
  getConfigAction,
};
