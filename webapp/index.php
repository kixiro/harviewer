<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>HTTP Archive Viewer @VERSION@</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<body class="harBody">
    <div id="content" version="@VERSION@"></div>
    <!--[if IE]><script type="text/javascript" src="scripts/excanvas/excanvas.js"></script><![endif]-->
    <script src="scripts/jquery.js"></script>

    <script src="scripts/jszip/jszip.js"></script>
    <script src="scripts/jszip/jszip-utils.js"></script>
    <!--
    Mandatory in IE 6, 7, 8 and 9.
    -->
    <!--[if IE]>
    <script src="scripts/jszip/jszip-utils-ie.js"></script>
    <![endif]-->

    <script data-main="scripts/harViewer" src="scripts/require.js"></script>
    <link rel="stylesheet" href="css/harViewer.css" type="text/css"/>
    <?php include("ga.php") ?>
</body>
</html>
