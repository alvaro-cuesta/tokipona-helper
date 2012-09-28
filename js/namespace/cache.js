var Toki_Cache = (function(window, $, undefined) {
	var cache = {};
	function fetch(url, successHandler, errorHandler) {
		if (cache[url]) {
			if (successHandler)
				successHandler(cache[url]);
			return;
		}
		$.ajax({
			url: url,
			dataType: 'json',
			success: function(data) {
				$.log(data, 'cache');
				cache[url] = data;
				if (successHandler)
					successHandler(data);
			},
			error: function(data, error) {
				$.log(data, 'cache');
				$.log(error, 'cache');
				if (errorHandler)
					errorHandler(data, error);
			}
		});
	}
	
	return {
		fetch: fetch
	};
})(window, jQuery, undefined);