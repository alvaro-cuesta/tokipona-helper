var Toki_Config = (function (window, $, undefined) {
	return {
		DEBUG_MODULES: ['cache'],
		TITLE: 'Toki pona reading helper',
		INITIAL_STATE: {
			section: 'tool',
			dictionary: 'dictionary/tokipona.json',
			text: ""
		},
		TOOLTIP: {
			DICTIONARY: {
				show: {
					effect: function(offset) {
						$(this).fadeIn(800, 'swing');
					}
				},
				style: {
					def: false,
					// youtube/tipsy/bootstrap/blue/dark/light/plain
					// ui-tooltip-rounded ui-tooltip-shadow
					classes: 'ui-tooltip-rounded ui-tooltip-bootstrap'
				}
			},
			NOTIFY: {
				show: {
					ready: true,
					effect: function(offset) {
						$(this).fadeIn(300, 'swing');
					}
				},
				position: {
					at: 'bottom center',
					my: 'top right'
				},
				style: {
					def: false,
					classes: 'ui-tooltip-rounded ui-tooltip-red'
				},
				events: {
					show: function(event, api) {
						setTimeout(function() {
								api.disable(true);
							}, 3000);
					}
				}
			}
		}
	};
})(window, jQuery);