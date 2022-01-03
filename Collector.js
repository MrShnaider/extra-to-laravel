// process.argv
const fs = require("fs");

class Args {
	static instance = null;
	static STANDART_NUMBER_OF_PROCESS_ARGS_LEN = 2;
	#args = [];
	index = 0;

	constructor() {
		this.#args = process.argv;
		this.STANDART_NUMBER_OF_PROCESS_ARGS_LEN = 2;
		for(let i = 0; i < this.STANDART_NUMBER_OF_PROCESS_ARGS_LEN; i++){
			this.#args.shift();
		}
		this.index = 0;
	}

	static getInstance = () => {
		if(this.instance == null) {
			this.instance = new Args();
		}
		return this.instance;
	}

	hasMore = () => {
		return this.index < this.#args.length;
	}

	getNextArg = () => {
		this.index++;
		if(!this.hasMore()) {
			throw new Error("There are not enough arguments");
		}
		return this.#args[this.index];
	}

	argsIsBlank = () => {
		return this.#args.length == 0;
	}
}

let args = Args.getInstance();

/**
 * @todo
 */
function printHelp() {
	printMessage("new:block <name> \t Create new block in views/blocks");
	printMessage("new:page <name> \t Create new page in views/pages");
	printMessage("new:template <name> \t Create new template in views/templates");
}

function printMessage(str) {
	console.log("> " + str);
}

class Collector {
	static pathToCollector = "./Collector/";
	static placeholder = "CollectorName";
	static placeholderRegExp = new RegExp(`${Collector.placeholder}`, "g");
}

class IPhpScssTs {
	static getPHP() {throw new Error("Interface function isn't implement")};
	static getSCSS() {throw new Error("Interface function isn't implement")};
	static getTS() {throw new Error("Interface function isn't implement")};
}

class Block extends IPhpScssTs {
	static pathToSourceDir = Collector.pathToCollector + 'block/';
	static pathToViewsDir = "./resources/views/blocks/";
	static newBlock(name = "") {
		let newBlockDir = `${this.pathToViewsDir}${name}`;
		fs.mkdirSync(newBlockDir);
		fs.appendFileSync(`${newBlockDir}/${name}.blade.php`, this.getPHP(name));
		fs.appendFileSync(`${newBlockDir}/${name}.scss`, this.getSCSS(name));
		fs.appendFileSync(`${newBlockDir}/${name}.ts`, this.getTS(name));
	}
	static getPHP(name = "") {
		let str = fs.readFileSync(this.pathToSourceDir + "block.blade.php").toString();
		str = str.replace(Collector.placeholderRegExp, name);
		return str;
	}
	static getSCSS(name = "") {
		let str = fs.readFileSync(this.pathToSourceDir + "block.scss").toString();
		str = str.replace(Collector.placeholderRegExp, name);
		return str;
	}
	static getTS(name = "") {
		let str = fs.readFileSync(this.pathToSourceDir + "block.ts").toString();
		str = str.replace(Collector.placeholderRegExp, camelize(name));
		return str;
	}
}

class Page extends IPhpScssTs {
	static pathToSourceDir = Collector.pathToCollector + 'page/';
	static pathToViewsDir = "./resources/views/pages/";
	static newPage(name = "") {
		let newPageDir = `${this.pathToViewsDir}${name}`;
		fs.mkdirSync(newPageDir);
		fs.appendFileSync(`${newPageDir}/${name}.blade.php`, this.getPHP(name));
		fs.appendFileSync(`${newPageDir}/${name}.scss`, this.getSCSS(name));
		fs.appendFileSync(`${newPageDir}/${name}.ts`, this.getTS(name));
	}
	static getPHP(name = "") {
		let str = fs.readFileSync(this.pathToSourceDir + "page.blade.php").toString();
		str = str.replace(Collector.placeholderRegExp, name);
		return str;
	}
	static getSCSS(name = "") {
		let str = fs.readFileSync(this.pathToSourceDir + "page.scss").toString();
		str = str.replace(Collector.placeholderRegExp, name);
		return str;
	}
	static getTS(name = "") {
		let str = fs.readFileSync(this.pathToSourceDir + "page.ts").toString();
		str = str.replace(Collector.placeholderRegExp, camelize(name));
		return str;
	}
}

class Template extends IPhpScssTs {
	static pathToSourceDir = Collector.pathToCollector + 'template/';
	static pathToViewsDir = "./resources/views/templates/";
	static newTemplate(name = "") {
		let newTemplateDir = `${this.pathToViewsDir}${name}`;
		fs.mkdirSync(newTemplateDir);
		fs.appendFileSync(`${newTemplateDir}/${name}.blade.php`, this.getPHP(name));
		fs.appendFileSync(`${newTemplateDir}/${name}.scss`, this.getSCSS(name));
		fs.appendFileSync(`${newTemplateDir}/${name}.ts`, this.getTS(name));
	}
	static getPHP(name = "") {
		let str = fs.readFileSync(this.pathToSourceDir + "template.blade.php").toString();
		str = str.replace(Collector.placeholderRegExp, name);
		return str;
	}
	static getSCSS(name = "") {
		let str = fs.readFileSync(this.pathToSourceDir + "template.scss").toString();
		str = str.replace(Collector.placeholderRegExp, name);
		return str;
	}
	static getTS(name = "") {
		let str = fs.readFileSync(this.pathToSourceDir + "template.ts").toString();
		str = str.replace(Collector.placeholderRegExp, camelize(name));
		return str;
	}
}

function camelize(str = "") {
	let arr = str.split("-");
	let capital = arr.map(item => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase());
	return capital.join("");
}

// main

if(args.argsIsBlank()) {
	printHelp();
	return;
}

while(args.hasMore()){
	if(args.getNextArg() == "new:block") {
		Block.newBlock(args.getNextArg());
	} else if(args.getNextArg() == "new:page") {
		Page.newPage(args.getNextArg());
	} else if(args.getNextArg() == "new:template") {
		Template.newTemplate(args.getNextArg());
	}
}

