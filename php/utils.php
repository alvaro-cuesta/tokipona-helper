<?php
function endsWith($haystack, $needle) {
    $length = strlen($needle);
    if ($length == 0) {
        return true;
    }
    return (substr($haystack, -$length) === $needle);
}
function getDirectoryList($directory) {
    $results = array();
    $handler = opendir($directory);

    while ($file = readdir($handler)) {
		if ($file != "." && $file != "..") {
			$results[] = $file;
		}
    }
    closedir($handler);
    return $results;
}
function listDirectoryIfModified($directory, $filter_extension) {
	$lastModified=filemtime($directory);
	$ifModifiedSince=(isset($_SERVER['HTTP_IF_MODIFIED_SINCE']) ? $_SERVER['HTTP_IF_MODIFIED_SINCE'] : false);
	header("Last-Modified: ".gmdate("D, d M Y H:i:s", $lastModified)." GMT");
	header('Cache-Control: public');

	if (@strtotime($_SERVER['HTTP_IF_MODIFIED_SINCE']) == $lastModified) {
		   header("HTTP/1.1 304 Not Modified");
		   exit;
	}
	 
	echo "[";
	foreach (getDirectoryList($directory) as $filename) {
		if ($filter_extension && endsWith($filename, $filter_extension)) {
			echo '"' . $filename . '"';
		}
	}
	echo "]";
}
?>