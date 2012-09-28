(function(window, $, undefined) {$(function() {
	/* Render example texts */
	Toki_Cache.fetch(
		Toki_Config.INITIAL_STATE.dictionary,
		function(dictionary) {
			$('#example1').append(
				Toki_RichText.render('mi sona tan ni: sina lukin e sitelen mi', dictionary));
			$('#example2').append(
				Toki_RichText.render('flux capacitor', dictionary));
			$('#example3').append(
				Toki_RichText.render('jan Awalo tan ma Epanja', dictionary));
		}
	);
});})(window, jQuery);