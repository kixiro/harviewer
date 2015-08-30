<!doctype html>
<?php
require_once("config.php");
?>
<html>
<head>
  <title>testPostMessage.html.php</title>
</head>
<body>

<!-- Use postMessage: as the protocol, and pass a postMessage id that you expect to come back in the messages from Har Viewer -->
<div id="previewPostMessageOne" class="har" height="150" data-har="postMessage:ID-one"></div>

<!-- Use postMessage: as the protocol, and pass a postMessage id that you expect to come back in the messages from Har Viewer -->
<div id="previewPostMessageTwo" class="har" height="150" data-har="postMessage:ID-two"></div>

<script>
var simpleHar = <?php include "hars/simple.har" ?>;
var urlParamsHar = <?php include "hars/url-params.har" ?>
</script>

<script>
window.addEventListener("message", function(evt) {
    if ("undefined" === typeof HARViewer) return;

    var origin = evt.origin;

    // Do origin checks here if necessary
    // if (origin !== "https://expected") throw new Error(...)

    var api = HARViewer.initPostMessage(evt);

    if (api.isRequestForHar("ID-one")) {
        api.sendHar(simpleHar);
        api.sendHar(urlParamsHar);
        api.sendDone();
    } else if (api.isRequestForHar("ID-two")) {
        // reverse order to ID-one
        api.sendHar(urlParamsHar);
        api.sendHar(simpleHar);
        api.sendDone();
    }
}, false);

(function() {
    var har = document.createElement("script");
    har.src = "<?php echo $harviewer_base ?>har.js";
    har.setAttribute("id", "har");
    har.setAttribute("async", "true");
    document.documentElement.firstChild.appendChild(har);
})();
</script>

</body>
</html>
