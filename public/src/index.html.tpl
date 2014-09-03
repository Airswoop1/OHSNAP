<!-- index.html -->
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="description" content="An easy way to apply for SNAP (food stamps) in nyc online." />
    <meta name="revisit-after" content="15 days">
    <META HTTP-EQUIV=”Cache-control” CONTENT=”private”>
    <link rel="icon" type="image/png" href="/images/logo_bolt.png" />

    <!-- CSS -->
    <link href='https://fonts.googleapis.com/css?family=Roboto:400,100italic,100,300,300italic,400italic,500,500italic,700,700italic,900,900italic' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="css/stylesheet.min.css">
    <link rel="stylesheet" href="css/modal.css">

    <!-- JS-->
    <script src="js/angular-file-upload-shim.js"></script>



    <script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-52493533-1', 'auto');
        ga('require', 'displayfeatures');
    </script>





    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=2, user-scalable=1">

</head>

<!-- apply our angular app -->
<body ng-app="formApp">
<!-- tag manager
    15s check
    page scrolling check -->
<!-- Google Tag Manager -->
<noscript><iframe src="//www.googletagmanager.com/ns.html?id=GTM-N4PWKL"
                  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        '//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-N4PWKL');</script>

<!-- End Google Tag Manager -->
<h5 class="mobile-notice">easyfoodstamps.com is designed specifically for mobile. Learn more at <a
        href="http://joinpropel.com">joinpropel.com</a></h5>
<div class="container">

    <!-- views will be injected here -->
    <div ui-view class="main-ui-view"></div>

</div>
</body>
<script src="<%= angular %>"></script>
<script src="<%= angular_ui_router %>"></script>
<script src="<%= angular_animate %>"></script>
<script src="<%= angular_touch %>"></script>
<script src="<%= jquery_1_11_1 %>"></script>
<script src="js/sig/jSignature.js"></script>

<script src="js/angular-file-upload.min.js"></script>
<script src="js/ui-bootstrap.min.js"></script>
<!--<script src="js/jquery.min.js"></script>-->
<script src="js/services/NoContactModalService.js"></script>
<script src="js/filters/filters.min.js"></script>
<script src="js/Controllers/controller.min.js"></script>
<script src="js/directives/directives.min.js"></script>
<script src="js/factories/factories.min.js"></script>
<script src="js/app.js"></script>




</html>