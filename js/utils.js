(function(window, $, undefined) {
	$.getQueryParams = function(qs) {
		qs = qs.split("+").join(" ");
		var params = {},
			tokens,
			re = /[?&]?([^=]+)=([^&]*)/g;

		while (tokens = re.exec(qs)) {
			params[decodeURIComponent(tokens[1])]
				= decodeURIComponent(tokens[2]);
		}

		return params;
	}
	$.log = function(message, module) {
		if (console && (($.inArray(module, Toki_Config.DEBUG_MODULES) >= 0) || module === undefined)) {
			console.log(message);
		}
	};
	$.fn.log = function(module) {
		if (console && (($.inArray(module, Toki_Config.DEBUG_MODULES) >= 0) || module === undefined)) {
			console.log(this);
		}
		
		return this;
	};
	$.fn.dir = function(deep) {
		if (console){
			console.log(this + ':');
			for (property in this) {
				if (deep || this.hasOwnProperty(property)) {
					console.log(property);
				}
			}
		}
		return this;
	};
})(window, jQuery);