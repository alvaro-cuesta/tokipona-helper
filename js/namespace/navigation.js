var Toki_Navigation = (function(window, $, undefined) {
	var History = window.History;
	
	$.fn.linkState = function(state, hrefState) {
		var self = this;
		
		self.click(function(e) {
			state = $.extend({}, History.getState().data, state||{});
			pushState(state);
			e.preventDefault();
		});
		self.bind('focus mouseenter', function(e) {
			hrefState = $.extend({}, History.getState().data, hrefState||state||{});
			
			var location = window.location,
				customDictionary = hrefState.dictionary != Toki_Config.INITIAL_STATE.dictionary,
				url = location.origin + location.pathname + hrefState.section +
					(customDictionary||hrefState.text ? '?' : '') +
					(customDictionary ?
						'dict='+encodeURIComponent(hrefState.dictionary) :
						'') +
					(customDictionary&&hrefState.text ? '&' : '') +
					(hrefState.text ? 'text='+encodeURIComponent(hrefState.text) : '');

			self.attr('href', url);
		})

		return self;
	};
	
	function replaceState(state) {
		state = $.extend({}, History.getState().data, state||{});
		var location = window.location;

		History.replaceState(
			state,
			Toki_Config.TITLE + ' (' + state.dictionary  + ')',
			location.origin + location.pathname +
				(state.dictionary != Toki_Config.INITIAL_STATE.dictionary ?
					'?dict='+encodeURIComponent(state.dictionary) :
					'')
		);
	}
	
	function pushState(state) {
		state = $.extend({}, History.getState().data, state||{});
		var location = window.location;

		History.pushState(
			state,
			Toki_Config.TITLE + ' (' + state.dictionary  + ')',
			location.origin + location.pathname +
				(state.dictionary != Toki_Config.INITIAL_STATE.dictionary ?
					'?dict='+encodeURIComponent(state.dictionary) :
					'')
		);
	}
	
	function showSection(sectionID) {
		sectionID = sectionID || History.getState().data.section;
	
		$('.section').each(function(index, section) {
			$(section).hide();
		});
		$('#' + sectionID + 'Section').show();
	}

	// Keep track of state's section and show it on page
	History.Adapter.bind(window, 'statechange', function(){
		showSection();
	});
	
	$(function() {
		var state = History.getState().data;
		var getParams = $.getQueryParams(document.location.search);
		
		// Jump to state's section
		replaceState({
			section: getParams.section || state.section,
			dictionary: getParams.dict || state.dictionary,
			text: getParams.text || state.text
		});
		
		showSection();
	});
	
	return {
		replaceState: replaceState,
		pushState: pushState,
		go: function(section) {pushState({section: section});}
	};
})(window, jQuery);