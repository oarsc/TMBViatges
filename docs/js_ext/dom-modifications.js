// version 1.0.0

(function(htmlElementPrototype){
	htmlElementPrototype.isHidden = function(){
		return this.offsetWidth === 0 && this.offsetHeight === 0;
	};

	htmlElementPrototype.isVisible = function(){
		return !this.isHidden();
	};
	
	htmlElementPrototype.show = function(display = 'block'){
		this.style.display = display;
	};

	htmlElementPrototype.hide = function(){
		this.style.display = 'none';
	};

	htmlElementPrototype.remove = function() {
		this.parentNode.removeChild(this);
	};

	htmlElementPrototype.previousSiblings = function() {
		let element = this;
		let result = [];
		while (element = element.previousElementSibling)
			result.push(element);
		return result;
	};

	htmlElementPrototype.nextSiblings = function() {
		let element = this;
		let result = [];
		while (element = element.nextElementSibling)
			result.push(element);
		return result;
	};

	htmlElementPrototype.closest = function(selector) {
		if (this == document.body){
			return undefined;
		} else {
			let parent = this.parentNode;
			return parent.matches(selector)? parent : parent.closest(selector);
		}
	};

	htmlElementPrototype.clear = function() {
		while (this.firstChild){ 
			this.removeChild(this.firstChild);
		}
	};

})(HTMLElement.prototype);


(function(domTokenListPrototype){
	const originalAdd = domTokenListPrototype.add;
	const originalRemove = domTokenListPrototype.remove;
	const originalToggle = domTokenListPrototype.toggle;
	const originalReplace = domTokenListPrototype.replace;

	function manageCallback(self, originalAction, args) {
		let listeners = self.onChangeListeners;
		originalAction = originalAction.bind(self, ...args);

		if (listeners?.length) {
			function callListeners(element, value) {
				listeners.forEach(f => f(element, value));
			}

			let initialClass = [...self];
			originalAction();

			initialClass.filter(element => !self.contains(element))
				.forEach(element => callListeners(element, false));

			self.forEach(element => {
				if (initialClass.indexOf(element) < 0)
					callListeners(element, true)
			});

		} else {
			originalAction();
		}
	}

	domTokenListPrototype.add = function() {     manageCallback(this, originalAdd,     arguments); };
	domTokenListPrototype.remove = function() {  manageCallback(this, originalRemove,  arguments); };
	domTokenListPrototype.toggle = function() {  manageCallback(this, originalToggle,  arguments); };
	domTokenListPrototype.replace = function() { manageCallback(this, originalReplace, arguments); };

	domTokenListPrototype.onChange = function(callback) {
		if (!this.onChangeListeners?.push(callback)) {
			this.onChangeListeners = [callback];
		}
	};

})(DOMTokenList.prototype);


(function(arrayPrototype){
	arrayPrototype.peek = function(fun) {
		this.forEach(fun);
		return this;
	};
})(Array.prototype);