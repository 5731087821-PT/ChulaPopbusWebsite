<?php
if (isset($_GET['location'])) {
    $locationToken = explode(",", $_GET['location'], 3);
    if (count($locationToken) === 2 &&
        is_numeric($locationToken[0]) &&
        is_numeric($locationToken[1])) {
        $myLocation = array(
            floatval($locationToken[0]),
            floatval($locationToken[1])
        );
    }
}
?>
<!--[if lt IE 9]> <script src="js/html5shiv.js"></script> <![endif]-->
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>CU POP BUS | Travel Around Chulalongkorn University</title>
    <link rel="shortcut icon" href="favicon.png" />
    
    <link rel="stylesheet" type="text/css" href="css/cu-popbus-map-full.css">
    <link rel="stylesheet" type="text/css" href="css/common.css">

    <script>
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

          ga('create', 'UA-42353426-4', 'auto');
          ga('send', 'pageview');
    </script>
</head>

<body class="menu-1">
    <div class="map-wrap map-wrap-large unselectable">
        <div id="error_msg" class="tracker-error-message">Initializing...</div>
        <div class="route">

            <div style="float:left;">
                <a href="index.html" title="CU Popbus App" target="_self">
                    <div class="pointer logo-mover"></div>
                    <div class="pointer logo"></div>
                </a>
                <span class="text" style="margin-left: 80px;">Chula Popbus</span>
            </div>

            <div style="float:right;">
                <span class="text">
                    Lines:
                </span>
                <span id="bus_line_visible_btn_group" style="padding-right: 40px;">
                    <strong>Loading...</strong>
                </span>
            </div>
        </div>

        <?php
        if (isset($myLocation)) {
        ?>
        <div class="map-hint">
            <div style="padding-bottom: 5px;">
                <div style="width: 20px; float: left; text-align: center; padding-right: 10px;">
                    <div class="station-hint-icon"></div>
                </div>
                Stations
            </div>
            <div>
                <div style="width: 20px; float: left; text-align: center; padding-right: 10px;">
                    <img
                        src="./images/cu-popbus-map-full/my-location.png"
                        style="height: 15px; width: auto;"
                        title="My Location Icon">
                </div>
                You're here
            </div>
        </div>
        <?php
        }
        ?>

        <div class="credit">
            <a href="http://www.thinc.in.th/">
                <img
                    src="./images/cu-popbus-map-full/thinc_logo_dark.png"
                    style="height: 30px; width: auto; margin-right: 10px;"
                    title="Thinc. Club">
            </a>
            <a href="http://www.dwaythailand.com/">
                <img
                    src="./images/cu-popbus-map-full/dway_logo.png"
                    style="height: 30px; width: auto;"
                    title="DWay GPS Positioning System">
            </a>
        </div>

        <div class="map" id="map-canvas"></div>
    </div>

    <script src="js/jquery-2.1.1.min.js"></script>
    <script src="js/greensock-v12-js/minified/TimelineMax.min.js"></script>
    <script src="js/greensock-v12-js/minified/TweenMax.min.js"></script>
    <script src="js/greensock-v12-js/minified/easing/EasePack.min.js"></script>
    <script src="//www.parsecdn.com/js/parse-1.6.12.min.js"></script>
    <!-- <script src="js/modernizr.custom.59394.js"></script> -->
    <!-- <script src="js/jquery-waypoints-master/waypoints.min.js"></script> -->
    <script src="js/pace.min.js"></script>
    <script src="js/cu-popbus-map-full-v2.min.js"></script>
    <!-- <script src="js/common.js"></script> -->

    <!--GOOGLE-MAP-API-->
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCxzFvGLcAhBaWn4OfepJzb6XFzjWqWmp4&v=3"></script>
    <script>
        $(document).ready(function() {
            PopbusTracker.create({
                mapDOM: $('#map-canvas')[0],
                lineButtonsDOM: $('#bus_line_visible_btn_group')[0],
                messageDOM: $('#error_msg')[0],
                <?php
                if (isset($myLocation)) {
                    print "myLocation: { lat: " . $myLocation[0];
                    print " ,lng: " . $myLocation[1];
                    print " },";
                }
                ?>
                zoomLevel: 16
            });
            <?php if (isset($_GET['autoRefresh']) && $_GET['autoRefresh'] === 'yes') { ?>
            setTimeout(function() { location.reload(); }, 1000 * 60 * 60 * 3);
            <?php } ?>
        });
    </script>
</body>
</html>
