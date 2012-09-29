var Toki_Navigation = (function(window, $, undefined) {
	var History = window.History;
	
	function putState(state, replace) {
		state = $.extend({}, History.getState().data, state||{});
		var location = window.location,
			action = replace ? History.replaceState : History.pushState;

		action(
			state,
			Toki_Config.TITLE + ' (' + state.dictionary  + ')',
			location.origin + location.pathname +
				(state.dictionary != Toki_Config.INITIAL_STATE.dictionary ?
					'?dict='+encodeURIComponent(state.dictionary) :
					'')
		);
	}
	
	$.fn.linkState = function(state, hrefState) {
		var self = this;
		
		self.click(function(e) {
			state = $.extend({}, History.getState().data, state||{});
			putState(state);
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
		var state = History.getState().data,
			getParams = $.getQueryParams(document.location.search);
		
		// Jump to state's section
		putState({
			section: getParams.section || state.section,
			dictionary: getParams.dict || state.dictionary,
			text: getParams.text || state.text
		}, true);
		
		showSection();
	});
	
	return {
		putState: putState,
		go: function(section) {putState({section: section});}
	};
})(window, jQuery);