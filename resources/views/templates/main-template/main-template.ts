export default class MainTemplate {
	domElement: HTMLElement;
	constructor(_domElement: HTMLElement = document.querySelector('.site')) {
		this.domElement = _domElement;
	}
}
