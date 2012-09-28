(function(window, $, undefined) {$(function() {
	/* Enable links AJAX navigation */
	$('div#menu > a').click(function(e){
		e.preventDefault();
		Toki_Navigation.go($(this).attr('id'));
	});
		
	/* Show help notification */
	$('a#help').qtip($.extend({}, Toki_Config.TOOLTIP.NOTIFY, {
		content: {
			text: 'Learn here!'
		}
	}));
});})(window, jQuery);