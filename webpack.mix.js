const mix = require('laravel-mix');
const fs = require("fs");


/**
 * Returns an array of paths to files in the 'dir' directory with the '_extension' extension
 * @param {[]} [files_] You can pass an existing array, new entries will be appended to the end
 * @returns {string[]}
 */
function getFiles(dir, _extension, files_ = []){
	files_ = files_ || [];
	let files = fs.readdirSync(dir);
	for (let i in files){
		let name = dir + '/' + files[i];
		if (fs.statSync(name).isDirectory()){
			getFiles(name, _extension, files_);
		} else {
			if(name.endsWith(_extension)){
				files_.push(name);
			}
		}
	}
	return files_;
};

let Pages = {
	handleTypeScript = () => {
		for(item of getFiles("resources/views/pages", ".ts")) {
			let itemName = item.split("/");
			mix.ts(item, "public/scripts/" + itemName[itemName.length - 1].split(".")[0]+".js");
		}
	},
	handleStyles = () => {
		for(item of getFiles("resources/views/pages", ".scss")) {
			let itemName = item.split("/");
			mix.sass(item, "public/styles/");
		}
	},
	handleAll = () => {
		Pages.handleStyles();
		Pages.handleTypeScript();
	}
}

let Templates = {
	handleTypeScript = () => {
		for(item of getFiles("resources/views/templates", ".ts")) {
			let itemName = item.split("/");
			mix.ts(item, "public/scripts/" + itemName[itemName.length - 1].split(".")[0]+".js");
		}
	},
	handleStyles = () => {
		for(item of getFiles("resources/views/templates", ".scss")) {
			let itemName = item.split("/");
			mix.sass(item, "public/styles/");
		}
	},
	handleAll = () => {
		Pages.handleStyles();
		Pages.handleTypeScript();
	}
}

Pages.handleAll();
Templates.handleAll();

if (mix.inProduction()) {
    mix.version();
}

mix.disableNotifications();
