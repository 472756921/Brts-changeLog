const accessSync = require("fs-access").sync;
const fs = require("fs");
const chalk = require("chalk");

function createIfMissing(args) {
	try {
		accessSync(args.infile, fs.F_OK);
	} catch (err) {
		if (err.code === "ENOENT") {
			writeFile(args.infile, "\n");
			console.log(chalk.green(`created file ${filePath} in ${__dirname}`));
		}
	}
}

function writeFile(filePath, content) {
	fs.writeFileSync(filePath, content, "utf8");
}

exports.createIfMissing = createIfMissing;
exports.writeFile = writeFile;
