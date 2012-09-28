(function(window, $, undefined) {$(function() {
	var MODEL_URL = 'text/';

	function buildTextList(textList) {
		var $list = $('<ul>');

		$.each(textList, function(index, filename) {
			var $normalLink = $('<a href="" class="dark">' + filename + '</a>'),
				$rawLink = $('<a href="' + MODEL_URL + filename + '" class="dark">raw</a>');

			$normalLink.linkState(); // TODO
			
			var $listItem = $('<li>')
				.append($normalLink)
				.append(' (')
				.append($rawLink)
				.append(')');
		
			$list.append($listItem);
		});
		
		return $list;
	}
	
	/* Fetch and build text list */
	Toki_Cache.fetch(
		MODEL_URL,
		function (textList) {
			$('div#textList')
				.html(buildTextList(textList));
		},
		function (data, error) {
			$('a#text').qtip($.extend({}, NOTIFY_TOOLTIP, {
				content: {
					text: 'Error loading the text list.<br>' +
						  'Try again in a few minutes.'
				}
			}));
		}
	);
});})(window, jQuery);