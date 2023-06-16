function heatinitialize() {
    //empty the div that shows all the data if they click on a sub basin

    //var option = document.getElementById('heatDrop').value-1;
    $('#oneMapPF').empty();
    // $('#oneMapPF').append('Range+: (' + heatpfra[oneMap].val[0].val + ' to ' + heatpfra[oneMap].val[126].val +') cfs');
    // console.log("L.9 'min_value_PF1': "+ Object.keys(PFR_meanVals_array[oneMap].val).length);
    // console.log("L.10 'min_value_PF1': "+ JSON.stringify(PFR_meanVals_array[oneMap]));
    // console.log("L.11 'min_value_PF1': "+ typeof (PFR_meanVals_array[oneMap].val[0]));
    var min_value_PF1 = PFR_meanVals_array[oneMap].val[0].val;//mk: Get the min value of mean values of PFR
    var max_value_PF1 = PFR_meanVals_array[oneMap].val[129].val;//mk: Get the max value of mean values of PFR
    var min_ofmins_value_PF1 = PFR_minVals_array[oneMap].val[0].val;//mk: Get the min value of mean values of PFR
    var max_ofmins_value_PF1 = PFR_minVals_array[oneMap].val[129].val;//mk: Get the max value of mean values of PFR
    var min_ofmaxs_value_PF1 = PFR_maxVals_array[oneMap].val[0].val;//mk: Get the min value of mean values of PFR
    var max_ofmaxs_value_PF1 = PFR_maxVals_array[oneMap].val[129].val;//mk: Get the max value of mean values of PFR
    // alert("L.11 'min_value_PF1': "+ min_value_PF1);
    // alert("L.12 'max_value_PF1': "+ max_value_PF1);

    $('#oneMapRV').empty();
    // $('#oneMapRV').append('Range: (' + heatera[oneMap].val[0].val + ' to ' + heatera[oneMap].val[126].val +') Dollars');
    var min_value_RV1 = Cost_meanVals_array[oneMap].val[0].val;//mk
    var max_value_RV1 = Cost_meanVals_array[oneMap].val[129].val;//mk

    $('#oneMapSR').empty();
    // $('#oneMapSR').append('Range: (' + heatseda[oneMap].val[0].val + ' to ' + heatseda[oneMap].val[126].val +') tons');
    var min_value_SR1 = SR_meanVals_array[oneMap].val[0].val;//mk
    var max_value_SR1 = SR_meanVals_array[oneMap].val[129].val;//mk

    $('#oneMapNR').empty();
    // $('#oneMapNR').append('Range: (' + heatnita[oneMap].val[0].val + ' to ' + heatnita[oneMap].val[126].val +') kilograms');
    var min_value_NR1 = NR_meanVals_array[oneMap].val[0].val;//mk
    var max_value_NR1 = NR_meanVals_array[oneMap].val[129].val;//mk

    //// --------------  These new variables are setup for building the map-legend  --------------------
    //
    var maps = ['oneMapPF','oneMapRV','oneMapSR','oneMapNR'];
    var min_values = [min_value_PF1, min_value_RV1, min_value_SR1, min_value_NR1];
    var max_values = [max_value_PF1, max_value_RV1, max_value_SR1, max_value_NR1];

    ////  ---------------  These variables are used to set ranges for maps  -----------------------
    //E: These 4 code-pieces extract only the number corresponding to subbasin number from 'PFR_meanVals_array'
    var ressssPF1 = PFR_meanVals_array[oneMap].val.map(function(a) {
        // console.log ("L.38 ressssPF1: "+ JSON.stringify(ressssPF1));
        return a.name;
    });

    var ressssRV1 = Cost_meanVals_array[oneMap].val.map(function(a) {
        return a.name;
    });

    var ressssSR1 = SR_meanVals_array[oneMap].val.map(function(a) {
        return a.name;
    });

    var ressssNR1 = NR_meanVals_array[oneMap].val.map(function(a) {
        return a.name;
    });


    // ========================== Set BASE-MAPS google.map - 4 maps in total ===================== //
    // ======================  (1) Start: Add Base-Map for PFR  ======================= //
    // Draw the base-map for PFR
    heatmapPF1 = new google.maps.Map(document.getElementById('heatmap_canvasPF1'), {
        // center: new google.maps.LatLng(39.9778, -86.2959),
        center: new google.maps.LatLng(40.00, -86.305),
        zoom: 10,
        disableDefaultUI: true, // it disables all default icons from google map
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    // ------------------- Start: PFR-FULLSCREEN button ------------------------- //
    // --------- These lines add an icon on the heatmap to make zoom out(Fullscreen) ------ //
    $('#fullscreen_heatmap1').click(function() {
        // document.getElementById("fullscreen_heatmap2").style.display = "none";
        $('#heatmap_canvasPF1 div.gm-style button[title="Toggle fullscreen view"]').trigger('click');
        // cccc = 1;

        // Add fullscreen's events. When they are out (close fullscreen), they are captured and reported into the DB
        if (document.addEventListener) {
            document.addEventListener('webkitfullscreenchange', exitHandler1, false);
            document.addEventListener('mozfullscreenchange', exitHandler1, false);
            document.addEventListener('fullscreenchange', exitHandler1, false);
            document.addEventListener('MSFullscreenChange', exitHandler1, false);
        }
        // This function captures the close-fullscreen and reports into the DDBB
        function exitHandler1() {
            if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
                // alert("hello");
                report('m-clk*** ','close_fullscreen heatmap PFR');
                document.removeEventListener("webkitfullscreenchange", exitHandler1);
                document.removeEventListener('mozfullscreenchange', exitHandler1);
                document.removeEventListener('fullscreenchange', exitHandler1);
                document.removeEventListener('MSFullscreenChange', exitHandler1);
            }
        }
    });
    // ------------------- End: PFR-FULLSCREEN button ------------------------- //


    // -------------- Start: Legend for 'PFR' in heatmap ----------- //
    // E: a) Set a custom button into the heatmap to display the legend
    // E: b) Call the function "buttonControl_pfrs" located around 2044 in g2.php

    // var buttonOptions_1 = {
    //     gmap: heatmapPF1,
    //     name: 'Legend ',
    //     position: google.maps.ControlPosition.TOP_RIGHT,
    //     // action: function(){
    //     //     // map1.panTo(new google.maps.LatLng(-33.9, 151.2));
    //     //     jQuery('.heatMapLegend_container_pfr').toggle('show');
    //     // }
    // };

    //EE: Definition of Ranges and colors
    var rg_pfr= [0,1,2,3,4,5,6,40];//[0,1,10,20,40];//[0,10,20,40];//[0,500,1000,1600];//[0,1,10,50,100,200,500,1600];//E: PFR
    // var rg_pfr= [0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40];//[0,10,20,40];//[0,500,1000,1600];//[0,1,10,50,100,200,500,1600];//E: PFR - For 20 intervals
    var rg_sr = [0,6000,12000,18000];//[0,100,500,1000,2500,5000,10000,18000];//E: For SR
    var rg_nr = [-350,250000,500000,800000];//[-350,0,1000,5000,15000,30000,100000,800000];//E: For NR
    var rg_pr = [-450000,0,1000,50000,500000,1000000,2000000,4800000];//[-1000,10000,20000,45000];//[-450000,1500000,3000000,4800000];//[-450000,0,1000,50000,500000,1000000,2000000,4800000];//E: For Profit
    // var rg_pr = [-1200,0,2500,5000,7500,10000,12500,15000,17500,20000,22500,25000,27500,30000,32500,35000,37500,40000,42500,45000,47500];//E: For 20 intervals

    // var rg_pr = [-1000,0,15000,30000,45000];//E: For Profit (4 intervals)
    var colorList = {//E: For 7 intervals
        color1: '#ffff80',
        color2: '#fff200',
        color3: '#ffcc00',
        color4: '#ff9900',
        color5: '#ff6600',//'#ff6600',//'#66ff33',//'#ff6600', test '#66ff33'
        color6: '#ff0000',//'#e60000',//'#ff3300',//#e60000
        color7: '#cc0000'//'#cc0000'//'#990000'//'#ff0000', test '#0066ff'
    };
    // var colorList = {//E: For 3 intervals
    //     // color0: '#ffffff',//E: only for negatives
    //     color1: '#ffff00',
    //     color2: '#ff8000',//'#ff6600',
    //     color3: '#ff0000',//'#d72007',
    // };
    // var colorList = {//E: For 4 intervals
    //     // color0: '#ffffff',//E: only for negatives
    //     color1: '#ffffff',
    //     color2: '#f9f900',//'#ff6600',
    //     color3: '#ffa300',//'#d72007',
    //     color4: '#ff0000',//'#d72007',
    // };
    // var colorList = {//E: For 20 intervals
    //     // color0: '#ffffff',//E: only for negatives
    //     color1: '#fff2f2',color2: '#ffe6e6',color3: '#ffd9d9',color4: '#ffcccc',
    //     color5: '#ffbfbf',color6: '#ffb2b2',color7: '#ffa6a6',color8: '#ff9999',
    //     color9: '#ff8c8c',color10: '#ff8080',color11: '#ff7373',color12: '#ff6666',
    //     color13: '#ff5959',color14: '#ff4c4c',color15: '#ff4040',color16: '#ff3333',
    //     color17: '#ff2626',color18: '#ff1a1a',color19: '#ff0d0d',color20: '#ff0000'
    // };


    var mapa = maps[0];//E: Maps[0] is for PFR. See above in definition of variables L.32
    var min_value = min_values[0];
    var max_value = max_values[0];
    // alert("Line:111-heatmapnew1.js: " + " map: " + mapa + "  min: " + min_value + "  max: " + max_value);
    // var button1 = new buttonControl_pfr(colorList, mapa, min_value, max_value, rg_pfr);//E: located in legend_plug.js
    var button1 = new buttonControl_pfr(colorList, rg_pfr);//E: located in legend_plug.js
    // --------------- End: Legend for 'PFR' in heatmap ----------------- //



    // ----------------- Start: New polygons to highlight sub-basins in PFR-heatmap ------------------- //
    //EE: it sets coordinates for all watershed (border) and saved as sb0
    //EE: This part works with two other functions ('add_sb0' and 'select_sb') located at the end of this file

    highlight_subbasin_pfr(heatmapPF1);
    function highlight_subbasin_pfr(hm){
        //E: Build coordinates for the watershed border
        var sbhm0 = constructNewCoordinates(border_json.features[0].geometry);
        // var ssbb_hm = [sbhm0];
        var ssbb_pfr = [sbhm0];

        var n_sb = 131;//E: for ecw (130 subbasin but for looping we add 1)
        // EE: it sets coordinates for all subasins (border) and saved as sb1, sb2, sb3,...,s130 (ecw)
        // var ssbb_pfr = [sbhm0,sbhm1,sbhm2,sbhm3,...];
        for (var j = 1; j < n_sb; j++) {
            //E: It gets the index of subbasin sb1,sb2,etc. from "ecw4b.js" data-file
            var indexx = subbasin_json.properties.map(function(e) { return e.Subbasin; }).indexOf(j);
            // if (j==1) alert ("L.143 index: "+ indexx);

            this["sbhm"+j] = constructNewCoordinates(subbasin_json.features[indexx].geometry);
            ssbb_pfr.push(this["sbhm"+j]);//E: add new item to the 'ssbb' object-array
            // if (j > 9 && j < 15) alert ("L.90 variable created: "+ this["sb"+j]);
        }
        // alert("done!");
        console.log ("L.149: "+ typeof ssbb_pfr + "  length: "+ ssbb_pfr.length);
        // console.log ("L.150: \n"+ JSON.stringify(ssbb_pfr));
        // console.log("L.151 sb0: \n"+ JSON.stringify(sb1));

        set_polygons_paths(ssbb_pfr);
        function set_polygons_paths(ssbb_pfr) {
            for (var i = 0; i < n_sb; i++){
                // eval("poly_sb" + i + "=new google.maps.Polygon({\n" +
                eval("polyg_pfr" + i + "=new google.maps.Polyline({\n" +
                    "              path: ssbb_pfr["+i+"],\n" +
                    "              strokeColor: '#000000',\n" +//Black(default):#000000, Red: #FF0000, Maroon: #800000
                    "              strokeOpacity: 1.0,\n" +//E: 1.0 by default (dark)
                    "              strokeWeight: 3,\n" +
                    // "              fillOpacity: 0.0,\n" +//E: not for polyline
                    "              zIndex: 100\n" +
                    "          })");
            }
        }
        // //E: add_sb0() is placed at the end of this code (L.1543)
        // add_sb0_pfrhm(n_sb,hm);//E: add the 'watershed' border into the main map as default.
        // polyg_pfr0.setMap(hm);
        polyg_pfr0.setMap(heatmapPF1);
    }
    // ----------------- End: New polygons to highlight sub-basins in PFR-heatmap ------------------- //

    // ======================= (1) End: Add Base-Map for PFR  ===================== //


    // =========================  (2) Start: Add Base-Map for RV PROFIT  ========================== //
    // Draw the base-map for PROFIT
    heatmapRV1 = new google.maps.Map(document.getElementById('heatmap_canvasRV1'), {
        center: new google.maps.LatLng(39.9778, -86.2959),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true // it disables all default icons from google map
    });


    // ------------------- Start: Fullscreen button for 'Profit' TAB ------------------------- //
    // This three lines add an icon over the map (heatmap) for FULLSCREEN
    $('#fullscreen_heatmap2').click(function() {
        $('#heatmap_canvasRV1 div.gm-style button[title="Toggle fullscreen view"]').trigger('click');

        // Add fullscreen's events. When they are out (close fullscreen), they are captured and reported into the DB
        if (document.addEventListener) {
            document.addEventListener('webkitfullscreenchange', exitHandler2, false);
            document.addEventListener('mozfullscreenchange', exitHandler2, false);
            document.addEventListener('fullscreenchange', exitHandler2, false);
            document.addEventListener('MSFullscreenChange', exitHandler2, false);
        }
        // This function captures the close-fullscreen and reports into the DDBB
        function exitHandler2() {
            if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
                // alert("hello");
                report('m-clk*** ','close_fullscreen heatmap CR');
                document.removeEventListener("webkitfullscreenchange", exitHandler2);
                document.removeEventListener('mozfullscreenchange', exitHandler2);
                document.removeEventListener('fullscreenchange', exitHandler2);
                document.removeEventListener('MSFullscreenChange', exitHandler2);
            }
        }
    });
    // ------------------- End: Fullscreen button for 'Profit' TAB ------------------------- //

    // ----------------- Start: Legend for 'Profit' in heatmap  ------------------- //
    // E: 1) Set a custom button into the heatmap to display the legend
    // E: 2) Call the function "buttonControl_cr" located around 2130 in g2.php

    // var buttonOptions_1 = {
    //     gmap: heatmapRV1,
    //     name: 'Legend ',
    //     position: google.maps.ControlPosition.TOP_RIGHT,
    //     // action: function(){
    //     //     // map1.panTo(new google.maps.LatLng(-33.9, 151.2));
    //     //     jQuery('.heatMapLegend_container_cr').toggle('show');
    //     //     // alert("L:103 heatmapnew1.js " + "  button added.. ");
    //     // }
    // };

    // var colorList = {color1: '#ffffff', color2: '#ffff00', color3: '#ffcc00', color4: '#ff9900', color5: '#ff6600', color6: '#ff3300', color7: '#ff0000'};
    var mapa = maps[1]; //E: Maps[1] is for PROFIT. See above in definition of variables L.32
    var min_value = min_values[1];
    var max_value = max_values[1];
    // alert("Line:111-heatmapnew1.js: " + " map: " + mapa + "  min: " + min_value + "  max: " + max_value);
    // var button1 = new buttonControl_cr(colorList, mapa, min_value, max_value, rg_pr);//E: located in legend_plug.js
    var button1 = new buttonControl_cr(colorList, rg_pr);//E: located in legend_plug.js

    // --------------- End: Legend for 'Profit' in heatmap ----------------- //


    // ----------------- Start: New polygons to highlight sub-basins in RV-heatmap ------------------- //
    //EE: it sets coordinates for all watershed (border) and saved as sb0
    //EE: This part works with two other functions ('add_sb0' and 'select_sb') located at the end of this file

    highlight_subbasin_rv(heatmapRV1);
    function highlight_subbasin_rv(hm){
        //E: Build coordinates for the watershed border
        var sbhm0 = constructNewCoordinates(border_json.features[0].geometry);
        var ssbb_rv = [sbhm0];//E: Change this variable for each objective (PF,RV,SR,NR)

        var n_sb = 131;//E: for ecw (130 subbasin but for looping we add 1)
        // EE: it sets coordinates for all subasins (border) and saved as sb1, sb2, sb3,...,s130 (ecw)
        // var ssbb_hm = [sbhm0,sbhm1,sbhm2,sbhm3,...];
        for (var j = 1; j < n_sb; j++) {
            //E: It gets the index of subbasin sb1,sb2,etc. from "ecw4b.js" data-file
            var indexx = subbasin_json.properties.map(function(e) { return e.Subbasin; }).indexOf(j);
            // if (j==1) alert ("L.143 index: "+ indexx);

            this["sbhm"+j] = constructNewCoordinates(subbasin_json.features[indexx].geometry);
            ssbb_rv.push(this["sbhm"+j]);//E: add new item to the 'ssbb' object-array
            // if (j > 9 && j < 15) alert ("L.90 variable created: "+ this["sb"+j]);
        }
        // alert("done!");
        console.log ("L.149: "+ typeof ssbb_rv + "  length: "+ ssbb_rv.length);
        // console.log ("L.150: \n"+ JSON.stringify(ssbb_rv));
        // console.log("L.151 sb0: \n"+ JSON.stringify(sb1));

        set_polygons_paths(ssbb_rv);
        function set_polygons_paths(ssbb_rv) {
            for (var i = 0; i < n_sb; i++){
                // eval("poly_sb" + i + "=new google.maps.Polygon({\n" +
                eval("polyg_rv" + i + "=new google.maps.Polyline({\n" +
                    "              path: ssbb_rv["+i+"],\n" +//E: CHANGE
                    "              strokeColor: '#000000',\n" +//Black(default):#000000, Red: #FF0000, Maroon: #800000
                    "              strokeOpacity: 1.0,\n" +//E: 1.0 by default (dark)
                    "              strokeWeight: 3,\n" +
                    // "              fillOpacity: 0.0,\n" +//E: not for polyline
                    "              zIndex: 100\n" +
                    "          })");
            }
        }
        //E: add_sb0() is placed at the end of this code (L.1543)
        //         add_sb0_pfrhm(n_sb,hm);//E: add the 'watershed' border into the main map as default.
        //         polyg_rv0.setMap(hm);
        polyg_rv0.setMap(heatmapRV1);
    }
    // ----------------- End: New polygons to highlight sub-basins in RV-heatmap ------------------- //

    // ======================= (2) End: Add Base-Map for RV  ===================== //


    // ========================  (3) Start: Add Base-Map for SR  ======================= //
    // Draw the base-map for SR
    heatmapSR1 = new google.maps.Map(document.getElementById('heatmap_canvasSR1'), {
        center: new google.maps.LatLng(39.9778, -86.2959),
        zoom: 10,
        disableDefaultUI: true, // it disables all default icons from google map
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    // ------------------- Start: SR-FULLSCREEN button ------------------------- //
    // These lines add an icon over the SR-heatmap for FULLSCREEN
    $('#fullscreen_heatmap3').click(function() {
        $('#heatmap_canvasSR1 div.gm-style button[title="Toggle fullscreen view"]').trigger('click');

        // Add fullscreen's events. When they are out (close fullscreen), they are captured and reported into the DB
        if (document.addEventListener) {
            document.addEventListener('webkitfullscreenchange', exitHandler3, false);
            document.addEventListener('mozfullscreenchange', exitHandler3, false);
            document.addEventListener('fullscreenchange', exitHandler3, false);
            document.addEventListener('MSFullscreenChange', exitHandler3, false);
        }
        // This function captures the close-fullscreen and reports into the DDBB
        function exitHandler3() {
            if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
                // alert("hello");
                report('m-clk*** ','close_fullscreen heatmap SR');
                document.removeEventListener("webkitfullscreenchange", exitHandler3);
                document.removeEventListener('mozfullscreenchange', exitHandler3);
                document.removeEventListener('fullscreenchange', exitHandler3);
                document.removeEventListener('MSFullscreenChange', exitHandler3);
            }
        }
    });
    // ------------------- End: SR-FULLSCREEN button ------------------------- //

    // ------------- Start: Legend for 'SR' in heatmap --------------- //
    // E: 1) Set a custom button into the heatmap to display the legend
    // E: 2) Call the function "buttonControl_sr" located around 2215 in g2.php

    // var buttonOptions_1 = {
    //     gmap: heatmapSR1,
    //     name: 'Legend ',
    //     position: google.maps.ControlPosition.TOP_RIGHT,
    //     // action: function(){
    //     //     // map1.panTo(new google.maps.LatLng(-33.9, 151.2));
    //     //     jQuery('.heatMapLegend_container_sr').toggle('show');
    //     // }
    // };

    // var colorList = {color1: '#ffffff', color2: '#ffff00', color3: '#ffcc00', color4: '#ff9900', color5: '#ff6600', color6: '#ff3300', color7: '#ff0000'};
    var mapa = maps[2];//E: Maps[2] is for SR. See above in definition of variables L.32
    var min_value = min_values[2];
    var max_value = max_values[2];
    // alert("Line:111-heatmapnew1.js: " + " map: " + mapa + "  min: " + min_value + "  max: " + max_value);
    // var button1 = new buttonControl_sr(colorList, mapa, min_value, max_value,rg_sr);//E: located in legend_plug.js
    var button1 = new buttonControl_sr(colorList, rg_sr);//E: located in legend_plug.js

    // --------------- End: Legend for 'SR' in heatmap ----------------- //

    // ----------------- Start: New polygons to highlight sub-basins in SR-heatmap ------------------- //
    //EE: it sets coordinates for all watershed (border) and saved as sb0
    //EE: This part works with two other functions ('add_sb0' and 'select_sb') located at the end of this file

    highlight_subbasin_sr(heatmapSR1);
    function highlight_subbasin_sr(hm){
        //E: Build coordinates for the watershed border
        var sbhm0 = constructNewCoordinates(border_json.features[0].geometry);
        var ssbb_sr = [sbhm0];//E: Change this variable for each objective (PF,RV,SR,NR)

        var n_sb = 131;//E: for ecw (130 subbasin but for looping we add 1)
        // EE: it sets coordinates for all subasins (border) and saved as sb1, sb2, sb3,...,s130 (ecw)
        // var ssbb_hm = [sbhm0,sbhm1,sbhm2,sbhm3,...];
        for (var j = 1; j < n_sb; j++) {
            //E: It gets the index of subbasin sb1,sb2,etc. from "ecw4b.js" data-file
            var indexx = subbasin_json.properties.map(function(e) { return e.Subbasin; }).indexOf(j);
            // if (j==1) alert ("L.143 index: "+ indexx);

            this["sbhm"+j] = constructNewCoordinates(subbasin_json.features[indexx].geometry);
            ssbb_sr.push(this["sbhm"+j]);//E: add new item to the 'ssbb' object-array
            // if (j > 9 && j < 15) alert ("L.90 variable created: "+ this["sb"+j]);
        }
        // alert("done!");
        console.log ("L.149: "+ typeof ssbb_sr + "  length: "+ ssbb_sr.length);
        // console.log ("L.150: \n"+ JSON.stringify(ssbb_hm));
        // console.log("L.151 sb0: \n"+ JSON.stringify(sb1));

        set_polygons_paths(ssbb_sr);
        function set_polygons_paths(ssbb_sr) {
            for (var i = 0; i < n_sb; i++){
                // eval("poly_sb" + i + "=new google.maps.Polygon({\n" +
                eval("polyg_sr" + i + "=new google.maps.Polyline({\n" +
                    "              path: ssbb_sr["+i+"],\n" +//E: CHANGE
                    "              strokeColor: '#000000',\n" +//Black(default):#000000, Red: #FF0000, Maroon: #800000
                    "              strokeOpacity: 1.0,\n" +//E: 1.0 by default (dark)
                    "              strokeWeight: 3,\n" +
                    // "              fillOpacity: 0.0,\n" +//E: not for polyline
                    "              zIndex: 100\n" +
                    "          })");
            }
        }
        //E: add_sb0() is placed at the end of this code (L.1543)
        //         add_sb0_pfrhm(n_sb,hm);//E: add the 'watershed' border into the main map as default.
        //         polyg_sr0.setMap(hm);
        polyg_sr0.setMap(heatmapSR1);
    }
    // ----------------- End: New polygons to highlight sub-basins in SR-heatmap ------------------- //

    // ======================= (3) End: Add Base-Map for SR  ===================== //


    // ======================= (4) Start: Add Base-Map for NR  ===================== //
    // Draw base-map for NR
    heatmapNR1 = new google.maps.Map(document.getElementById('heatmap_canvasNR1'), {
        center: new google.maps.LatLng(39.9778, -86.2959),
        zoom: 10,
        disableDefaultUI: true, // it disables all default icons from google map
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    // ------------------- Start: FULLSCREEN NR ------------------------- //
    // These lines add an icon over the NR-heatmap for FULLSCREEN
    $('#fullscreen_heatmap4').click(function() {
        // $("#heatmap_canvasSR1").hide()
        $('#heatmap_canvasNR1 div.gm-style button[title="Toggle fullscreen view"]').trigger('click');

        // Add fullscreen's events. When they are out (close fullscreen), they are captured and reported into the DB
        if (document.addEventListener) {
            document.addEventListener('webkitfullscreenchange', exitHandler4, false);
            document.addEventListener('mozfullscreenchange', exitHandler4, false);
            document.addEventListener('fullscreenchange', exitHandler4, false);
            document.addEventListener('MSFullscreenChange', exitHandler4, false);
        }
        // This function captures the close-fullscreen and reports into the DDBB
        function exitHandler4() {
            if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
                // alert("hello");
                report('m-clk*** ','close_fullscreen heatmap NR');
                document.removeEventListener("webkitfullscreenchange", exitHandler4);
                document.removeEventListener('mozfullscreenchange', exitHandler4);
                document.removeEventListener('fullscreenchange', exitHandler4);
                document.removeEventListener('MSFullscreenChange', exitHandler4);
            }
        }
    });
    // ------------------- End: FULLSCREEN NR ------------------------- //

    // ----------------- Start: Legend for 'NR' in heatmap --------------- //
    // E: a) Set a custom button into the heatmap to display the legend
    // E: b) Call the function "buttonControl_nr" located around 2300 in g2.php

    // var buttonOptions_1 = {
    //     gmap: heatmapNR1,
    //     name: 'Legend ',
    //     position: google.maps.ControlPosition.TOP_RIGHT,
    //     // action: function(){
    //     //     // map1.panTo(new google.maps.LatLng(-33.9, 151.2));
    //     //     jQuery('.heatMapLegend_container_nr').toggle('show');
    //     // }
    // };

    // var colorList = {color1: '#ffffff', color2: '#ffff00', color3: '#ffcc00', color4: '#ff9900', color5: '#ff6600', color6: '#ff3300', color7: '#ff0000'};
    var mapa = maps[3];//E: Maps[3] is for SR. See above in definition of variables L.32
    var min_value = min_values[3];
    var max_value = max_values[3];
    // alert("Line:111-heatmapnew1.js: " + " map: " + mapa + "  min: " + min_value + "  max: " + max_value);
    // var button1 = new buttonControl_nr(colorList, mapa, min_value, max_value, rg_nr);//E: located in legend_plug.js
    var button1 = new buttonControl_nr(colorList, rg_nr);//E: located in legend_plug.js

    // --------------- End: Legend for 'NR' in heatmap ----------------- //


    // ----------------- Start: New polygons to highlight sub-basins in NR-heatmap ------------------- //
    //EE: it sets coordinates for all watershed (border) and saved as sb0
    //EE: This part works with two other functions ('add_sb0' and 'select_sb') located at the end of this file

    highlight_subbasin_nr(heatmapNR1);
    function highlight_subbasin_nr(hm){
        //E: Build coordinates for the watershed border
        var sbhm0 = constructNewCoordinates(border_json.features[0].geometry);
        var ssbb_nr = [sbhm0];//E: Change this variable for each objective (PF,RV,SR,NR)

        var n_sb = 131;//E: for ecw (130 subbasin but for looping we add 1)
        // EE: it sets coordinates for all subasins (border) and saved as sb1, sb2, sb3,...,s130 (ecw)
        // var ssbb_hm = [sbhm0,sbhm1,sbhm2,sbhm3,...];
        for (var j = 1; j < n_sb; j++) {
            //E: It gets the index of subbasin sb1,sb2,etc. from "ecw4b.js" data-file
            var indexx = subbasin_json.properties.map(function(e) { return e.Subbasin; }).indexOf(j);
            // if (j==1) alert ("L.143 index: "+ indexx);

            this["sbhm"+j] = constructNewCoordinates(subbasin_json.features[indexx].geometry);
            ssbb_nr.push(this["sbhm"+j]);//E: add new item to the 'ssbb' object-array
            // if (j > 9 && j < 15) alert ("L.90 variable created: "+ this["sb"+j]);
        }
        // alert("done!");
        console.log ("L.149: "+ typeof ssbb_nr + "  length: "+ ssbb_nr.length);
        // console.log ("L.150: \n"+ JSON.stringify(ssbb_hm));
        // console.log("L.151 sb0: \n"+ JSON.stringify(sb1));

        set_polygons_paths(ssbb_nr);
        function set_polygons_paths(ssbb_nr) {
            for (var i = 0; i < n_sb; i++){
                // eval("poly_sb" + i + "=new google.maps.Polygon({\n" +
                eval("polyg_nr" + i + "=new google.maps.Polyline({\n" +
                    "              path: ssbb_nr["+i+"],\n" +//E: CHANGE
                    "              strokeColor: '#000000',\n" +//Black(default):#000000, Red: #FF0000, Maroon: #800000
                    "              strokeOpacity: 1.0,\n" +//E: 1.0 by default (dark)
                    "              strokeWeight: 3,\n" +
                    // "              fillOpacity: 0.0,\n" +//E: not for polyline
                    "              zIndex: 100\n" +
                    "          })");
            }
        }
        //E: add_sb0() is placed at the end of this code (L.1543)
        //         add_sb0_pfrhm(n_sb,hm);//E: add the 'watershed' border into the main map as default.
        //         polyg_nr0.setMap(hm);
        polyg_nr0.setMap(heatmapNR1);
    }
    // ----------------- End: New polygons to highlight sub-basins in NR-heatmap ------------------- //

    // ======================= (4) End: Add Base-Map for NR  ===================== //
    // ======================= End: Set BASE-MAPS google.map - 4 maps in total ===================== //


    // =============================  do  doheatmaps  ============================= //
    // doheatPF1
    pfr_Array = doheatPF1(PFR_meanVals_array, ressssPF1);//E: It comes from L.42
    // doheatRV1();
    rv_Array = doheatRV1(Cost_meanVals_array, ressssRV1);
    doheatSR1();
    doheatNR1();

    // ----------------------- Start:  set coordinates for maps ---------------------- //
    function constructNewCoordinates(polygon) {
        var newCoordinates = [];
        var coordinates = null;
        if (polygon['coordinates']) coordinates = polygon['coordinates'];
        if (coordinates.length == 1) {
            coordinates = coordinates[0];
        }
        for (var i in coordinates) {
            newCoordinates.push(new google.maps.LatLng(coordinates[i][1], coordinates[i][0]));
            //bounds.extend(newCoordinates[i]);
        }
        return newCoordinates;
    }
    // ----------------------- End:  set coordinates for maps ----------------------

    // ===============  Start: Draw (doheatPF1,"drawHeatPF1", doheatPF2, "drawHeatPF2") ===============
    // ----------------  Start: doheartPF1() ------------
    // function doheatPF1() {
    function doheatPF1(pfr_map,ressssPF1) {//E: This sets min,mean or max PFR heatmap
        // var sb_match = [];
        // var obj = [];
        // Peakflow_Array
        var Peakflow_Array = [];
        var prev_info = false;//E: This variable is employed to popup (open) the #of sb and PFR one at a time (L.659)
        for (var i = 0; i < subbasin_json.features.length; i++) {//EE 'map_data.features.length' = 130 (# of subbasins)
            var newCoordinates = [];
            var whichNode = "";

            var whichNode = subbasin_json.properties[i]["Subbasin"].toString();//E: For "ecw" needs to convert to string
            // var whichNode = subbasin_json.properties[i]["Subbasin"];//E: For "Dairy-Mckay"

            //if (i==1) alert("geometry "+i+":"+rows[i][1]['geometry']['coordinates']);
            // var newCoordinates = constructNewCoordinates(rows[i][1]['geometry']);
            var newCoordinates = constructNewCoordinates(subbasin_json.features[i].geometry);
            var indexx = ressssPF1.indexOf(Number(whichNode));
            // var pfr_val_current_sb_and_alt = PFR_meanVals_array[oneMap].val[indexx].val;
            var pfr_val_current_sb_and_alt = pfr_map[oneMap].val[indexx].val;
            // console.log("L.319 Checking the current # of suggestion: "+ (oneMap+1));
            // console.log ("L.317 'sb': "+ whichNode +"  indexx: "+ indexx+" value: "+JSON.stringify(PFR_meanVals_array[oneMap].val[indexx].val));
            // console.log("L.318 :\n"+ JSON.stringify(PFR_meanVals_array.length));
            //E: below shows PFR_meanVals_array for the current suggestion (alternative)
            // if (i<1) console.log("L.322 :\n"+ JSON.stringify(PFR_meanVals_array[oneMap]));
            // if (i<1) console.log("L.323 'PFR_meanVals_array[oneMap][\"val\"]' length :"+ JSON.stringify(PFR_meanVals_array[oneMap]["val"].length));//E:

            // // --------------- For Classification with equal numbers of items at each interval -------------------- //

            // switch (true) {//E: For 6 intervals
            //     case (indexx < 0):filterColor = "#ffffff";//"#000000"; // #ffffff// 3 subbasins
            //         break;
            //     case (indexx < 20): filterColor = "#ffff00";//20 subbasins
            //         break;
            //     case ((indexx >= 20) && (indexx < 40)): filterColor = "#ffcc00";//"#0033cc";//"#ffcc00";//20 subbasins
            //         break;
            //     case ((indexx >= 40) && (indexx < 70)): filterColor = "#ff9900";//"#33cc33";//"#ff9900";//30 subabsins
            //         break;
            //     case ((indexx >= 70) && (indexx < 90)): filterColor = "#ff6600";//"#00ffff";//"#ff6600";//20 subbasins
            //         break;
            //     case (indexx >= 90): filterColor = "#ff3300";//"#ff3388";//"#ff3300";//37 subbasins
            //         break;
            //     default: filterColor = "#ff0000";//"#aa9999";//"#ff0000";//
            //         break;
            // }

            // --------------- For 7 intervals (0,1,10,50,100,200,500,1000) [0,1,10,50,100,200,500,1600]
            // var rg_pfr = [1,10,50,100,200,500,1000]; //E: 7 Intervals
            switch (true) {
                case ((pfr_val_current_sb_and_alt > rg_pfr[0])&&(pfr_val_current_sb_and_alt <= rg_pfr[1])):filterColor = colorList["color1"];//"#ffffff";//
                    break;
                case ((pfr_val_current_sb_and_alt > rg_pfr[1])&&(pfr_val_current_sb_and_alt <= rg_pfr[2])): filterColor = colorList["color2"];//"#ffff00";
                    break;
                case ((pfr_val_current_sb_and_alt > rg_pfr[2])&&(pfr_val_current_sb_and_alt <= rg_pfr[3])): filterColor = colorList["color3"];//"#ffcc00";
                    break;
                case ((pfr_val_current_sb_and_alt > rg_pfr[3])&&(pfr_val_current_sb_and_alt <= rg_pfr[4])): filterColor = colorList["color4"];//"#ff9900";
                    break;
                case ((pfr_val_current_sb_and_alt > rg_pfr[4])&&(pfr_val_current_sb_and_alt <= rg_pfr[5])): filterColor = colorList.color5;//"#ff6600";
                    break;
                case ((pfr_val_current_sb_and_alt > rg_pfr[5])&&(pfr_val_current_sb_and_alt <= rg_pfr[6])): filterColor = colorList["color6"];//"#ff3300";
                    break;
                case ((pfr_val_current_sb_and_alt > rg_pfr[6])&&(pfr_val_current_sb_and_alt <= rg_pfr[7])): filterColor = colorList["color7"];//"#ff0000";
                    break;
                default: filterColor = "#ffffff";//"#ff0000";//"#aa9999";//"#ff0000";//
                    break;
            }

            // // --------- For 3 intervals (high, medium, low) [0,500,1000,1600]
            // // var rg_pfr = [high, medium, low];
            // switch (true) {
            //     case ((pfr_val_current_sb_and_alt >= rg_pfr[0])&&(pfr_val_current_sb_and_alt < rg_pfr[1])):
            //         filterColor = colorList["color1"];//"#ffffff";//
            //         break;
            //     case ((pfr_val_current_sb_and_alt >= rg_pfr[1])&&(pfr_val_current_sb_and_alt < rg_pfr[2])): filterColor = colorList["color2"];//"#ffff00";
            //         break;
            //     case ((pfr_val_current_sb_and_alt >= rg_pfr[2])&&(pfr_val_current_sb_and_alt < rg_pfr[3])): filterColor = colorList["color3"];//"#ffcc00";
            //         break;
            //     default: filterColor = "#aa9999";//"#ff0000";//"#aa9999";//"#ff0000";//
            //         break;
            // }

            // --------- For 4 intervals [0,1,10,20,40]
            // // // var rg_pfr = [0,1,10,20,40]; //E: 4 Intervals
            // switch (true) {
            //     case ((pfr_val_current_sb_and_alt >= rg_pfr[0])&&(pfr_val_current_sb_and_alt < rg_pfr[1])):
            //         filterColor = colorList["color1"];//"#ffffff";//
            //         break;
            //     case ((pfr_val_current_sb_and_alt >= rg_pfr[1])&&(pfr_val_current_sb_and_alt < rg_pfr[2])): filterColor = colorList["color2"];//"#ffff00";
            //         break;
            //     case ((pfr_val_current_sb_and_alt >= rg_pfr[2])&&(pfr_val_current_sb_and_alt < rg_pfr[3])): filterColor = colorList["color3"];//"#ffcc00";
            //         break;
            //     case ((pfr_val_current_sb_and_alt >= rg_pfr[3])&&(pfr_val_current_sb_and_alt < rg_pfr[4])): filterColor = colorList["color4"];//"#ffcc00";
            //         break;
            //     default: filterColor = "#aa9999";//"#ff0000";//"#aa9999";//"#ff0000";//
            //         break;
            // }

            // // --------- For 20 intervals [0, 0-2, 2-4, 4-6, 6-8, 8-10, 10-12, 14-16, 14-16, 16-18, 18-20,
            // //                          20-22, 22-24, 24-26, 26-28, 28-30, 30-32, 32-34, 34-36, 36-38, 38-40]
            // // // var rg_pfr = [0,1,10,20,40]; //E: 4 Intervals
            // switch (true) {
            //     case ((pfr_val_current_sb_and_alt >rg_pfr[0])&&(pfr_val_current_sb_and_alt <= rg_pfr[1])): filterColor = colorList["color1"];//"#ffffff";//
            //         break;
            //     case ((pfr_val_current_sb_and_alt >rg_pfr[1])&&(pfr_val_current_sb_and_alt <= rg_pfr[2])): filterColor = colorList["color2"];//"#ffff00";
            //         break;
            //     case ((pfr_val_current_sb_and_alt >rg_pfr[2])&&(pfr_val_current_sb_and_alt <= rg_pfr[3])): filterColor = colorList["color3"];//"#ffcc00";
            //         break;
            //     case ((pfr_val_current_sb_and_alt >rg_pfr[3])&&(pfr_val_current_sb_and_alt <=rg_pfr[4])): filterColor = colorList["color4"];//"#ffcc00";
            //         break;
            //     case ((pfr_val_current_sb_and_alt >rg_pfr[4])&&(pfr_val_current_sb_and_alt <=rg_pfr[5])): filterColor = colorList["color5"];//"#ffcc00";
            //         break;
            //     case ((pfr_val_current_sb_and_alt >rg_pfr[5])&&(pfr_val_current_sb_and_alt <=rg_pfr[6])): filterColor = colorList["color6"];//"#ffcc00";
            //         break;
            //     case ((pfr_val_current_sb_and_alt >rg_pfr[6])&&(pfr_val_current_sb_and_alt <=rg_pfr[7])): filterColor = colorList["color7"];//"#ffcc00";
            //         break;
            //     case ((pfr_val_current_sb_and_alt >rg_pfr[7])&&(pfr_val_current_sb_and_alt <=rg_pfr[8])): filterColor = colorList["color8"];//"#ffcc00";
            //         break;
            //     case ((pfr_val_current_sb_and_alt >rg_pfr[8])&&(pfr_val_current_sb_and_alt <=rg_pfr[9])): filterColor = colorList["color9"];//"#ffcc00";
            //         break;
            //     case ((pfr_val_current_sb_and_alt >rg_pfr[9])&&(pfr_val_current_sb_and_alt <=rg_pfr[10])): filterColor = colorList["color10"];//"#ffcc00";
            //         break;
            //     case ((pfr_val_current_sb_and_alt >rg_pfr[10])&&(pfr_val_current_sb_and_alt <=rg_pfr[11])): filterColor = colorList["color11"];//"#ffcc00";
            //         break;
            //     case ((pfr_val_current_sb_and_alt >rg_pfr[11])&&(pfr_val_current_sb_and_alt <=rg_pfr[12])): filterColor = colorList["color12"];//"#ffcc00";
            //         break;
            //     case ((pfr_val_current_sb_and_alt >rg_pfr[12])&&(pfr_val_current_sb_and_alt <=rg_pfr[13])): filterColor = colorList["color13"];//"#ffcc00";
            //         break;
            //     case ((pfr_val_current_sb_and_alt >rg_pfr[13])&&(pfr_val_current_sb_and_alt <=rg_pfr[14])): filterColor = colorList["color14"];//"#ffcc00";
            //         break;
            //     case ((pfr_val_current_sb_and_alt >rg_pfr[14])&&(pfr_val_current_sb_and_alt <=rg_pfr[15])): filterColor = colorList["color15"];//"#ffcc00";
            //         break;
            //     case ((pfr_val_current_sb_and_alt >rg_pfr[15])&&(pfr_val_current_sb_and_alt <=rg_pfr[16])): filterColor = colorList["color16"];//"#ffcc00";
            //         break;
            //     case ((pfr_val_current_sb_and_alt >rg_pfr[16])&&(pfr_val_current_sb_and_alt <=rg_pfr[17])): filterColor = colorList["color17"];//"#ffcc00";
            //         break;
            //     case ((pfr_val_current_sb_and_alt >rg_pfr[17])&&(pfr_val_current_sb_and_alt <=rg_pfr[18])): filterColor = colorList["color18"];//"#ffcc00";
            //         break;
            //     case ((pfr_val_current_sb_and_alt >rg_pfr[18])&&(pfr_val_current_sb_and_alt <=rg_pfr[19])): filterColor = colorList["color19"];//"#ffcc00";
            //         break;
            //     case ((pfr_val_current_sb_and_alt >rg_pfr[19])&&(pfr_val_current_sb_and_alt <=rg_pfr[20])): filterColor = colorList["color20"];//"#ffcc00";
            //         break;
            //     default: filterColor = "#ffffff";//"#ff0000";//"#aa9999";//"#ff0000";//
            //         break;
            // }


            var whichNode = subbasin_json.properties[i]["Subbasin"].toString();//E:For "ecw" needs to converto string
            // var whichNode = subbasin_json.properties[i]["Subbasin"];//E: For "Dairy-McKay"
            Peakflow = new google.maps.Polygon({
                path: newCoordinates,
                //strokeColor: colors[0],
                strokeOpacity: .4,
                strokeWeight: 1,
                fillOpacity: 1,
                fillColor: filterColor,
                indexID: whichNode,
                clickable: true
            });

            Peakflow.setMap(heatmapPF1);

            // //E: Add event to popup the #of subbasin and PFR for PFR-heatmap
            // if (i<5) alert("L.642 whichNode: \n"+ JSON.stringify(whichNode));
            // if (i<20) alert("L.647 val: \n"+ JSON.stringify(PFR_meanVals_array[oneMap].val));//E: For test
            // if (i<5) alert("L.648 val[whichNode]: \n"+ JSON.stringify(PFR_meanVals_array[oneMap].val[whichNode]));//E: For test
            // var sb_match = find(PFR_meanVals_array[oneMap].val,'name', Number(whichNode));//EE: function at L.994
            var sb_match = find(pfr_map[oneMap].val,'name', Number(whichNode));//EE: function at L.994
            // if (i<1) alert("L.730 sb_match: \n"+ JSON.stringify(sb_match));//E: For test
            // if (i<1) alert("L.730 sb_match: \n"+ typeof (sb_match));//E: For test
            if (i<1) console.log("L.731 val: \n"+ JSON.stringify(pfr_map[oneMap].val));//E: For test
            // if (i<5) alert("L.650 sb_match: \n"+ JSON.stringify(sb_match.val));//E: Get PFR value
            // var pfr_value_sb = sb_match.val;

            // //E: Set list of attributes to show when the event is triggered
            var listAll = 'Sub basin: <strong># ' + whichNode + '</strong><br>PFR = '+sb_match.val+'<br>';
            var obj = {'list': listAll};
            Peakflow.objInfo = obj;

            // google.maps.event.addListener(Peakflow, 'mouseover', function(event) {
            google.maps.event.addListener(Peakflow, 'click', function(event) {
                if(prev_info){prev_info.close();}//E: This work with 'click' event
                var window_info = this.objInfo.list;
                infowindow2 = new google.maps.InfoWindow({//E: it makes a window with information
                    content: window_info,
                    position: event.latLng
                });
                prev_info = infowindow2;
                infowindow2.open(heatmapPF1);//E: The window with information is added to the heatmapPF1.
            });

            // // //E: NOT NEEDED for 'click' event only for mouseover event
            // // //E: Hide the infowindow when user mouses-out. Comment this part for 'click' event
            // google.maps.event.addListener(Peakflow,'mouseout', function() {
            //     infowindow2.close();
            // });

            Peakflow_Array.push(Peakflow);//E: This array contains all the 130 subbasins colored-polygons for pfr-heatmap
        }
        return Peakflow_Array;//E: This array is used below in 'Slide' part to be removed and set either max-pfr or min-pfr map
    }
    // ----------------  End: dohearPF1() ----------------


    //---------------- Start: Slider ------------------ //
    //E: create all DOMs for slide
    var slide_frame = document.createElement('DIV'); //E: This DIV will host the units description
    slide_frame.className = 'slide_frame';
    // slide_frame.innerHTML = "This is SLIDER DIV";

    var slidecontainer = document.createElement('DIV');
    slidecontainer.id = 'slidecontainer';
    slidecontainer.className = 'slidecontainer';

    var input_slide = document.createElement("INPUT");
    input_slide.id = 'myRange';
    input_slide.className = 'slider';
    input_slide.setAttribute("type", "range");
    input_slide.min = 1; input_slide.max = 3; input_slide.step = 1; input_slide.value = 2;

    var sliderticks = document.createElement('DIV');
    sliderticks.className = 'sliderticks';

    var p1 = document.createElement("p"); p1.innerHTML = "Min";
    var p2 = document.createElement("p"); p2.innerHTML = "Mean";
    var p3 = document.createElement("p"); p3.innerHTML = "Max";

    // //E: For test
    // var p4 = document.createElement("p"); p4.innerHTML = "Slide-Value: ";
    // var span1 = document.createElement("SPAN"); span1.id = "slide_value";
    // p4.appendChild(span1);
    // var p5 = document.createElement("p"); p5.innerHTML = "Display: ";
    // var span2 = document.createElement("SPAN"); span2.id = "slide_display";
    // p5.appendChild(span2);

    sliderticks.appendChild(p1);sliderticks.appendChild(p2);sliderticks.appendChild(p3);
    slidecontainer.appendChild(input_slide); slidecontainer.appendChild(sliderticks);
    slide_frame.appendChild(slidecontainer);

    // //E: For test1 and test2
    // slide_frame.appendChild(p4); slide_frame.appendChild(p5);
    // //E: For test1. It shows the input value of slide
    // input_slide.oninput = function(){
    //     span1.innerHTML = input_slide.value
    // };

    //E: It triggers the Min.Mean.or.Max heatmap
    // var null_activate = 0;
    input_slide.onchange = function(){
        switch (input_slide.value) {
            case "1":
                // span2.innerHTML = "Map " + input_slide.value;//E: For Test2
                // null_activate = 1;
                // doheatPF1(PFR_minVals_array);
                for (var i = 0; i < subbasin_json.features.length; i++){
                    pfr_Array[i].setMap(null);//E: IT SETS THE POLYGONS over the BASEMAP
                }

                ressssPF1 = PFR_minVals_array[oneMap].val.map(function(a) {
                    return a.name;
                });

                pfr_Array = doheatPF1(PFR_minVals_array,ressssPF1);
                alert("doheatPF1 MIN");
                break;
            case "2":
                // span2.innerHTML = "Map " + input_slide.value;//E: For Test2
                // null_activate = 1;
                // doheatPF1(PFR_meanVals_array);
                for (var i = 0; i < subbasin_json.features.length; i++){
                    pfr_Array[i].setMap(null);//E: IT SETS THE POLYGONS over the BASEMAP
                }
                ressssPF1 = PFR_meanVals_array[oneMap].val.map(function(a) {
                    return a.name;
                });
                pfr_Array = doheatPF1(PFR_meanVals_array, ressssPF1);
                alert("doheatPF1 Mean");
                break;
            case "3":
                // span2.innerHTML = "Map " + input_slide.value;//E: For Test2
                // null_activate = 1;
                // doheatPF1(PFR_maxVals_array);
                for (var i = 0; i < subbasin_json.features.length; i++){
                    pfr_Array[i].setMap(null);//E: IT SETS THE POLYGONS over the BASEMAP
                }
                ressssPF1 = PFR_maxVals_array[oneMap].val.map(function(a) {
                    return a.name;
                });
                pfr_Array = doheatPF1(PFR_maxVals_array, ressssPF1);
                alert("doheatPF1 MAX");
                break;
            default:
                // span2.innerHTML = "Map " + "default";//E: For Test2
                alert("doheatPF1 DEFAULT");
        }
    };

    // var slide_container = document.getElementById("slidecontainer");
    // slide_frame.appendChild(slide_container);

    heatmapPF1.controls[google.maps.ControlPosition.TOP_RIGHT].push(slide_frame);//TOP_LEFT, TOP_RIGHT, RIGHT_BOTTOM

    //---------------- End: Slider ------------------ //





    // ---------------  Start: doheatRV1() (ORIGINAL) -------------------
    function doheatRV1_ORIGINAL() {

        // var rows = data['rows'];//EE: not needed when json data
        // for (var i in rows) {
        for (var i = 0; i < subbasin_json.features.length; i++) {//EE 'map_data.features.length' = 130 (# of subbasins)
            var newCoordinates = [];
            var whichNode = "";
            //var geometries = rows[i][1]['geometry'];
            //alert (geometries)//newly added code...
            // var row = rows[i];//EE: not needed when json data
            // var whichNode = row[0];
            var whichNode = subbasin_json.properties[i]["Subbasin"].toString();//E: For "ecw" needs to convert to string
            // var whichNode = subbasin_json.properties[i]["Subbasin"];//E: For "Dairy-Mckay"

            //if (i==1) alert("geometry "+i+":"+rows[i][1]['geometry']['coordinates']);
            var newCoordinates = constructNewCoordinates(subbasin_json.features[i].geometry);
            var indexx = ressssRV1.indexOf(Number(whichNode));
            var c_val_current_sb_and_alt = Cost_meanVals_array[oneMap].val[indexx].val;

            // switch (true) {
            //     case (indexx < 0): filterColor = "#ffffff";
            //         break;
            //     case (indexx < 20): filterColor = "#ffff00";
            //         break;
            //     case ((indexx >= 20) && (indexx < 40)): filterColor = "#ffcc00";
            //         break;
            //     case ((indexx >= 40) && (indexx < 70)): filterColor = "#ff9900";
            //         break;
            //     case ((indexx >= 70) && (indexx < 90)): filterColor = "#ff6600";
            //         break;
            //     case (indexx >= 90): filterColor = "#ff3300";
            //         break;
            //     default: filterColor = "#aa9999";//"#ff0000";
            //         break;
            //     //return wetlandsIcon;
            // }

            // // --------- For 7 intervals (1,10,50,100,200,500,1000)

            // switch (true) {
            //     case ((c_val_current_sb_and_alt >= rg_pr[0])&&(c_val_current_sb_and_alt < rg_pr[1])):filterColor = colorList["color1"];//"#ffffff";//
            //         break;
            //     case ((c_val_current_sb_and_alt >= rg_pr[1])&&(c_val_current_sb_and_alt < rg_pr[2])): filterColor = colorList["color2"];//"#ffff00";
            //         break;
            //     case ((c_val_current_sb_and_alt >= rg_pr[2])&&(c_val_current_sb_and_alt < rg_pr[3])): filterColor = colorList["color3"];//"#ffcc00";
            //         break;
            //     case ((c_val_current_sb_and_alt >= rg_pr[3])&&(c_val_current_sb_and_alt < rg_pr[4])): filterColor = colorList["color4"];//"#ff9900";
            //         break;
            //     case ((c_val_current_sb_and_alt >= rg_pr[4])&&(c_val_current_sb_and_alt < rg_pr[5])): filterColor = colorList.color5;//"#ff6600";
            //         break;
            //     case ((c_val_current_sb_and_alt >= rg_pr[5])&&(c_val_current_sb_and_alt < rg_pr[6])): filterColor = colorList["color6"];//"#ff3300";
            //         break;
            //     case ((c_val_current_sb_and_alt >= rg_pr[6])&&(c_val_current_sb_and_alt < rg_pr[7])): filterColor = colorList["color7"];//"#ff0000";
            //         break;
            //     default: filterColor = "#aa9999";//"#ff0000";//"#aa9999";//"#ff0000";//
            //         break;
            // }


            // ////--------- For 3 intervals (high, medium, low)
            // switch (true) {
            //     case ((c_val_current_sb_and_alt >= rg_pr[0])&&(c_val_current_sb_and_alt < rg_pr[1])):filterColor = colorList["color1"];//"#ffffff";//
            //         break;
            //     case ((c_val_current_sb_and_alt >= rg_pr[1])&&(c_val_current_sb_and_alt < rg_pr[2])): filterColor = colorList["color2"];//"#ffff00";
            //         break;
            //     case ((c_val_current_sb_and_alt >= rg_pr[2])&&(c_val_current_sb_and_alt < rg_pr[3])): filterColor = colorList["color3"];//"#ffcc00";
            //         break;
            //     default: filterColor = "#aa9999";//"#ff0000";//"#aa9999";//"#ff0000";//
            //         break;
            // }

            // // --------- For 4 intervals (negative, low, medium, high)
            // switch (true) {
            //     case ((c_val_current_sb_and_alt >= rg_pr[0])&&(c_val_current_sb_and_alt < rg_pr[1])):filterColor = colorList["color0"];//"#ffffff";//
            //         break;
            //     case ((c_val_current_sb_and_alt >= rg_pr[1])&&(c_val_current_sb_and_alt < rg_pr[2])): filterColor = colorList["color1"];//"#ffff00";
            //         break;
            //     case ((c_val_current_sb_and_alt >= rg_pr[2])&&(c_val_current_sb_and_alt < rg_pr[3])): filterColor = colorList["color2"];//"#ffcc00";
            //         break;
            //     case ((c_val_current_sb_and_alt >= rg_pr[3])&&(c_val_current_sb_and_alt < rg_pr[4])): filterColor = colorList["color3"];//"#ffcc00";
            //         break;
            //     default: filterColor = "#aa9999";//"#ff0000";//"#aa9999";//"#ff0000";//
            //         break;
            // }


            // --------- For 20 intervals [,
            //                          ]
            // // var rg_pfr = [0,1,10,20,40]; //E: 4 Intervals
            switch (true) {
                case ((c_val_current_sb_and_alt >rg_pr[0])&&(c_val_current_sb_and_alt <= rg_pr[1])): filterColor = colorList["color1"];//"#ffffff";//
                    break;
                case ((c_val_current_sb_and_alt >rg_pr[1])&&(c_val_current_sb_and_alt <= rg_pr[2])): filterColor = colorList["color2"];//"#ffff00";
                    break;
                case ((c_val_current_sb_and_alt >rg_pr[2])&&(c_val_current_sb_and_alt <= rg_pr[3])): filterColor = colorList["color3"];//"#ffcc00";
                    break;
                case ((c_val_current_sb_and_alt >rg_pr[3])&&(c_val_current_sb_and_alt <=rg_pr[4])): filterColor = colorList["color4"];//"#ffcc00";
                    break;
                case ((c_val_current_sb_and_alt >rg_pr[4])&&(c_val_current_sb_and_alt <=rg_pr[5])): filterColor = colorList["color5"];//"#ffcc00";
                    break;
                case ((c_val_current_sb_and_alt >rg_pr[5])&&(c_val_current_sb_and_alt <=rg_pr[6])): filterColor = colorList["color6"];//"#ffcc00";
                    break;
                case ((c_val_current_sb_and_alt >rg_pr[6])&&(c_val_current_sb_and_alt <=rg_pr[7])): filterColor = colorList["color7"];//"#ffcc00";
                    break;
                case ((c_val_current_sb_and_alt >rg_pr[7])&&(c_val_current_sb_and_alt <=rg_pr[8])): filterColor = colorList["color8"];//"#ffcc00";
                    break;
                case ((c_val_current_sb_and_alt >rg_pr[8])&&(c_val_current_sb_and_alt <=rg_pr[9])): filterColor = colorList["color9"];//"#ffcc00";
                    break;
                case ((c_val_current_sb_and_alt >rg_pr[9])&&(c_val_current_sb_and_alt <=rg_pr[10])): filterColor = colorList["color10"];//"#ffcc00";
                    break;
                case ((c_val_current_sb_and_alt >rg_pr[10])&&(c_val_current_sb_and_alt <=rg_pr[11])): filterColor = colorList["color11"];//"#ffcc00";
                    break;
                case ((c_val_current_sb_and_alt >rg_pr[11])&&(c_val_current_sb_and_alt <=rg_pr[12])): filterColor = colorList["color12"];//"#ffcc00";
                    break;
                case ((c_val_current_sb_and_alt >rg_pr[12])&&(c_val_current_sb_and_alt <=rg_pr[13])): filterColor = colorList["color13"];//"#ffcc00";
                    break;
                case ((c_val_current_sb_and_alt >rg_pr[13])&&(c_val_current_sb_and_alt <=rg_pr[14])): filterColor = colorList["color14"];//"#ffcc00";
                    break;
                case ((c_val_current_sb_and_alt >rg_pr[14])&&(c_val_current_sb_and_alt <=rg_pr[15])): filterColor = colorList["color15"];//"#ffcc00";
                    break;
                case ((c_val_current_sb_and_alt >rg_pr[15])&&(c_val_current_sb_and_alt <=rg_pr[16])): filterColor = colorList["color16"];//"#ffcc00";
                    break;
                case ((c_val_current_sb_and_alt >rg_pr[16])&&(c_val_current_sb_and_alt <=rg_pr[17])): filterColor = colorList["color17"];//"#ffcc00";
                    break;
                case ((c_val_current_sb_and_alt >rg_pr[17])&&(c_val_current_sb_and_alt <=rg_pr[18])): filterColor = colorList["color18"];//"#ffcc00";
                    break;
                case ((c_val_current_sb_and_alt >rg_pr[18])&&(c_val_current_sb_and_alt <=rg_pr[19])): filterColor = colorList["color19"];//"#ffcc00";
                    break;
                case ((c_val_current_sb_and_alt >rg_pr[19])&&(c_val_current_sb_and_alt <=rg_pr[20])): filterColor = colorList["color20"];//"#ffcc00";
                    break;
                default: filterColor = "#aa9999";//"#ff0000";//"#aa9999";//"#ff0000";//
                    break;
            }


            var whichNode = subbasin_json.properties[i]["Subbasin"].toString();//E: "ecw" needs to convert to string
            // var whichNode = subbasin_json.properties[i]["Subbasin"];//E: For "Dairy-Mckay"
            ERevenue = new google.maps.Polygon({
                path: newCoordinates,
                //strokeColor: colors[0],
                strokeOpacity: .4,
                strokeWeight: 1,
                fillOpacity: 1,
                fillColor: filterColor,
                indexID: whichNode,
                clickable: true
            });

            ERevenue.setMap(heatmapRV1);
        } // JavaScript Document
    }
    // --------------  End: doheatRV1() (ORIGINAL) ----------------



    // ---------------  Start: doheatRV1() (MODIFIED) -------------------
    function doheatRV1(rv_map, ressssRV1) {//E: (Modified)

        // var rows = data['rows'];//EE: not needed when json data
        // for (var i in rows) {
        var profit_Array = [];
        var prev_info = false;//E: This variable is employed to popup (open) the #of sb and PFR one at a time (L.659)
        for (var i = 0; i < subbasin_json.features.length; i++) {//EE 'map_data.features.length' = 130 (# of subbasins)
            var newCoordinates = [];
            var whichNode = "";
            //var geometries = rows[i][1]['geometry'];
            //alert (geometries)//newly added code...
            // var row = rows[i];//EE: not needed when json data
            // var whichNode = row[0];
            var whichNode = subbasin_json.properties[i]["Subbasin"].toString();//E: For "ecw" needs to convert to string
            // var whichNode = subbasin_json.properties[i]["Subbasin"];//E: For "Dairy-Mckay"

            //if (i==1) alert("geometry "+i+":"+rows[i][1]['geometry']['coordinates']);
            var newCoordinates = constructNewCoordinates(subbasin_json.features[i].geometry);
            var indexx = ressssRV1.indexOf(Number(whichNode));
            var c_val_current_sb_and_alt = Cost_meanVals_array[oneMap].val[indexx].val;

            // switch (true) {
            //     case (indexx < 0): filterColor = "#ffffff";
            //         break;
            //     case (indexx < 20): filterColor = "#ffff00";
            //         break;
            //     case ((indexx >= 20) && (indexx < 40)): filterColor = "#ffcc00";
            //         break;
            //     case ((indexx >= 40) && (indexx < 70)): filterColor = "#ff9900";
            //         break;
            //     case ((indexx >= 70) && (indexx < 90)): filterColor = "#ff6600";
            //         break;
            //     case (indexx >= 90): filterColor = "#ff3300";
            //         break;
            //     default: filterColor = "#aa9999";//"#ff0000";
            //         break;
            //     //return wetlandsIcon;
            // }

            // --------- For 7 intervals (1,10,50,100,200,500,1000)
            switch (true) {
                case ((c_val_current_sb_and_alt > rg_pr[0])&&(c_val_current_sb_and_alt <= rg_pr[1])):filterColor = colorList["color1"];//"#ffffff";//
                    break;
                case ((c_val_current_sb_and_alt > rg_pr[1])&&(c_val_current_sb_and_alt <= rg_pr[2])): filterColor = colorList["color2"];//"#ffff00";
                    break;
                case ((c_val_current_sb_and_alt > rg_pr[2])&&(c_val_current_sb_and_alt <= rg_pr[3])): filterColor = colorList["color3"];//"#ffcc00";
                    break;
                case ((c_val_current_sb_and_alt > rg_pr[3])&&(c_val_current_sb_and_alt <= rg_pr[4])): filterColor = colorList["color4"];//"#ff9900";
                    break;
                case ((c_val_current_sb_and_alt > rg_pr[4])&&(c_val_current_sb_and_alt <= rg_pr[5])): filterColor = colorList.color5;//"#ff6600";
                    break;
                case ((c_val_current_sb_and_alt > rg_pr[5])&&(c_val_current_sb_and_alt <= rg_pr[6])): filterColor = colorList["color6"];//"#ff3300";
                    break;
                case ((c_val_current_sb_and_alt > rg_pr[6])&&(c_val_current_sb_and_alt <= rg_pr[7])): filterColor = colorList["color7"];//"#ff0000";
                    break;
                default: filterColor = "#aa9999";//"#ff0000";//"#aa9999";//"#ff0000";//
                    break;
            }


            // ////--------- For 3 intervals (high, medium, low)
            // switch (true) {
            //     case ((c_val_current_sb_and_alt >= rg_pr[0])&&(c_val_current_sb_and_alt < rg_pr[1])):filterColor = colorList["color1"];//"#ffffff";//
            //         break;
            //     case ((c_val_current_sb_and_alt >= rg_pr[1])&&(c_val_current_sb_and_alt < rg_pr[2])): filterColor = colorList["color2"];//"#ffff00";
            //         break;
            //     case ((c_val_current_sb_and_alt >= rg_pr[2])&&(c_val_current_sb_and_alt < rg_pr[3])): filterColor = colorList["color3"];//"#ffcc00";
            //         break;
            //     default: filterColor = "#aa9999";//"#ff0000";//"#aa9999";//"#ff0000";//
            //         break;
            // }

            // // --------- For 4 intervals (negative, low, medium, high)
            // switch (true) {
            //     case ((c_val_current_sb_and_alt >= rg_pr[0])&&(c_val_current_sb_and_alt < rg_pr[1])):filterColor = colorList["color0"];//"#ffffff";//
            //         break;
            //     case ((c_val_current_sb_and_alt >= rg_pr[1])&&(c_val_current_sb_and_alt < rg_pr[2])): filterColor = colorList["color1"];//"#ffff00";
            //         break;
            //     case ((c_val_current_sb_and_alt >= rg_pr[2])&&(c_val_current_sb_and_alt < rg_pr[3])): filterColor = colorList["color2"];//"#ffcc00";
            //         break;
            //     case ((c_val_current_sb_and_alt >= rg_pr[3])&&(c_val_current_sb_and_alt < rg_pr[4])): filterColor = colorList["color3"];//"#ffcc00";
            //         break;
            //     default: filterColor = "#aa9999";//"#ff0000";//"#aa9999";//"#ff0000";//
            //         break;
            // }

            // // --------- For 20 intervals [    ]
            // switch (true) {
            //     case ((c_val_current_sb_and_alt >rg_pr[0])&&(c_val_current_sb_and_alt <= rg_pr[1])): filterColor = colorList["color1"];//"#ffffff";//
            //         break;
            //     case ((c_val_current_sb_and_alt >rg_pr[1])&&(c_val_current_sb_and_alt <= rg_pr[2])): filterColor = colorList["color2"];//"#ffff00";
            //         break;
            //     case ((c_val_current_sb_and_alt >rg_pr[2])&&(c_val_current_sb_and_alt <= rg_pr[3])): filterColor = colorList["color3"];//"#ffcc00";
            //         break;
            //     case ((c_val_current_sb_and_alt >rg_pr[3])&&(c_val_current_sb_and_alt <=rg_pr[4])): filterColor = colorList["color4"];//"#ffcc00";
            //         break;
            //     case ((c_val_current_sb_and_alt >rg_pr[4])&&(c_val_current_sb_and_alt <=rg_pr[5])): filterColor = colorList["color5"];//"#ffcc00";
            //         break;
            //     case ((c_val_current_sb_and_alt >rg_pr[5])&&(c_val_current_sb_and_alt <=rg_pr[6])): filterColor = colorList["color6"];//"#ffcc00";
            //         break;
            //     case ((c_val_current_sb_and_alt >rg_pr[6])&&(c_val_current_sb_and_alt <=rg_pr[7])): filterColor = colorList["color7"];//"#ffcc00";
            //         break;
            //     case ((c_val_current_sb_and_alt >rg_pr[7])&&(c_val_current_sb_and_alt <=rg_pr[8])): filterColor = colorList["color8"];//"#ffcc00";
            //         break;
            //     case ((c_val_current_sb_and_alt >rg_pr[8])&&(c_val_current_sb_and_alt <=rg_pr[9])): filterColor = colorList["color9"];//"#ffcc00";
            //         break;
            //     case ((c_val_current_sb_and_alt >rg_pr[9])&&(c_val_current_sb_and_alt <=rg_pr[10])): filterColor = colorList["color10"];//"#ffcc00";
            //         break;
            //     case ((c_val_current_sb_and_alt >rg_pr[10])&&(c_val_current_sb_and_alt <=rg_pr[11])): filterColor = colorList["color11"];//"#ffcc00";
            //         break;
            //     case ((c_val_current_sb_and_alt >rg_pr[11])&&(c_val_current_sb_and_alt <=rg_pr[12])): filterColor = colorList["color12"];//"#ffcc00";
            //         break;
            //     case ((c_val_current_sb_and_alt >rg_pr[12])&&(c_val_current_sb_and_alt <=rg_pr[13])): filterColor = colorList["color13"];//"#ffcc00";
            //         break;
            //     case ((c_val_current_sb_and_alt >rg_pr[13])&&(c_val_current_sb_and_alt <=rg_pr[14])): filterColor = colorList["color14"];//"#ffcc00";
            //         break;
            //     case ((c_val_current_sb_and_alt >rg_pr[14])&&(c_val_current_sb_and_alt <=rg_pr[15])): filterColor = colorList["color15"];//"#ffcc00";
            //         break;
            //     case ((c_val_current_sb_and_alt >rg_pr[15])&&(c_val_current_sb_and_alt <=rg_pr[16])): filterColor = colorList["color16"];//"#ffcc00";
            //         break;
            //     case ((c_val_current_sb_and_alt >rg_pr[16])&&(c_val_current_sb_and_alt <=rg_pr[17])): filterColor = colorList["color17"];//"#ffcc00";
            //         break;
            //     case ((c_val_current_sb_and_alt >rg_pr[17])&&(c_val_current_sb_and_alt <=rg_pr[18])): filterColor = colorList["color18"];//"#ffcc00";
            //         break;
            //     case ((c_val_current_sb_and_alt >rg_pr[18])&&(c_val_current_sb_and_alt <=rg_pr[19])): filterColor = colorList["color19"];//"#ffcc00";
            //         break;
            //     case ((c_val_current_sb_and_alt >rg_pr[19])&&(c_val_current_sb_and_alt <=rg_pr[20])): filterColor = colorList["color20"];//"#ffcc00";
            //         break;
            //     default: filterColor = "#aa9999";//"#ff0000";//"#aa9999";//"#ff0000";//
            //         break;
            // }


            var whichNode = subbasin_json.properties[i]["Subbasin"].toString();//E: "ecw" needs to convert to string
            // var whichNode = subbasin_json.properties[i]["Subbasin"];//E: For "Dairy-Mckay"
            ERevenue = new google.maps.Polygon({
                path: newCoordinates,
                //strokeColor: colors[0],
                strokeOpacity: .4,
                strokeWeight: 1,
                fillOpacity: 1,
                fillColor: filterColor,
                indexID: whichNode,
                clickable: true
            });

            ERevenue.setMap(heatmapRV1);

            // --------- E: Added to pop-up the # of sub basin -----------
            // //E: Add event to popup the #of subbasin and PFR for PFR-heatmap
            // if (i<5) alert("L.642 whichNode: \n"+ JSON.stringify(whichNode));
            // if (i<20) alert("L.647 val: \n"+ JSON.stringify(PFR_meanVals_array[oneMap].val));//E: For test
            // if (i<5) alert("L.648 val[whichNode]: \n"+ JSON.stringify(PFR_meanVals_array[oneMap].val[whichNode]));//E: For test
            // var sb_match = find(PFR_meanVals_array[oneMap].val,'name', Number(whichNode));//
            var sb_match = find(rv_map[oneMap].val,'name', Number(whichNode));//EE:
            // if (i<1) alert("L.730 sb_match: \n"+ JSON.stringify(sb_match));//E: For test
            // if (i<1) alert("L.730 sb_match: \n"+ typeof (sb_match));//E: For test
            if (i<1) console.log("L.1201 val: \n"+ JSON.stringify(rv_map[oneMap].val));//E: For test
            // if (i<5) alert("L.650 sb_match: \n"+ JSON.stringify(sb_match.val));//E: Get PFR value
            // var pfr_value_sb = sb_match.val;

            // //E: Set list of attributes to show when the event is triggered
            var listAll = 'Sub basin: <strong># ' + whichNode + '</strong><br>PFR = '+sb_match.val+'<br>';
            var obj = {'list': listAll};
            ERevenue.objInfo = obj;

            // google.maps.event.addListener(Peakflow, 'mouseover', function(event) {
            google.maps.event.addListener(ERevenue, 'click', function(event) {
                if(prev_info){prev_info.close();}//E: This work with 'click' event
                var window_info = this.objInfo.list;
                infowindow2 = new google.maps.InfoWindow({//E: it makes a window with information
                    content: window_info,
                    position: event.latLng
                });
                prev_info = infowindow2;
                infowindow2.open(heatmapRV1);//E: The window with information is added to the heatmapPF1.
            });

            // // //E: NOT NEEDED for 'click' event only for mouseover event
            // // //E: Hide the infowindow when user mouses-out. Comment this part for 'click' event
            // google.maps.event.addListener(Peakflow,'mouseout', function() {
            //     infowindow2.close();
            // });

            profit_Array.push(ERevenue);//E: This array contains all the 130 subbasins colored-polygons for pfr-heatmap
        } // JavaScript Document
        return profit_Array;//E: This array is used below in 'Slide' part to be removed and set either max-pfr or min-pfr map
    }
    // --------------  End: doheatRV1() (MODIFIED) ----------------





    // --------------  Start: doheatSR1() ----------------
    function doheatSR1() {

        for (var i = 0; i < subbasin_json.features.length; i++) {//EE 'map_data.features.length' = 130 (# of subbasins)
            var newCoordinates = [];
            var whichNode = "";
            //alert (geometries)//newly added code...

            var whichNode = subbasin_json.properties[i]["Subbasin"].toString();//E: For "ecw" needs to convert to string
            // var whichNode = subbasin_json.properties[i]["Subbasin"];//E: For "Dairy-Mckay"

            //if (i==1) alert("geometry "+i+":"+rows[i][1]['geometry']['coordinates']);
            var newCoordinates = constructNewCoordinates(subbasin_json.features[i].geometry);
            var indexx = ressssSR1.indexOf(Number(whichNode));
            var sr_val_current_sb_and_alt = SR_meanVals_array[oneMap].val[indexx].val;

            // switch (true) {
            //     case (indexx < 0):filterColor = "#ffffff";
            //         break;
            //     case (indexx < 20):filterColor = "#ffff00";
            //         break;
            //     case ((indexx >= 20) && (indexx < 40)):filterColor = "#ffcc00";
            //         break;
            //     case ((indexx >= 40) && (indexx < 70)):filterColor = "#ff9900";
            //         break;
            //     case ((indexx >= 70) && (indexx < 90)):filterColor = "#ff6600";
            //         break;
            //     case (indexx >= 90):filterColor = "#ff3300";
            //         break;
            //     default:filterColor = "#ff0000";
            //         break;
            //     //return wetlandsIcon;
            // }

            // // --------- For 7 intervals (1,10,50,100,200,500,1000)

            // switch (true) {
            //     case ((sr_val_current_sb_and_alt >= rg_sr[0])&&(sr_val_current_sb_and_alt < rg_sr[1])):filterColor = colorList["color1"];//"#ffffff";//
            //         break;
            //     case ((sr_val_current_sb_and_alt >= rg_sr[1])&&(sr_val_current_sb_and_alt < rg_sr[2])): filterColor = colorList["color2"];//"#ffff00";
            //         break;
            //     case ((sr_val_current_sb_and_alt >= rg_sr[2])&&(sr_val_current_sb_and_alt < rg_sr[3])): filterColor = colorList["color3"];//"#ffcc00";
            //         break;
            //     case ((sr_val_current_sb_and_alt >= rg_sr[3])&&(sr_val_current_sb_and_alt < rg_sr[4])): filterColor = colorList["color4"];//"#ff9900";
            //         break;
            //     case ((sr_val_current_sb_and_alt >= rg_sr[4])&&(sr_val_current_sb_and_alt < rg_sr[5])): filterColor = colorList.color5;//"#ff6600";
            //         break;
            //     case ((sr_val_current_sb_and_alt >= rg_sr[5])&&(sr_val_current_sb_and_alt < rg_sr[6])): filterColor = colorList["color6"];//"#ff3300";
            //         break;
            //     case ((sr_val_current_sb_and_alt >= rg_sr[6])&&(sr_val_current_sb_and_alt < rg_sr[7])): filterColor = colorList["color7"];//"#ff0000";
            //         break;
            //     default: filterColor = "#aa9999";//"#ff0000";//"#aa9999";//"#ff0000";//
            //         break;
            // }

            // --------- For 3 intervals (high, medium, low)

            switch (true) {
                case ((sr_val_current_sb_and_alt >= rg_sr[0])&&(sr_val_current_sb_and_alt < rg_sr[1])):filterColor = colorList["color1"];//"#ffffff";//
                    break;
                case ((sr_val_current_sb_and_alt >= rg_sr[1])&&(sr_val_current_sb_and_alt < rg_sr[2])): filterColor = colorList["color2"];//"#ffff00";
                    break;
                case ((sr_val_current_sb_and_alt >= rg_sr[2])&&(sr_val_current_sb_and_alt < rg_sr[3])): filterColor = colorList["color3"];//"#ffcc00";
                    break;
                default: filterColor = "#aa9999";//"#ff0000";//"#aa9999";//"#ff0000";//
                    break;
            }

            var whichNode = subbasin_json.properties[i]["Subbasin"].toString();//E:"ecw" needs to converto string
            // var whichNode = subbasin_json.properties[i]["Subbasin"];//E: For "Dairy-Mckay"
            Sediments = new google.maps.Polygon({
                path: newCoordinates,
                //strokeColor: colors[0],
                strokeOpacity: .4,
                strokeWeight: 1,
                fillOpacity: 1,
                fillColor: filterColor,
                indexID: whichNode,
                clickable: true
            });

            Sediments.setMap(heatmapSR1);
        }
    }
    // --------------  End: doheatSR1() ----------------

    // -------------- Start: doheatNR1() ----------------
    function doheatNR1() {
        for (var i = 0; i < subbasin_json.features.length; i++) {//EE 'map_data.features.length' = 130 (# of subbasins)
            var newCoordinates = [];
            var whichNode = "";

            var whichNode = subbasin_json.properties[i]["Subbasin"].toString();//EE:For "ecw" needs to convert to string
            // var whichNode = subbasin_json.properties[i]["Subbasin"];//E: For "Dairy-Mckay"

            //if (i==1) alert("geometry "+i+":"+rows[i][1]['geometry']['coordinates']);
            var newCoordinates = constructNewCoordinates(subbasin_json.features[i].geometry);
            var indexx = ressssNR1.indexOf(Number(whichNode));
            var nr_val_current_sb_and_alt = NR_meanVals_array[oneMap].val[indexx].val;

            // switch (true) {
            //     case (indexx < 0):filterColor = "#ffffff";
            //         break;
            //     case (indexx < 20):filterColor = "#ffff00";
            //         break;
            //     case ((indexx >= 20) && (indexx < 40)):filterColor = "#ffcc00";
            //         break;
            //     case ((indexx >= 40) && (indexx < 70)):filterColor = "#ff9900";
            //         break;
            //     case ((indexx >= 70) && (indexx < 90)):filterColor = "#ff6600";
            //         break;
            //     case (indexx >= 90):filterColor = "#ff3300";
            //         break;
            //     default:filterColor = "#ff0000";
            //         break;
            // }

            // // --------- For 7 intervals (1,10,50,100,200,500,1000)

            // switch (true) {
            //     case ((nr_val_current_sb_and_alt >= rg_nr[0])&&(nr_val_current_sb_and_alt < rg_nr[1])):filterColor = colorList["color1"];//"#ffffff";//
            //         break;
            //     case ((nr_val_current_sb_and_alt >= rg_nr[1])&&(nr_val_current_sb_and_alt < rg_nr[2])): filterColor = colorList["color2"];//"#ffff00";
            //         break;
            //     case ((nr_val_current_sb_and_alt >= rg_nr[2])&&(nr_val_current_sb_and_alt < rg_nr[3])): filterColor = colorList["color3"];//"#ffcc00";
            //         break;
            //     case ((nr_val_current_sb_and_alt >= rg_nr[3])&&(nr_val_current_sb_and_alt < rg_nr[4])): filterColor = colorList["color4"];//"#ff9900";
            //         break;
            //     case ((nr_val_current_sb_and_alt >= rg_nr[4])&&(nr_val_current_sb_and_alt < rg_nr[5])): filterColor = colorList.color5;//"#ff6600";
            //         break;
            //     case ((nr_val_current_sb_and_alt >= rg_nr[5])&&(nr_val_current_sb_and_alt < rg_nr[6])): filterColor = colorList["color6"];//"#ff3300";
            //         break;
            //     case ((nr_val_current_sb_and_alt >= rg_nr[6])&&(nr_val_current_sb_and_alt < rg_nr[7])): filterColor = colorList["color7"];//"#ff0000";
            //         break;
            //     default: filterColor = "#aa9999";//"#ff0000";//"#aa9999";//"#ff0000";//
            //         break;
            // }

            // --------- For 3 intervals (high, medium, low)

            switch (true) {
                case ((nr_val_current_sb_and_alt >= rg_nr[0])&&(nr_val_current_sb_and_alt < rg_nr[1])):filterColor = colorList["color1"];//"#ffffff";//
                    break;
                case ((nr_val_current_sb_and_alt >= rg_nr[1])&&(nr_val_current_sb_and_alt < rg_nr[2])): filterColor = colorList["color2"];//"#ffff00";
                    break;
                case ((nr_val_current_sb_and_alt >= rg_nr[2])&&(nr_val_current_sb_and_alt < rg_nr[3])): filterColor = colorList["color3"];//"#ffcc00";
                    break;
                default: filterColor = "#aa9999";//"#ff0000";//"#aa9999";//"#ff0000";//
                    break;
            }

            var whichNode = subbasin_json.properties[i]["Subbasin"].toString();//EE:For "ecw" needs to convert to string
            // var whichNode = subbasin_json.properties[i]["Subbasin"];//E: For "Dairy-Mckay"
            Nitrates = new google.maps.Polygon({
                path: newCoordinates,
                //strokeColor: colors[0],
                strokeOpacity: .4,
                strokeWeight: 1,
                fillOpacity: 1,
                fillColor: filterColor,
                indexID: whichNode,
                clickable: true
            });
            Nitrates.setMap(heatmapNR1);
        }
    }
    // -------------- End: doheatNR1() ----------------
    // ============== End: Draw (doheatPF1,"drawHeatPF1", doheatPF2, "drawHeatPF2") ============ //


    // // ================= E: START: This part creates heatmap-LEGENDS (Not in use)  ======================= //
    // // -------------  F3: This appears into the heatmap but not when it fullscreens (deprecated) ---------------//
    // var colorList = {color1: '#ffffff', color2: '#ffff00', color3: '#ffcc00', color4: '#ff9900', color5: '#ff6600', color6: '#ff3300', color7: '#ff0000'};
    //
    // colorize = function(colorList, min_v, max_v, map_s) {
    //     min_v = Math.trunc(min_v);
    //     var container = document.getElementById(map_s); // <----- 'oneMapPF'
    //
    //     var len_arr = Object.keys(colorList).length;
    //     var range2 = (max_v-min_v)/len_arr;
    //     var i = 0;
    //
    //     for (var key in colorList) {
    //         var boxContainer = document.createElement("DIV");
    //         var box = document.createElement("DIV");
    //         var label = document.createElement("SPAN");
    //
    //         var range_inf2 = min_v + Math.ceil(i*range2); // Get the low value of range
    //         var range_sup2 = min_v + Math.ceil((i+1)*range2); // Get the high value of range
    //
    //         boxContainer.appendChild(box);
    //         boxContainer.appendChild(label);
    //         container.appendChild(boxContainer);
    //
    //         label.innerHTML = range_inf2 + ' to ' + range_sup2;// + ' cfs';
    //         label.className = "label";
    //         box.className = "box";
    //         box.style.backgroundColor = colorList[key];
    //         // boxContainer.id = "box_container";
    //         boxContainer.className = "box_container";
    //         i += 1;
    //     }
    // };
    //
    // // colorize(colorList, min_value_PF1, max_value_PF1,'oneMapPF');
    // for (i = 0; i < min_values.length; i++) {
    //     colorize(colorList, min_values[i], max_values[i],maps[i]);
    // }
    // // ====================   END: heat-map legend funtions  ==================== //


}
// ======================== E: End: heatinitialize () function ==================== //


// ========================= E: Start: find() function, called at L.646 ======================//
function find(arr, key, value) {
    for (var i = 0, l = arr.length; i < l; i++) {
        if (arr[i][key] === value) {
            return arr[i];
        }
    }
    // return {}; // if you would want it null-safe
}
// ========================= E: End: find() function, called at ======================//


// // ========================= (*)  Begin highlight Sub-basin  ============/////////
// //E: This function activates by default the whole watershed border (called Subbasin 0)

// function add_sb0_pfrhm(n_sb,hm) {//E: n_sb=131 (because of ecw has 130 subbasins)
//     for (i=0; i < n_sb; i++){
//         var sb_null = eval("poly_sbhm"+i);//E: convert a string into a variable name
//         sb_null.setMap(null);
//     }
//     polyg_pfr0.setMap(hm);
// }


// --------------- Start: PFR function to highlight the sub-basin when selected ------------- //
//E: This function deactivates all subbasins, and activates the selected subbasin (from 1-130 for ecw)
//E: This function is called from g2.php (L.510)

function select_sb_heatmap_pfr(){
    var n_sb = 131;//EE: 130 for ecw

    var selected_sb = subDrop[subDrop.selectedIndex].value;
    if (selected_sb == "Watershed") {
        // alert("Selected pfr: ----- "+ selected_sb);
        for (i=0; i < n_sb; i++){
            var sb_null = eval("polyg_pfr"+i);//E: convert a string into a variable name
            sb_null.setMap(null);//E: turn-off all subbasins
        }
        // var sb_act = eval("poly_sb"+number_sb);//E: turn-on the selected subbasin
        // alert("L.764: "+ selected_sb);
        polyg_pfr0.setMap(heatmapPF1);
    }
    else {
        var number_sb = selected_sb.match(/\d/g).join("");//E: Get number part of the string for ex. "subbasin 1", get 1
        for (i=0; i<n_sb;i++){
            var sb_null = eval("polyg_pfr"+i);//E: convert a string into a variable name
            sb_null.setMap(null);//E: turn-off all subbasins
        }
        var sb_act = eval("polyg_pfr"+number_sb);//E: turn-on the selected subbasin
        // alert("L.1536: sub-basin selected:  "+ number_sb);
        sb_act.setMap(heatmapPF1);
    }
}
// --------------- End: PFR function to highlight the sub-basin when selected ------------- //

// --------------- Start: RV function to highlight the sub-basin when selected ------------- //
//E: this function is called from "g2.php (L.510)"
function select_sb_heatmap_rv(){
    var n_sb = 131;//EE: 130 for ecw

    var selected_sbrv = subDrop[subDrop.selectedIndex].value;
    if (selected_sbrv == "Watershed") {
        // alert("Selected rv: ----- "+ selected_sb);
        for (i=0; i < n_sb; i++){
            var sb_null = eval("polyg_rv"+i);//E: convert a string into a variable name
            sb_null.setMap(null);//E: turn-off all subbasins
        }
        polyg_rv0.setMap(heatmapRV1);
    }
    else {
        var number_sb = selected_sbrv.match(/\d/g).join("");//E: Get number part of the string for ex. "subbasin 1", get 1
        for (i=0; i<n_sb;i++){
            var sb_null = eval("polyg_rv"+i);//E: convert a string into a variable name
            sb_null.setMap(null);//E: turn-off all subbasins
        }
        var sb_actrv = eval("polyg_rv"+number_sb);//E: turn-on the selected subbasin
        // alert("L.1536: sub-basin selected:  "+ number_sb);
        sb_actrv.setMap(heatmapRV1);
    }
}
// --------------- End: RV function to highlight the sub-basin when selected ------------- //


// --------------- Start: SR function to highlight the sub-basin when selected ------------- //
//E: This function deactivates all subbasins, and activates the selected subbasin (from 1-130 for ecw)
//E: This function is called from g2.php (L.510)

function select_sb_heatmap_sr(){
    var n_sb = 131;//EE: 130 for ecw

    var selected_sb = subDrop[subDrop.selectedIndex].value;
    if (selected_sb == "Watershed") {
        // alert("Selected pfr: ----- "+ selected_sb);
        for (i=0; i < n_sb; i++){
            var sb_null = eval("polyg_sr"+i);//E: convert a string into a variable name
            sb_null.setMap(null);//E: turn-off all subbasins
        }
        // var sb_act = eval("poly_sb"+number_sb);//E: turn-on the selected subbasin
        // alert("L.764: "+ selected_sb);
        polyg_sr0.setMap(heatmapSR1);
    }
    else {
        var number_sb = selected_sb.match(/\d/g).join("");//E: Get number part of the string for ex. "subbasin 1", get 1
        for (i=0; i<n_sb;i++){
            var sb_null = eval("polyg_sr"+i);//E: convert a string into a variable name
            sb_null.setMap(null);//E: turn-off all subbasins
        }
        var sb_act = eval("polyg_sr"+number_sb);//E: turn-on the selected subbasin
        // alert("L.1536: sub-basin selected:  "+ number_sb);
        sb_act.setMap(heatmapSR1);
    }
}
// --------------- End: SR function to highlight the sub-basin when selected ------------- //


// --------------- Start: NR function to highlight the sub-basin when selected ------------- //
//E: This function deactivates all subbasins, and activates the selected subbasin (from 1-130 for ecw)
//E: This function is called from g2.php (L.510)

function select_sb_heatmap_nr(){
    var n_sb = 131;//EE: 130 for ecw

    var selected_sb = subDrop[subDrop.selectedIndex].value;
    if (selected_sb == "Watershed") {
        // alert("Selected pfr: ----- "+ selected_sb);
        for (i=0; i < n_sb; i++){
            var sb_null = eval("polyg_nr"+i);//E: convert a string into a variable name
            sb_null.setMap(null);//E: turn-off all subbasins
        }
        // var sb_act = eval("poly_sb"+number_sb);//E: turn-on the selected subbasin
        // alert("L.764: "+ selected_sb);
        polyg_nr0.setMap(heatmapNR1);
    }
    else {
        var number_sb = selected_sb.match(/\d/g).join("");//E: Get number part of the string for ex. "subbasin 1", get 1
        for (i=0; i<n_sb;i++){
            var sb_null = eval("polyg_nr"+i);//E: convert a string into a variable name
            sb_null.setMap(null);//E: turn-off all subbasins
        }
        var sb_act = eval("polyg_nr"+number_sb);//E: turn-on the selected subbasin
        // alert("L.1536: sub-basin selected:  "+ number_sb);
        sb_act.setMap(heatmapNR1);
    }
}
// --------------- End: NR function to highlight the sub-basin when selected ------------- //

// =================================== (*) End highlight Sub-basin  =============================//

