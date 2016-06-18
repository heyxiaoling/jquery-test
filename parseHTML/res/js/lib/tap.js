define(function(){
	// 当前环境支持的点击事件
	var $doc =$(document)
	var tapEvent = (function() {
    	return "createTouch" in document ? 'tap':'click'
  	})()

  	// 禁止链接默认点击事件
	$doc.on('click', 'a.preventlink, a.taplink', function(event) {
    	event.preventDefault()
    	event.stopPropagation()
  	})

	// 点击.taplink转场
	$doc.on(tapEvent, '.taplink', function(event) {
		var $currentTarget = $(event.currentTarget),
		    $target = $(event.target),
		    hash = $currentTarget.attr('href') || $currentTarget.attr('data-href')
		if($target.closest('.notaplink').length)
		  return $doc.trigger('video:remove', {video:app.cache.curVideo})

		$currentTarget.trigger('spa:a', {hash:hash})

		// event.preventDefault()// event.stopPropagation()
	})
	$doc.on('spa:a', function(event, options) {
		window.location.href = options.hash
	})
	// 防止点击穿透
	if(tapEvent =='tap') {
		$doc.on('touchstart', 'a', function(event) {
		  var $target =$(event.currentTarget)
		  $target.data('taptime', +newDate())
		})

		$doc.on('click', 'a', function(event) {
		  var $target =$(event.currentTarget),
		      taptime =$target.data('taptime')

		  if(!taptime || (+newDate() - taptime >500)) {
		    event.preventDefault()
		    event.stopPropagation()
		  }
		})
	}

	function getHash(url) {
		url = url || location.href
		return url.replace(/^[^#]*#?\/?(.*)\/?$/, '$1')
	}

	function parseQueryString(str) {
	    if(str == "" || typeof str == "undefined") {
	        str = location.href.split("?");
	        str = str.pop();
	    }
	    var reg = /(([^?&=]+)(?:=([^?&=]*))*)/g;
	    var result = {};
	    var match;
	    var key;
	    var value;
	    while (match = reg.exec(str)) {
	        key = match[2];
	        value = match[3] || '';
	        result[key] = decodeURIComponent(value);
	    }
	    return result;
	}

	// 阻塞鼠标和手势操作
	function preventEventHandle(evnet) {
		event.stopPropagation()
		event.preventDefault()
	}
});