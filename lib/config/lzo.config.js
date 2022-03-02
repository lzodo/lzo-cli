let configs = require("../data/lzo.config.json");
let { lzoWrite } = require("../utils");

const setAttributes = (attr, values) => {
  configs[attr] = values;
  lzoWrite("../data/lzo.config.json", configs);
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
