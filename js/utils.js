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
	}
})(window, jQuery);