<?php
session_start();
echo "Hi: " . $_SESSION['user_name'];
//$pid_fresh = $_SESSION['user_name'];
?>
<!DOCTYPE html>
<!--[if IE 6]-->
<html id="ie6" lang="en-US">
<!--[if IE 7]-->
<html id="ie7" lang="en-US">
<!--[if IE 8]-->
<html id="ie8" lang="en-US">
<!--[if !(IE 6) | !(IE 7) | !(IE 8)]-->
<html lang="en-US">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Get Started | Wrestore</title>

    <!--     Styles    -->
    <link rel="profile" href="http://gmpg.org/xfn/11" />
    <!--    <link rel="stylesheet" type="text/css" media="all" href="http://wrestore.iupui.edu/wp-content/themes/wrestore/style.css" />-->
    <link rel="stylesheet" type="text/css" href="../css/style1.css"/>
    <link rel='stylesheet' type='text/css' href='http://fonts.googleapis.com/css?family=Oswald:400,300' >
    <!--    <link rel= "pingback" type='text/css' href="http://wrestore.iupui.edu/xmlrpc.php" />-->
    <!--[if IE]-->
    <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <!--[if lt IE 9]-->
    <!--    <script src="http://wrestore.iupui.edu/wp-content/themes/wrestore/js/html5.js" type="text/javascript"></script>-->
    <!--    <link rel="alternate" type="application/rss+xml" title="Wrestore &raquo; Feed" href="http://wrestore.iupui.edu/feed/" />-->
    <!--    <link rel="alternate" type="application/rss+xml" title="Wrestore &raquo; Comments Feed" href="http://wrestore.iupui.edu/comments/feed/" />-->
    <!--    <link rel="alternate" type="application/rss+xml" title="Wrestore &raquo; Get Started Comments Feed" href="http://wrestore.iupui.edu/visualize-design/get-started/feed/" />-->

    <!--    Scripts    -->
    <script type="text/javascript">
        // window._wpemojiSettings = {"baseUrl":"http:\/\/s.w.org\/images\/core\/emoji\/72x72\/","ext":".png","source":{"concatemoji":"http:\/\/wrestore.iupui.edu\/wp-includes\/js\/wp-emoji-release.min.js?ver=4.3.19"}};
        // !function(a,b,c){function d(a){var c=b.createElement("canvas"),d=c.getContext&&c.getContext("2d");return d&&d.fillText?(d.textBaseline="top",d.font="600 32px Arial","flag"===a?(d.fillText(String.fromCharCode(55356,56812,55356,56807),0,0),c.toDataURL().length>3e3):(d.fillText(String.fromCharCode(55357,56835),0,0),0!==d.getImageData(16,16,1,1).data[0])):!1}function e(a){var c=b.createElement("script");c.src=a,c.type="text/javascript",b.getElementsByTagName("head")[0].appendChild(c)}var f,g;c.supports={simple:d("simple"),flag:d("flag")},c.DOMReady=!1,c.readyCallback=function(){c.DOMReady=!0},c.supports.simple&&c.supports.flag||(g=function(){c.readyCallback()},b.addEventListener?(b.addEventListener("DOMContentLoaded",g,!1),a.addEventListener("load",g,!1)):(a.attachEvent("onload",g),b.attachEvent("onreadystatechange",function(){"complete"===b.readyState&&c.readyCallback()})),f=c.source||{},f.concatemoji?e(f.concatemoji):f.wpemoji&&f.twemoji&&(e(f.twemoji),e(f.wpemoji)))}(window,document,window._wpemojiSettings);
    </script>
    <style type="text/css">
        img.wp-smiley,
        img.emoji {
            display: inline !important;
            border: none !important;
            box-shadow: none !important;
            height: 1em !important;
            width: 1em !important;
            margin: 0 .07em !important;
            vertical-align: -0.1em !important;
            background: none !important;
            padding: 0 !important;
        }
    </style>
    <script type='text/javascript' src='http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js?ver=4.3.19'></script>

    <!-- More Styles -->
    <!--    <link rel='canonical' href='http://wrestore.iupui.edu/visualize-design/get-started/' />-->
    <!--    <link rel='shortlink' href='http://wrestore.iupui.edu/?p=78' />-->

</head>

