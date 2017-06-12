<!doctype html>
<html>
<head>
    <title>HAR Viewer - Service Loader</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <style type="text/css">
    body {
        overflow-y:auto;
        background-color: rgb(240, 243, 244);
        margin: 0;
        padding: 0;
        font-size: 10px;
        font-family: Lucida Grande,Tahoma,sans-serif;
    }
    #content {
        width:100%;
    }
    #content td {
        vertical-align:middle;
        text-align:center;
    }
    #fullPreview {
        font-size: 10px;
        text-decoration:none;
    }
    #loadButton {
        margin-bottom: 10px;
    }
    </style>
</head>
<body onload="onPageLoad()">

<!-- Initial content of the loader is a button that must be clicked to get
     the HAR service. -->
<table id="content" version="master" border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td>
            <button id="loadButton" onclick="onHARLoad()">Load HAR</button>
            <br/>
            <a id="fullPreview" target="_tab">Full Preview</a>
        </td>
    </tr>
</table>

<!-- Use CDATA section so, this file can be processed by XSLT (e.g. to remove
     comments and reduce size). -->
<script type="text/javascript">
function getURLParameter(name)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if (pair[0] == name)
            return pair[1];
    }
    return null;
}
var content = document.getElementById("content");
var serviceName = getURLParameter("service");
var path = getURLParameter("path");
var expand = getURLParameter("expand");
function onPageLoad()
{
    var height = 0;
    if (!window.innerHeight) { //IE
        if (!(document.documentElement.clientHeight == 0)) //strict mode 
            height = document.documentElement.clientHeight;
        else //quirks mode 
            height = document.body.clientHeight;
    } else //w3c 
        height = window.innerHeight;

    content.style.height = height + "px";

    var fullPreview = document.getElementById("fullPreview");
    var fullLink = "index.php?path=" + getURLParameter("path");
    fullPreview.setAttribute("href", fullLink);
}
function onHARLoad()
{
    content.style.display = "none";
    var url = serviceName + ".php?path=" + path + "&expand=" + (expand ? "true" : "false");
    location.href = url;
}
</script>


<!-- Google Analytics -->
<script>
// Enable Google Analytics (for publicly hosted instances) in ant.properties file
// by setting GOOGLE-ANALYTICS-PROFILE property to ID of your profile.
var googleAnalyticsProfile = "UA-82884352-1";
if (googleAnalyticsProfile && googleAnalyticsProfile.charAt(0) !== "@") {

    window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
    ga('create', googleAnalyticsProfile, 'auto');
    ga('send', 'pageview');

}
</script>
<script async src='https://www.google-analytics.com/analytics.js'></script>
<!-- End Google Analytics -->


</body>
</html>
