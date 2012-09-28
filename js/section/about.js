(function(window, $, undefined) {$(function() {
	/* Attach current URL to validator links */
	var linkURL = encodeURIComponent(location.origin + location.pathname);
	$('a#validHTML').attr('href',
		'http://validator.w3.org/check?uri=' + linkURL);
	$('a#validCSS').attr('href',
		'http://jigsaw.w3.org/css-validator/validator?uri=' + linkURL);
});})(window, jQuery);