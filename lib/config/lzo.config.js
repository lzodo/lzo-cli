let configs = require("./lzo.config.json");
let { lzoWrite } = require("../utils");

const setAttributes = (attr, values) => {
  configs[attr] = values;
  lzoWrite("../config/lzo.config.json", configs);
  console.log(`成功设置${attr} = ${configs[attr]}`)
};

const getAttributes = (attr) => {
  console.log(configs[attr]);
  return configs[attr];
};
module.exports = {
  setAttributes,
  getAttributes
};
