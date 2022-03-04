const path = require("path");
const fs = require("fs");

const homedir = process.env.HOME || require("os").homedir();
const configPath = path.resolve(homedir, ".zotoolrc");
const { loadFile, lzoWrite } = require("../../utils");
const { setAttributes, getAttributes } = require("../../config/lzo.config");

const setConfigAction = (key, value) => {
    setAttributes(key, value);
};

const getConfigAction = (key) => {
    getAttributes(key);
};

const localConfigAction = async (option = {}) => {
  let defaultOptions = await loadFile(configPath);
  let mergeOption = { ...defaultOptions, ...option };
  lzoWrite(configPath, mergeOption, true);
};

module.exports = {
    setConfigAction,
    getConfigAction,
    localConfigAction,
};
