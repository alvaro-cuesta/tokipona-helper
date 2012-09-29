(function(window, $, undefined) {$(function() {
	var MODEL_URL = 'dictionary/';

	function buildDictionaryList(dictionaryList) {
		var $list = $('<ul>');
		$.each(dictionaryList, function(index, filename) {
			var $normalLink = $('<a href="" class="dark">' + filename + '</a>'),
				$prettyLink = $('<a href="" class="dark">pretty</a>'),
				$rawLink = $('<a href=' + MODEL_URL + filename + '" class="dark">raw</a>');

			$normalLink.linkState({
				section: 'tool',
				dictionary: MODEL_URL + filename
			}, {
				section: 'tool',
				dictionary: MODEL_URL + filename,
				text: ""
			});
			
			$prettyLink.linkState({
				section: 'detail',
				dictionary: MODEL_URL + filename
			});
			
			var $listItem = $('<li>')
				.append($normalLink)
				.append(' (')
				.append($prettyLink)
				.append(', ')
				.append($rawLink)
				.append(')');
		
			$list.append($listItem);
		});
		return $list;
	}

	/* Fetch and build text list */
	Toki_Cache.fetch(
		MODEL_URL,
		function(dictionaryList) {
			$('div#dictionaryList').html(
				buildDictionaryList(dictionaryList));
		},
		function(data, error) {
			$('a#dictionary')
				.qtip($.extend({}, NOTIFY_TOOLTIP, {
					content: {text: 'Error loading the dictionary list.<br>' +
									'Try again in a few minutes.'}
			}));
		}
	);
});})(window, jQuery);