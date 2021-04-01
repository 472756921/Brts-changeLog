const fs = require("fs");
const path = require("path");
const { writeFile } = require("./file-write");
const { removeSpace } = require("./utils");
const inquirer = require("inquirer");

function getVersion() {
	const pkgPath = path.resolve(process.cwd(), "package.json");
	const contents = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
	if (contents.version) {
		return contents.version;
	} else {
		contents.version = "v1.0.0";
		writeFile(pkgPath, JSON.stringify(contents));
		return "v1.0.0";
	}
}

function getRepository(resolve) {
	const pkgPath = path.resolve(process.cwd(), "package.json");
	const contents = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
	if (contents.repository) {
		resolve(contents.repository);
		return contents.repository;
	} else {
		return inquirer
			.prompt([
				{
					type: "input",
					name: "repository",
					message: "请输入项目仓库地址：",
					validate(input) {
						if (!input) {
							return "仓库地址不能为空";
						}
						return true;
					},
				},
			])
			.then(({ repository }) => {
				contents.repository = repository;
				writeFile(pkgPath, JSON.stringify(contents));
				resolve(repository);
				return repository;
			});
	}
}

function getissuesUrl() {
	const pkgPath = path.resolve(process.cwd(), "package.json");
	const contents = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
	if (contents.issuesUrl) {
		return contents.issuesUrl;
	} else {
		return contents.repository + "/issues/";
	}
}

exports.getVersion = getVersion;
exports.getRepository = getRepository;
exports.getissuesUrl = getissuesUrl;
