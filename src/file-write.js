const accessSync = require("fs-access").sync;
const fs = require("fs");
const chalk = require("chalk");
const args = require("./config");
const { versionFormat, repositoryFormat, removeBrackets } = require("./utils");
const path = require("path");

function createIfMissing(args) {
	try {
		accessSync(args.infile, fs.F_OK);
	} catch (err) {
		if (err.code === "ENOENT") {
			writeFile(args.infile, "\n");
			console.log(chalk.green(`created file ${args.infile} in ${path.resolve(".")}`));
		}
	}
}

function writeFile(filePath, content, expName) {
	if (expName) {
		console.log(chalk.green(`created file CHANGELOG-BRTS(${expName}).md in ${path.resolve(".")}`));
		fs.writeFileSync(`CHANGELOG-BRTS(${expName}).md`, content, "utf8");
	} else {
		console.log(chalk.green(`created file ${filePath} in ${path.resolve(".")}`));
		fs.writeFileSync(filePath, content, "utf8");
	}
}

function writeFileFormat(filePath, content, repository, issuesUrl) {
	let fileContent = "",
		index = 0;
	for (i in content) {
		if (index) {
			// 版本
			fileContent = fileContent + "## **" + versionFormat(i) + "** \n";
			for (it in content[i]) {
				//  每天
				let temp = content[i];
				temp = temp[it];
				const ic = getItems(temp, repository, issuesUrl);
				if (ic !== "") {
					fileContent = fileContent + "  ### **" + it + "** \n";
					fileContent = fileContent + "  " + ic + "\n";
				}
			}
			fileContent = fileContent + "  ******  " + "\n";
		}
		index++;
	}
	return fileContent;
}

function getItems(data, repository, issuesUrl) {
	let fileContent = "";
	for (ij in data) {
		// 类型
		if (args.showType.includes(ij) && data[ij].length > 0) {
			fileContent = fileContent + "### " + ij + "\n";
			for (item of data[ij]) {
				// 各个条目
				fileContent = fileContent + createGitHash(item, repository, issuesUrl);
			}
		}
	}
	return fileContent;
}

function createGitHash(data, repository, issuesUrl) {
	const commitRepository = repositoryFormat(repository);
	const title = removeBrackets(data.title);
	const message = data.message;
	let template = ` + ${title} ([${data.hash.slice(0, 7)}](${commitRepository + "/commit/" + data.hash}))`;
	if (data.type === "fix" && message.includes("#")) {
		let num = message.replace(/[^0-9||^#]/gi, "");
		num = num.split("#").filter((_) => _);
		num = num.map((it) => {
			return `[${it}](${issuesUrl}${it})`;
		});
		num = num.join(",");
		template += ` ,(**close** ${num})`;
	}
	template += ` - ${data.author} \n`;
	return template;
}

exports.createIfMissing = createIfMissing;
exports.writeFile = writeFile;
exports.writeFileFormat = writeFileFormat;
