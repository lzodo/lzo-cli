const programOpts = require("commander").opts();
const path = require("path");
const os = require("os");
const open = require("open");
const inquirer = require("inquirer");
const internetList = require("../data/Internet.json");

const getSystemInfoAction = () => {
	console.log(os.cpus());
};

const openInternetAction = (Internet) => {
	let browserKeys = Object.keys(open.apps);
	const choices = browserKeys;
	choices.push("default");
	choices.push(new inquirer.Separator());

	inquirer
		.prompt([
			{
				type: "list",
				loop: false,
				name: "letter",
				message: "请选择访问浏览器?",
				choices,
			},
		])
		.then((data) => {
			if (data.letter == "default") {
				open(Internet);
			} else {
				open(Internet, { app: { name: open.apps[data.letter] } });
			}
		});
};
const openSelectInternetAction = () => {
	// 选择浏览器参数
	let browserKeys = Object.keys(open.apps);
	const choices = browserKeys;
	choices.push("default");
	choices.push(new inquirer.Separator());

	//选择网址
	let intArr = Object.keys(internetList);

	inquirer
		.prompt([
			{
				type: "list",
				loop: false,
				name: "letter",
				message: "请选择访问浏览器?",
				choices,
			},
			{
				type: "checkbox",
				name: "list",
				message: "请选择网址",
				choices: intArr,
			},
		])
		.then((data) => {
			console.log(JSON.stringify(data, null, "  "));
			if (data.letter == "default") {
				data.list.forEach((element) => {
					open(internetList[element]);
				});
			} else {
				data.list.forEach((element) => {
					open(
						internetList[element],
						{ app: { name: open.apps[data.letter] } }
					);
				});
			}
		});
};

module.exports = {
	getSystemInfoAction,
	openInternetAction,
	openSelectInternetAction,
};
