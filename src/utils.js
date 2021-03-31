const path = require("path");

// URL校准根目录
function getRootPath() {
	return path.resolve(__dirname, "./../");
}

// 获取 package.json 文件
function getPackageFile() {
	return require(path.join(getRootPath(), "package.json"));
}

// 获取 package.json version
function getPackageVersion() {
	return getPackageFile().version;
}

// 获取 package.json projectName
function getPackageName() {
	return getPackageFile().name;
}

function getCommitType(message) {
	if (message.indexOf("fix") !== -1) {
		return "fix";
	}
	if (message.indexOf("feat") !== -1) {
		return "feat";
	}
	if (message.indexOf("docs") !== -1) {
		return "docs";
	}
	if (message.indexOf("style") !== -1) {
		return "style";
	}
	if (message.indexOf("refactor") !== -1) {
		return "refactor";
	}
	if (message.indexOf("perf") !== -1) {
		return "perf";
	}
	if (message.indexOf("test") !== -1) {
		return "test";
	}
	if (message.indexOf("build") !== -1) {
		return "build";
	}
	if (message.indexOf("ci") !== -1) {
		return "ci";
	}
	if (message.indexOf("revert") !== -1) {
		return "revert";
	}
	if (message.indexOf("chore") !== -1) {
		return "chore";
	}
}

exports.getPackageName = getPackageName;
exports.getPackageVersion = getPackageVersion;
exports.getCommitType = getCommitType;
