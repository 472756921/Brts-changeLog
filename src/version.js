const fs = require("fs");
const path = require("path");
const { writeFile } = require("./file-write");

function getVersion() {
	const pkgPath = path.resolve(process.cwd(), "package.json");
	const contents = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
	if (contents.version) {
		return contents.version;
	} else {
		contents.version = "1.0.0";
		writeFile(pkgPath, JSON.stringify(contents));
		return "1.0.0";
	}
}

module.exports = getVersion;
