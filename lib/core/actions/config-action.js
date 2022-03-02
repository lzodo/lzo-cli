
const { setAttributes, getAttributes } = require("../../config/lzo.config");
const configs = require("../../data/lzo.config.json");

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
