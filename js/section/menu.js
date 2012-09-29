(function(window, $, undefined) {$(function() {
	/* Enable links AJAX navigation */
	$('ul.menu a').each(function() {
		$(this).linkState({section: $(this).attr('id')});
	});
		
	/* Show help notification */
	$('a#help').qtip($.extend({}, Toki_Config.TOOLTIP.NOTIFY, {
		content: {text: 'Learn here!'}
	}));
});})(window, jQuery);