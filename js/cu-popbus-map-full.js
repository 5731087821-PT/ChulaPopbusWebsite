// JavaScript Document
Parse.initialize("egbuQBruXEK6g00FQgUxC9qj8C4t1soS839nTX8p", "2hVdRsd4QmioSo5tk05u3IA0Nh2xCkhNF13FKhae");

$(document).ready(function() {



	$(".logo").on("mouseenter", function() {
		TweenMax.to($(this), 0.5, {autoAlpha: 0, ease:Quad.easeOut});
		TweenMax.to($(".logo-mover"), 0.5, {autoAlpha: 1, ease:Quad.easeOut});
	});
	$(".logo").on("mouseleave", function() {
		TweenMax.to($(this), 0.5, {autoAlpha: 1, ease:Quad.easeOut});
		TweenMax.to($(".logo-mover"), 0.5, {autoAlpha: 0, ease:Quad.easeOut});
	});

	$(".map-wrap .route .back").on("mouseenter", function() {
		TweenMax.to($(this), 0.3, {autoAlpha: 1, ease:Quad.easeOut});
	});
	$(".map-wrap .route .back").on("mouseleave", function() {
		TweenMax.to($(this), 0.3, {autoAlpha: 0.75, ease:Quad.easeOut});
	});

	//GOOGLE-MAP-API
	var active_route = [1, 1, 1, 1, 1, 1];

	var bus_color = [
		'rgba(224,75,63,1.00)',
		'rgba(51,119,219,1.00)',
		'rgba(94,178,66,1.00)',
		'rgba(219,197,15,1.00)',
		'rgba(168,30,202,1.00)',
		'rgba(226,90,194,1.00)',
	];

	var map;
	var map_canvas = document.getElementById('map-canvas');
	var map_options = {
		center: new google.maps.LatLng(13.739036, 100.529875),
		zoom: 16,
		scrollwheel: true,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	map = new google.maps.Map(map_canvas, map_options);

	// Display multiple markers on a map
    var infoWindow = new google.maps.InfoWindow(), marker, i, j;
	var allMarkers = [];

	var markers = [
        ['Salaprakeaw', 13.735581,100.531774,1,2,3,4,5,6],
        ['Faculty of Political Science', 13.734346,100.532809,1,0,3,4,0,0],
		['Patumwan Demonstration School', 13.739323,100.534902,1,0,0,4,0,0],
        ['Faculty of Veterinary Science', 13.741897,100.535293,1,0,0,4,0,0],
		['Chaloemphao Junction', 13.744799,100.535741,1,0,0,4,0,0],
        ['Lido', 13.74582,100.532442,1,0,0,4,0,0],
		['MBK Center', 13.7437,100.530533,1,0,0,4,0,0],
        ['Triamudom Suksa School', 13.740412,100.530008,1,0,0,4,0,0],
		['Faculty of Architecture', 13.739439,100.531055,1,2,3,4,5,6],
		['Faculty of Arts', 13.739039,100.532986,1,2,3,4,5,6],
		['Faculty of Engineering', 13.737499,100.532584,1,2,3,4,5,6],
		['Faculty of Science', 13.737706,100.530546,0,2,3,0,0,0],
		['Faculty of Education', 13.737995,100.528593,0,2,0,4,0,0],
		['Sport Complex', 13.738187,100.526601,0,2,0,4,0,6],
		['Charmchuri 9 Building', 13.736445,100.526296,0,2,0,4,0,6],
		['CU Dharma Centre', 13.739604,100.526243,0,2,0,0,0,0],
		['Vidhayapattana Building', 13.741907,100.52766,0,2,0,0,0,0],
		['Metallic and Material Research Institute PetroChemical College', 13.743236,100.527311,0,2,0,0,0,0],
		['Faculty of Sports Science', 13.743887,100.527982,0,2,0,0,0,0],
		['CU Dormitory', 13.74074,100.527445,0,2,0,0,0,0],
		['CU Office', 13.738911,100.52943,0,2,0,4,5,6],
		['Pop Bus Garage', 13.736331,100.52514,0,2,0,0,0,0],
		['U-Center', 13.735313,100.527302,0,0,0,4,0,6],
		['Faculty of Political Science', 13.734242,100.534033,1,0,3,4,0,0],
		['Faculty of Law', 13.735137,100.5284127,0,0,0,4,0,6],
		['Faculty of Medicine', 13.7329026109075,100.535379052162,0,0,3,0,0,0],
		['Mahitaladhibesra Building', 13.734586,100.531329,0,2,0,0,0,0],
		['Mahamakut Building', 13.735732,100.530825,0,2,0,0,0,0],
		['CU Terrace', 13.740985,100.525227,0,0,0,0,5,6]
    ];

    var infoWindowContent = [];

	var routeCoordinates_1 = [
		//START AT HENRI DUNANT INTERSECTION
		new google.maps.LatLng(13.745209,100.535781),
		new google.maps.LatLng(13.745933,100.531323),
		new google.maps.LatLng(13.745576,100.530872),
		new google.maps.LatLng(13.739698,100.529931),
		new google.maps.LatLng(13.739213,100.532814),
		//START CURVE BOROM BUILDING
		new google.maps.LatLng(13.739179,100.532954),
		new google.maps.LatLng(13.739119,100.533069),
		new google.maps.LatLng(13.739023,100.533147),
		new google.maps.LatLng(13.7389,100.533203),
		//END CURVE BOROM AND START CURVE ENG
		new google.maps.LatLng(13.737764,100.533032),
		new google.maps.LatLng(13.737408,100.532485),
		new google.maps.LatLng(13.73747,100.532088),
		//END CURVE ENG
		new google.maps.LatLng(13.734607,100.531747),
		new google.maps.LatLng(13.734271,100.534060),
		//EXIT TO HENRI
		new google.maps.LatLng(13.745209,100.535781)
		//END
	];

	var routeCoordinates_2 = [
		new google.maps.LatLng(13.737400,100.531908),
		new google.maps.LatLng(13.734647,100.531537),
		new google.maps.LatLng(13.734773,100.530705),
		new google.maps.LatLng(13.736240,100.530929),
		new google.maps.LatLng(13.736145,100.531621),
		new google.maps.LatLng(13.737162,100.531766),
		//START CURVE HOR NA RI GA
		new google.maps.LatLng(13.737196,100.531724),
		new google.maps.LatLng(13.737207,100.531709),
		new google.maps.LatLng(13.737241,100.531706),
		new google.maps.LatLng(13.737264,100.531701),
		//END
		new google.maps.LatLng(13.737434,100.531729),
		new google.maps.LatLng(13.737807,100.529726),
		new google.maps.LatLng(13.738653,100.529882),
		//INTO CU HOR KLANG SIDE
		new google.maps.LatLng(13.738702,100.529451),
		new google.maps.LatLng(13.737859,100.529322),
		new google.maps.LatLng(13.738316 ,100.526626),
		new google.maps.LatLng(13.736528,100.526327),
		//JAM 9 CURVE
		new google.maps.LatLng(13.736417,100.526150),
		new google.maps.LatLng(13.736389,100.52608),
		new google.maps.LatLng(13.736368,100.525973),
		new google.maps.LatLng(13.736355,100.525895),
		new google.maps.LatLng(13.736337,100.52575),
		new google.maps.LatLng(13.736337,100.525637),
		new google.maps.LatLng(13.73636,100.525557),
		new google.maps.LatLng(13.736389,100.525463),
		new google.maps.LatLng(13.736428,100.525366),
		new google.maps.LatLng(13.736467,100.525283),
		new google.maps.LatLng(13.736506,100.525205),
		new google.maps.LatLng(13.736506,100.525205),
		new google.maps.LatLng(13.736631,100.525069),
		new google.maps.LatLng(13.736717,100.52502),
		new google.maps.LatLng(13.736834,100.524983),
		new google.maps.LatLng(13.736931,100.52498),
		new google.maps.LatLng(13.737027,100.525004),
		//END CURVE
		new google.maps.LatLng(13.739325,100.525468),
		//START CURVE GOLF COMPLEX
		new google.maps.LatLng(13.739273,100.525787),
		new google.maps.LatLng(13.739289,100.525812),
		new google.maps.LatLng(13.739323,100.525828),
		new google.maps.LatLng(13.739651,100.525852),
		//END
		new google.maps.LatLng(13.739468,100.527182),
		new google.maps.LatLng(13.74309,100.527896),
		//OUT CU
		new google.maps.LatLng(13.746342,100.528518),
		new google.maps.LatLng(13.746764,100.526737),
		new google.maps.LatLng(13.746466,100.526606),
		new google.maps.LatLng(13.746747,100.525147),
		new google.maps.LatLng(13.744444,100.524685),
		new google.maps.LatLng(13.743891, 100.528000),
		new google.maps.LatLng(13.739941, 100.527242),
		//
		new google.maps.LatLng(13.739932,100.527306),
		new google.maps.LatLng(13.739594,100.529537),
		new google.maps.LatLng(13.738739,100.529419),
		//INTO CU
		new google.maps.LatLng(13.738684,100.529983),
		new google.maps.LatLng(13.739466,100.530123),
		//START CURVE BOROM BUILDING
		new google.maps.LatLng(13.738999,100.532814),
		new google.maps.LatLng(13.738989,100.532889),
		new google.maps.LatLng(13.738913,100.532977),
		new google.maps.LatLng(13.738790,100.533103),
		//END CURVE BOROM BUILDING AND START CURVE ENG
		new google.maps.LatLng(13.737864,100.532952),
		new google.maps.LatLng(13.737508,100.532405),
		new google.maps.LatLng(13.737578,100.531928),
		//END CURVE ENG
		new google.maps.LatLng(13.737400,100.531908)
		//END
	];

	var routeCoordinates_3 = [
		new google.maps.LatLng(13.737400,100.531958),
		new google.maps.LatLng(13.734467,100.531587),
		new google.maps.LatLng(13.734101,100.534188),
		new google.maps.LatLng(13.733108,100.534065),
		new google.maps.LatLng(13.732975,100.535406),
		new google.maps.LatLng(13.733351,100.53546),
		new google.maps.LatLng(13.733267,100.5362),
		new google.maps.LatLng(13.732861,100.536157),
		new google.maps.LatLng(13.733091,100.533925),
		//ENTER FROM HENRI
		new google.maps.LatLng(13.734047,100.534038),
		new google.maps.LatLng(13.734505,100.530608),
		new google.maps.LatLng(13.736180,100.530864),
		new google.maps.LatLng(13.736071,100.531694),
		new google.maps.LatLng(13.737192,100.531846),
		//START CURVE HOR NA RI GA
		new google.maps.LatLng(13.737196,100.531804),
		new google.maps.LatLng(13.737207,100.531779),
		new google.maps.LatLng(13.737241,100.531766),
		new google.maps.LatLng(13.737264,100.531761),
		//END
		new google.maps.LatLng(13.737514,100.531809),
		new google.maps.LatLng(13.737887,100.529816),
		new google.maps.LatLng(13.739603,100.530103),
		//START CURVE BOROM BUILDING
		new google.maps.LatLng(13.739119,100.532954),
		new google.maps.LatLng(13.739019,100.533069),
		new google.maps.LatLng(13.738923,100.533147),
		new google.maps.LatLng(13.738900,100.533203),
		//END
		//START CURVE AKSORN
		new google.maps.LatLng(13.738791,100.534081),
		new google.maps.LatLng(13.738755,100.534146),
		new google.maps.LatLng(13.738697,100.534183),
		new google.maps.LatLng(13.738624,100.534189),
		//END
		//START CURVE OLD AKSORN
		new google.maps.LatLng(13.737342,100.53399),
		new google.maps.LatLng(13.737316,100.533974),
		new google.maps.LatLng(13.737275,100.533942),
		new google.maps.LatLng(13.737238,100.533904),
		new google.maps.LatLng(13.737203,100.533851),
		new google.maps.LatLng(13.737400,100.531958)
		//END
	];

	var routeCoordinates_4 = [
		//START HENRI DUNANT INTERSECTION
		new google.maps.LatLng(13.745269,100.535861),
		new google.maps.LatLng(13.746013,100.531307),
		new google.maps.LatLng(13.745643,100.53081),
		//TURN RIGHT INTO CU
		new google.maps.LatLng(13.738730,100.529695),
		new google.maps.LatLng(13.738762,100.529381),
		new google.maps.LatLng(13.737913,100.529252),
		new google.maps.LatLng(13.73834,100.526686),
		new google.maps.LatLng(13.735448,100.526197),
		new google.maps.LatLng(13.735026,100.529033),
		//OUT CU
		new google.maps.LatLng(13.738703,100.529582),
		//INTO CU
		new google.maps.LatLng(13.738674,100.529903),
		new google.maps.LatLng(13.739546,100.530050),
		//START CURVE BOROM BUILDING
		new google.maps.LatLng(13.739049,100.532924),
		new google.maps.LatLng(13.738959,100.533029),
		new google.maps.LatLng(13.738823,100.533147),
		new google.maps.LatLng(13.738800,100.533153),
		//END CURVE BOROM BUILDING AND START CURVE ENG
		new google.maps.LatLng(13.737814,100.532992),
		new google.maps.LatLng(13.737458,100.532445),
		new google.maps.LatLng(13.737520,100.532048),
		//END CURVE ENG
		new google.maps.LatLng(13.734527,100.531667),
		new google.maps.LatLng(13.734191,100.534140),
		//EXIT TO HENRI
		new google.maps.LatLng(13.745269,100.535861),
		//END
	];

	var routeCoordinates_5 = [
		new google.maps.LatLng(13.742356, 100.525878),
		new google.maps.LatLng(13.739790, 100.525384),
		new google.maps.LatLng(13.739537, 100.527160),
		new google.maps.LatLng(13.739982, 100.527237),
		new google.maps.LatLng(13.739620, 100.529590),
		new google.maps.LatLng(13.738804, 100.529464),
		new google.maps.LatLng(13.738773, 100.529900),
		new google.maps.LatLng(13.739703,100.530093),
		//START CURVE BOROM BUILDING
		new google.maps.LatLng(13.739219,100.532954),
		new google.maps.LatLng(13.739069,100.533119),
		new google.maps.LatLng(13.738973,100.533197),
		new google.maps.LatLng(13.738973,100.533203),
		//END
		//START CURVE AKSORN
		new google.maps.LatLng(13.738841,100.534081),
		new google.maps.LatLng(13.738805,100.534196),
		new google.maps.LatLng(13.738747,100.534233),
		new google.maps.LatLng(13.738674,100.534289),
		//END
		//START CURVE OLD AKSORN
		new google.maps.LatLng(13.737342,100.534060),
		new google.maps.LatLng(13.737266,100.534024),
		new google.maps.LatLng(13.737225,100.533992),
		new google.maps.LatLng(13.737188,100.533954),
		new google.maps.LatLng(13.737153,100.533901),
		new google.maps.LatLng(13.737330,100.532158),
		new google.maps.LatLng(13.735581,100.531944)
		//END CRUVE
		//END
	];

	var routeCoordinates_6 = [
		new google.maps.LatLng(13.742356, 100.525808),
		new google.maps.LatLng(13.739670, 100.525304),
		new google.maps.LatLng(13.739407, 100.527160),
		new google.maps.LatLng(13.738342, 100.526983),
		new google.maps.LatLng(13.738384, 100.526601),
		new google.maps.LatLng(13.735356, 100.526105),
		new google.maps.LatLng(13.734934, 100.528929),
		new google.maps.LatLng(13.738904, 100.529504),
		new google.maps.LatLng(13.738923, 100.529870),
		new google.maps.LatLng(13.739823, 100.530063),
		new google.maps.LatLng(13.739329, 100.532943),
		new google.maps.LatLng(13.739189, 100.533119),
		new google.maps.LatLng(13.739073, 100.533197),
		new google.maps.LatLng(13.739073, 100.533203),
		//END
		//START CURVE AKSORN
		new google.maps.LatLng(13.738901, 100.534101),
		new google.maps.LatLng(13.738875, 100.534236),
		new google.maps.LatLng(13.738807, 100.534283),
		new google.maps.LatLng(13.738734, 100.534359),
		//END
		//START CURVE OLD AKSORN
		new google.maps.LatLng(13.737342,100.534160),
		new google.maps.LatLng(13.737266,100.534124),
		new google.maps.LatLng(13.737225,100.534092),
		new google.maps.LatLng(13.737188,100.534054),
		new google.maps.LatLng(13.737063,100.533901),
		new google.maps.LatLng(13.737200,100.532288),
		new google.maps.LatLng(13.735581,100.532044)
		//END CRUVE
		//END
	];

	var routePath_1 = new google.maps.Polyline({
		path: routeCoordinates_1,
		geodesic: true,
		strokeColor: '#E04B3F',
		strokeOpacity: 1.0,
		strokeWeight: 3
	});

	var routePath_2 = new google.maps.Polyline({
		path: routeCoordinates_2,
		geodesic: true,
		strokeColor: '#3377DB',
		strokeOpacity: 1.0,
		strokeWeight: 3
	});

	var routePath_3 = new google.maps.Polyline({
		path: routeCoordinates_3,
		geodesic: true,
		strokeColor: '#5EB242',
		strokeOpacity: 1.0,
		strokeWeight: 3
	});

	var routePath_4 = new google.maps.Polyline({
		path: routeCoordinates_4,
		geodesic: true,
		strokeColor: '#EFC926',
		strokeOpacity: 1.0,
		strokeWeight: 3
	});

	var routePath_5 = new google.maps.Polyline({
		path: routeCoordinates_5,
		geodesic: true,
		strokeColor: '#9144E2',
		strokeOpacity: 1.0,
		strokeWeight: 3
	});

	var routePath_6 = new google.maps.Polyline({
		path: routeCoordinates_6,
		geodesic: true,
		strokeColor: '#E25AC2',
		strokeOpacity: 1.0,
		strokeWeight: 3
	});

	var icon = {
		path: "M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0",
		fillColor: '#FFFFFF',
		fillOpacity: 1,
		anchor: new google.maps.Point(0,0),
		strokeWeight: 1.5,
		scale: 0.17
	}

	function initialize() {
		/*
		var map_canvas = document.getElementById('map-canvas');
		var map_options = {
			center: new google.maps.LatLng(13.739036, 100.529875),
			zoom: 16,
			scrollwheel: true,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}
		map = new google.maps.Map(map_canvas, map_options);
		*/

		var string;
		for( i = 0; i < markers.length; i++ ) {
			string = '';
			for( j = 0; j < 6; j++) {
				if(markers[i][j+3] != 0)
					string += '<div class="bus-no" style="border: 1px solid ' + bus_color[j] + '; background: ' + bus_color[j] + ';"></div>';
				else
					string += '<div class="bus-no" style="border: 1px solid rgba(0,0,0,0.60); background: transparent;"></div>';
			}
			infoWindowContent[i] = '<div class="info_content">' + markers[i][0] + '<br>' + string + '</div>';
		}

		// Loop through our array of markers & place each one on the map
		for( i = 0; i < markers.length; i++ ) {
			var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
			marker = new google.maps.Marker({
				position: position,
				icon: icon,
				map: map,
				title: markers[i][0]
			});
			marker.setMap(map);
			allMarkers.push(marker);

			// Allow each marker to have an info window
			google.maps.event.addListener(marker, 'click', (function(marker, i) {
				return function() {
					infoWindow.setContent(infoWindowContent[i]);
					infoWindow.open(map, marker);
				}
			})(marker, i));
		}

		for( i = 1; i <= 6; i++)
			addPath(i);
		//markers.setMap(map);
	}

	function addPath(route) {
		if(route == 1)		routePath_1.setMap(map);
		else if(route == 2) routePath_2.setMap(map);
		else if(route == 3) routePath_3.setMap(map);
		else if(route == 4) routePath_4.setMap(map);
		else if(route == 5)	routePath_5.setMap(map);
		else if(route == 6)	routePath_6.setMap(map);
	}

	function removePath(route) {
		if(route == 1)		routePath_1.setMap(null);
		else if(route == 2) routePath_2.setMap(null);
		else if(route == 3) routePath_3.setMap(null);
		else if(route == 4) routePath_4.setMap(null);
		else if(route == 5)	routePath_5.setMap(null);
		else if(route == 6)	routePath_6.setMap(null);
	}

	/*function updateMark() {
		for( i = 0; i < allMarkers.length; i++)
			allMarkers[i].setMap(null);
		for( j = 0; j < 6; j ++ ) {
			if(active_route[j] == 1)  {
				for( i = 0; i < markers.length; i++ ) {
					if(markers[i][j+3] != 0) {
						var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
						marker = new google.maps.Marker({
							position: position,
							icon: icon,
							map: map,
							title: markers[i][0]
						});
						marker.setMap(map);
						//allMarkers.push(marker);

						// Allow each marker to have an info window
						google.maps.event.addListener(marker, 'click', (function(marker, i) {
							return function() {
								infoWindow.setContent(infoWindowContent[i]);
								infoWindow.open(map, marker);
							}
						})(marker, i));
					}
				}
			}
		}
	}*/

	function updateMarkAdd(route) {
		var intRoute = parseInt(route);
		var sentinel;
		for( i = 0; i < markers.length; i++ ) {
			if(markers[i][intRoute+2] != 0) {
				sentinel = 0;
				for( j = 0; j < 6 ; j++) {
					if(active_route[j] == 1 && markers[i][j+3] != 0 && j != intRoute-1) {
						sentinel = 1;
					}
				}
				if(sentinel == 0) {
					allMarkers[i].setMap(map);
				}
			}
		}
	}

	function updateMarkRemove(route) {
		var intRoute = parseInt(route);
		var sentinel;
		for( i = 0; i < markers.length; i++ ) {
			if(markers[i][intRoute+2] != 0) {
				sentinel = 0;
				for( j = 0; j < 6 ; j++) {
					if(active_route[j] == 1 && markers[i][j+3] != 0) {
						sentinel = 1;
					}
				}
				if(sentinel == 0) {
					allMarkers[i].setMap(null);
				}
			}
		}
	}

	google.maps.event.addDomListener(window, 'load', initialize);


	//MAP
	$(".map-wrap .route .rt").on("click", function() {
		var a=$(this).data("color");
		var b=parseInt($(this).data("selected"));
		var c=$(this).attr('class').split('-')[1];
		if(b == 0) {
			//add
			$(this).data("selected", "1");
			active_route[parseInt(c[0])-1] = 1;
			TweenMax.to($(this), 0.1, {color: "rgba(255,255,255,1.00)", background: a, ease:Quad.easeOut});
			if(c[0] == 1) 		addPath(1);
			else if(c[0] == 2) 	addPath(2);
			else if(c[0] == 3) 	addPath(3);
			else if(c[0] == 4) 	addPath(4);
			else if(c[0] == 5) 	addPath(5);
			else if(c[0] == 6) 	addPath(6);
			updateMarkAdd(c[0]);
		}
		else if(b == 1) {
			//remove
			$(this).data("selected", "0");
			active_route[parseInt(c[0])-1] = 0;
			TweenMax.to($(this), 0.1, {color: a, background: "transparent", ease:Quad.easeOut});
			if(c[0] == 1) 		removePath(1);
			else if(c[0] == 2) 	removePath(2);
			else if(c[0] == 3) 	removePath(3);
			else if(c[0] == 4) 	removePath(4);
			else if(c[0] == 5) 	removePath(5);
			else if(c[0] == 6) 	removePath(6);
			updateMarkRemove(c[0]);
		}

	});
	//==================================== Nai MarkerPart =====================================
	var busMarkers = [];
	var intervals = [];

	function parseStringToInt(string){
		var numStr = '';
		for(var i = 0 ; i < string.length ; i++){
			if((string[i] >= '0' && string[i] <= '9')||string[i]=='.'){
					numStr += string[i];
			}
		}
		return parseFloat(numStr);
	}

	function createMarker(json){
		for(var i = 0; i < json.length; i++){

			var str = json[i].LatLng;
			var split = str.split(",");
			var latLngObj = {lat:parseStringToInt(split[0]),lng:parseStringToInt(split[1])};

			console.log(latLngObj);
			//if(latLngObj.lat === 0 && latLngObj.lng === 0)continue;
			busMarkers.push(addBusMarker(i,latLngObj));
			busMarkers[i].IMEI = json[i].IMEI;
			busMarkers[i].lineNo = json[i].LineNo;
			busMarkers[i].num = i;

			console.log(json[i].IMEI);
			//console.log(addBusMarker("BusNo"+i,latLngObj));
		}
	}

	function addBusMarker(num,latLng){
			return new google.maps.Marker({
			position: latLng,
			map: map,
			title: ''+num,
		});
	}
	function moveAnimation(busMarker,newLatLngObj){
		var latLngObj = busMarker.getPosition();
		if(typeof(latLngObj) === 'undefined')return;
		var disLat = newLatLngObj.lat - latLngObj.lat();
		var disLng = newLatLngObj.lng - latLngObj.lng();
		var moveLatLngObj = {};
		moveLatLngObj.lat = latLngObj.lat();
		moveLatLngObj.lng = latLngObj.lng();
		intervals.push(setInterval(function(){
			moveLatLngObj.lat += disLat/20;
			moveLatLngObj.lng += disLng/20;
			if(disLat*moveLatLngObj.lat > disLat*newLatLngObj.lat)moveLatLngObj.lat = newLatLngObj.lat;
			if(disLng*moveLatLngObj.lng > disLng*newLatLngObj.lng)moveLatLngObj.lng = newLatLngObj.lng;

			busMarker.setPosition(moveLatLngObj);

			console.log(busMarker.IMEI,moveLatLngObj.lat,newLatLngObj.lat,moveLatLngObj.lng,newLatLngObj.lng);
		},1000/2));
	}
	function moveBusMarker(newBusData){
		for(var k = 0 ; k < intervals.length ; k++){
			clearInterval(intervals[k]);
		}
		for(var i = 0 ; i < busMarkers.length ; i++){
			for(var j = 0 ; j < newBusData.length ; j++){
				if(busMarkers[i].IMEI === newBusData[j].IMEI){
					var latLngStr = newBusData[j].LatLng;
					var latLng = latLngStr.split(",");
					var latLngObj = {lat:parseStringToInt(latLng[0]),lng:parseStringToInt(latLng[1])};
					//busMarkers[i].setPosition(latLngObj);
					console.log(busMarkers[i].getPosition());
					moveAnimation(busMarkers[i],latLngObj)
				}
			}
		}
	}

	function loadData(callback) {
		Parse.Cloud.run('getBusNow').then(function(data) {
			// Data loading success!!!
			callback(JSON.parse(data));
		}, function(error) {
			// Data loading fail
			callback(null);
		});
	}

	loadData(function(data) {
		if (data === null) {
			// Data loading fail
			console.log("Loading Failed");
			return;
		}
		else {
			createMarker(data)
			console.log(busMarkers);
		}
	});


	setInterval(function(){loadData(function(data){
			console.log("moving Bus");
			if(data === null){
				console.log("Loading Failed");
			}
			else{
				console.log(busMarkers[0]);
				moveBusMarker(data);
				//console.log(busMarkers[0],busMarker[1]);
			}
	})}
	,10*1000);

});
