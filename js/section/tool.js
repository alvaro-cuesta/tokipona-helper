(function(window, $, undefined) {$(function() {
	var History = window.History;
	
	var $textarea = $('form#source textarea'),
		$destination = $('div#dest'),
		state = History.getState().data;
	
	function updateTaggedText() {
		state = History.getState().data;

		Toki_Cache.fetch(
			state.dictionary,
			function(dictionary) {
				$textarea.attr('disabled', false);
				$destination.html(
					Toki_RichText.render($textarea.val(), dictionary));
				$destination.show();
			},
			function(data, error) {
				$('a#dictionary')
					.qtip($.extend({}, Toki_Config.NOTIFY_TOOLTIP, {
						content: {
							text: 'Error loading selected dictionary.<br>' +
								  'Try again in a few minutes.'
						}
					}));
				$textarea.attr('disabled', true);
				$destination.hide();
			}
		);		
	}
	
	// Update tagged text
	$textarea.val(state.text);
	updateTaggedText();

	// Link's href should reflect text changes
	$('a#tokiLink').linkState();	

	// Update tagged text on textarea change
	$textarea.bind('cut paste keyup', updateTaggedText);

	// Keep track of state's section and load dictionary/text
	History.Adapter.bind(window, 'statechange', function(){
		state = History.getState().data;
		
		// Synchronize textarea with state
		if (state.section != 'tool') { // If we're swtiching OUT
			Toki_Navigation.pushState({text: $textarea.val()}, true);
		} else { // Switching IN
			$textarea.val(state.text);
		}

		updateTaggedText();
	});
});})(window, jQuery);