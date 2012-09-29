var Toki_RichText = (function(window, $, undefined) {
	function buildTooltipContent(word, dictionary) {
		var $content = $('<div>');
		$.each(dictionary[word], function(index, element) {
			if (index%2 === 0) {
				$content.append('<span class="type">[' + element + ':]</span><br>');
			} else {
				var $meaningList = $('<div>').addClass('meaningList');
				$.each(element, function(index, word) {
					$meaningList.append('<span class="meaning">' + word + '</span>');
					if (index < (element.length - 1)) {
						$meaningList.append(', ');
					}
				});
				$content.append($meaningList);
			}
		});
		return $content;
	}

	function buildWord(word, dictionary) {
		var $word = $('<a>').text(word);
		var firstLetter = word.charAt(0);
					
		if (dictionary[word]) {
			$word.addClass('knownWord')
				.qtip($.extend({}, Toki_Config.TOOLTIP.DICTIONARY, {
					content: {
						text: buildTooltipContent(word, dictionary)
					}
				}));
		} else if (firstLetter == firstLetter.toUpperCase()) {
			$word.addClass('foreignWord')
				.qtip($.extend({}, Toki_Config.TOOLTIP.DICTIONARY, {
					content: {
						text: "Foreign word."
					}
				}));
		} else {
			$word.addClass('unknownWord');
		}
		
		return $word;
	}
	
	// Render paragraphs inside '.auto-tokipona' blocks
	$(function() {
		$('.auto-tokipona').each(function () {
			var dataDictionary = $(this).attr('data-dictionary');
			$(this).children().each(function(index, p) {
				var $p = $(p);
				Toki_Cache.fetch(
					dataDictionary || Toki_Config.INITIAL_STATE.dictionary,
					function(dictionary) {
						$p.replaceWith(
							Toki_RichText.render($p.text(), dictionary));
					}
				);
			});
		});
	});

	return {
		render: function(text, dictionary) {
			var $dest = $('<p>'),
				lines = text.split('\n');
				
			$.log('TEXT: ' + lines, 'richtext');
			$.log(dictionary, 'richtext');
				
			$.each(lines, function() {
				var line = this,
					words = line.split(' ');
				$.log(' LINE: ' + line, 'richtext');

				$.each(words, function() {
					var word = this;
					$.log('  WORD: ' + word, 'richtext');
					$dest.append(buildWord(word, dictionary));
					$dest.append(' ');
				});

				$dest.append($('<br>'));
			});
				
			$.log('----', 'richtext');
			return $dest;
		}
	};
})(window, jQuery);