(function(window, $, undefined) {$(function() {
	var MODEL_URL = 'dictionary/';

	function buildDictionaryList(dictionaryList) {
		var state = window.History.getState().data;
		var $list = $('<ul class="nobullet">');
		$.each(dictionaryList, function(index, filename) {
			var $dictionaryRadio = $('<input type="radio" name="dictionaries" value="dictionary/' + filename + '">'),
				$normalLink = $('<a href="" class="dark">' + filename + '</a>'),
				$rawLink = $('<a href="' + MODEL_URL + filename + '" class="dark">raw</a>');
			
			if (state.dictionary === MODEL_URL + filename) {
				$dictionaryRadio.attr('checked', true);
			}
			
			$dictionaryRadio.click(function() {
				Toki_Navigation.putState({dictionary: $(this).attr('value')});
			});
			
			$normalLink.linkState({
				section: 'detail',
				dictionary: MODEL_URL + filename
			}, {
				section: 'detail',
				dictionary: MODEL_URL + filename,
				text: ""
			});
			
			var $listItem = $('<li>')
				.append($dictionaryRadio)
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
		function(dictionaryList) {
			$('form#dictionaryList').html(
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