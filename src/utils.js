const path = require("path");

//去掉空格
function removeSpace(data, all) {
	if (all) {
		return data.replace(/\s+/g, "");
	}
	return data.replace(/^\s+|\s+$/g, "");
}
//去掉指定小括号
function removeBrackets(data) {
	if (typeof data != "string") {
		return "未知改动";
	}
	try {
		let a = /\((.+?)\)/g.exec(data);
		return a[1] + ":" + data.split(":")[1];
	} catch (error) {
		return data;
	}
}

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

function versionFormat(data) {
	const pattern = /[:\?](.*[a-z||0-9])/;
	try {
		return removeSpace(pattern.exec(data)[1], true);
	} catch (error) {
		return "无版本";
	}
}

function repositoryFormat(data) {
	if (typeof data === "string") {
		return data;
	} else {
		if (data.type === "git") {
			return data.url.split("+")[1].split(".git")[0];
		}
	}
}

exports.getPackageName = getPackageName;
exports.getPackageVersion = getPackageVersion;
exports.removeSpace = removeSpace;
exports.getCommitType = getCommitType;
exports.versionFormat = versionFormat;
exports.removeBrackets = removeBrackets;
exports.repositoryFormat = repositoryFormat;