<body>
<!--[if lte IE 6]><script src="js/ie6/warning.js"></script><script>window.onload=function(){e("js/ie6/")}</script><![endif]-->
<div class="wrapper">
    <!-- row 1/5: WRESTORE header -->
    <div class="row row-1">
        <header id="siteHeader">

            <div>
                <hgroup>
                    <h1><a href="/">WRESTORE</a></h1>
                    <h2>Watershed REstoration using Spatio-Temporal Optimization of REsources</h2>
                    <h3>Visualize & Design Your Watershed Landscape</h3>
                </hgroup>
            </div>

        </header>
    </div><!-- end row 1: Main Site Header -->

    <!-- row 2/5: MENU Nav-bar -->
    <div id="navRow" class="row row-2" > <!-- Nav Row -->
        <nav id="access" role="navigation">
            <div class="menu">
                <div class="menu">
                    <ul>
                        <li class="page_item page-item-29"><a href="../../index.html">Home Page</a></li>
                        <li class="page_item page-item-4 page_item_has_children"><a href="../resources.html">Resources</a>
                            <ul class='children'>
                                <li class="page_item page-item-36"><a href="../how_it_works.html">How does Wrestore work?</a></li>
                                <li class="page_item page-item-38"><a>Best Management Practices</a>
                                    <ul class="subdropdown">
                                        <li class="subs"><a style="width: 190px" href="../best_management_practices.html">Agricultural Management Practices</a></li>
                                        <li class="subs"><a style="width: 190px" href="../urban_bmp.html">Urban Management Practices</a></li>
                                    </ul>
                                </li>
                                <li class="page_item page-item-40"><a href="../conservation_programs.html">Conservation Programs</a></li>
                            </ul>
                        </li>
                        <li class="page_item page-item-6 page_item_has_children"><a>Projects</a>
                            <ul class='children'>
                                <!--                                <li class="page_item page-item-36"><a href="http://wrestore.iupui.edu/resources/eagle-creek-watershed/">Eagle Creek Watershed</a>-->
                                <li class="page_item page-item-36"><a>Eagle Creek Watershed</a>
                                    <ul class="subdropdown">
                                        <li class="subs"><a href="../ecw_features.html">Features</a></li>
                                        <!--                                        <li class="subs"><a href="../model_ecw/g2c.php">Get Started</a></li>-->
                                        <li class="subs"><a href="../get_started_ecw.html">Get Started</a></li>
                                    </ul>
                                </li>
                                <li class="page_item page-item-36"><a>Dairy McKay Watershed</a>
                                    <ul class="subdropdown">
                                        <li class="subs"><a href="../dmw_features.html">Features</a></li>
                                        <li class="subs"><a href="../get_started_dmw.html">Get Started</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>

                        <li class="page_item page-item-8"><a href="../publications.html">Publications</a></li>
                        <!--                        <li class="page_item page-item-10 page_item_has_children"><a href="http://wrestore.iupui.edu/partners/">Partners</a><ul class='children'><li class="page_item page-item-15"><a href="http://wrestore.iupui.edu/partners/faculty/">Faculty</a></li><li class="page_item page-item-17"><a href="http://wrestore.iupui.edu/partners/collaborators/">Collaborators</a></li><li class="page_item page-item-19"><a href="http://wrestore.iupui.edu/partners/students/">Students</a></li></ul></li>-->
                        <li class="page_item page-item-12"><a href="../contact.html">Contact</a></li>
                    </ul>
                </div>
            </div>
        </nav>
        <nav id="loginNav">
            <a style="text-transform: none"><?php echo $_SESSION['user_name'] ?>&nbsp &nbsp</a> | <a href="logout.php">&nbsp &nbsp Log out</a>
        </nav>
    </div><!-- End Nav Row -->

    <!--  To register LULC information  -->
    <!-- <p> Set / Modify your land-use information <a href="../extra_info/insert_lulc_info.php">here</a> (Inactive)</p> -->
    <!--  To register EXPERIENCE information  -->
    <!-- <p> Set / Modify your Experience information <a href="../extra_info/insert_exp_info.php">here</a> (Inactive)</p> -->

    <div class="row mainFrameRightBck" id="mainFrame">
        <div id="mainCol">
            <section id="content">
                <header id="pageHeader">
                    <h1>Login</h1>
                </header>
                <br>

               <h3>Experiment 1</h3>
                <p style="margin-left: 100px;">
                  This experiment is not available until Oct 13th:
                  <a href="../login/login_ok.php" title="Back">Back</a>
                </p>
                <p></p>

            </section>
            <button onclick="window.location.href = 'logout.php';">LogOut</button>

        </div><!-- end main content column -->

        <!-- Right Side Column -->
        <div id="sideCol">
            <div class="textwidget"><h1>Get Involved</h1>
                <p>We provide web-based tools for visualizing watershed and designing land use and runoff management alternatives on the landscape.</p>
                <div class="barButton"><a href="../how_it_works.html">How does Wrestore work?</a></div>
                <div class="barButton"><a href="../partners_v2.html">Our Team</a></div>
                <div class="barButton"><a href="../resources.html">Learn about our tools</a></div>
                <div class="barButton"><a href="../contact.html">Questions? Contact us</a></div>
            </div>
        </div>
        <div class="clear"></div>
    </div><!-- end mainFrame -->

    <div class="row footer">
        <div id="sponsorsCon">
            <h2>Partners</h2>
            <a href="http://oregonstate.edu/" target="_blank"><img src="../img/OSU_logo/OSU_horizontal_2C_O_over_B.png" width="220" height="76" alt="Oregon State University" class="sponsorsLogos"></a>
            <a href="http://www.iupui.edu/" target="_blank"><img src="../img/IUPUI_logo/iu_logo_tr3_1500x500.gif" width="225" height="75" alt="IUPUI" class="sponsorsLogos"></a>
            <a href="http://www.nsf.gov/" target="_blank"><img src="../img/logoNsf.gif" alt="NSF" width="75" height="76" class="sponsorsLogos"></a>
        </div><!-- end sponsorsCon -->
        <div id="utilityCon">
            <!--            <div class="contactLinks"><a href="/">Home</a> | <a href="http://wrestore.iupui.edu/contact/">Contact</a> | <a href="http://wrestore.iupui.edu/model/login.php">Login</a></div>-->
            <div class="connectCon">
            </div>
            <div class="copyright">
                &copy; WRESTORE - a NSF funded project
            </div>
        </div>
    </div>
</div><!-- end Wrapper -->

<!--<script type='text/javascript' src='http://wrestore.iupui.edu/wp-includes/js/comment-reply.min.js?ver=4.3.19'></script>-->

</body>
</html>
