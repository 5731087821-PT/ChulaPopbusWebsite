/*

  To minify this file, use the UglifyJS2 with following command:

  uglifyjs cu-popbus-map-full-v2.js --compress keep_fargs=false;unsafe --mangle
    --lint --output cu-popbus-map-full-v2.min.js

*/

/**
  * Process are as follows:
  * 1) Initialize things
  * 2) Load line and line plan data
  * 3) Load station data
  * 4) Initialize map UI
  * 5) Start BusNow fetch cycler
  */

var PopbusTracker = function() {
	'use strict';

	// Polyfill for Date.now
	if (!Date.now) {
		Date.now = function now() {
			return new Date().getTime();
		};
	}

	var PopbusTrackerObj = {};

	var messageTargetDOM = null;

	function showMessage(msg) {
		if (messageTargetDOM !== null) {
			if (msg !== '') {
				$(messageTargetDOM).html(msg).fadeIn(200);
			} else {
				$(messageTargetDOM).fadeOut(400);
			}
		}
	}

	function showErrorMessage(msg, parseError) {
		if (parseError !== undefined && parseError !== null) {
			msg += '<br><div style="font-size:0.8em;">Error message: [' +
				parseError.code + '] ' + parseError.message + '</div>';
		}
		console.error(msg);
		showMessage(msg);
	}

	var BusMarkerIconManager = function() {
		var BusMarkerIconManagerObj = {};

		var prototypeImage = new Image();
		prototypeImage.onload = onPrototypeImageLoaded;
		var isPrototypeImageLoaded = false;

		/*var directionImage = new Image();
		directionImage.onload = onDirectionImageLoaded;
		var isDirectionImageLoaded = false;*/

		var imagesLoadPromise = new Parse.Promise();

		function checkPromiseResolve() {
			// if (isDirectionImageLoaded && isPrototypeImageLoaded) {
			if (isPrototypeImageLoaded) {
				imagesLoadPromise.resolve('Bus marker images loaded');
			}
		}

		/*function onDirectionImageLoaded() {
			isDirectionImageLoaded = true;
			checkPromiseResolve();

			for (var i = 0; i < 360; i++) {
				BusMarkerIconManagerObj.getRotatedDirectionIcon(i);
			}
		}*/

		function onPrototypeImageLoaded() {
			isPrototypeImageLoaded = true;
			checkPromiseResolve();
		}

		var prototypeIconCacher = {};

		BusMarkerIconManagerObj.getColorizedIcon = function(color) {
			if (!isPrototypeImageLoaded) {
				// This should not be happen
				return null;
			}

			if (!prototypeIconCacher.hasOwnProperty(color)) {

				var rColor = parseInt(color.substr(0, 2), 16);
				var gColor = parseInt(color.substr(2, 2), 16);
				var bColor = parseInt(color.substr(4, 2), 16);

				var canvas = document.createElement('canvas');
				var context = canvas.getContext('2d');
				var imageWidth = prototypeImage.width;
				var imageHeight = prototypeImage.height;
				canvas.width  = imageWidth;
				canvas.height = imageHeight;

				context.drawImage(prototypeImage, 0, 0);

				var imgData = context.getImageData(0, 0, imageWidth, imageHeight);
				var data = imgData.data;
				for (var i = 0, n = data.length; i < n; i += 4) {
					var ratio = data[i] / 255.0;
					data[i + 0] = Math.round(ratio * 255 + (1 - ratio) * rColor);
					data[i + 1] = Math.round(ratio * 255 + (1 - ratio) * gColor);
					data[i + 2] = Math.round(ratio * 255 + (1 - ratio) * bColor);
				}
				context.putImageData(imgData, 0, 0);

				prototypeIconCacher[color] = {
					url: canvas.toDataURL(),
					anchor: new google.maps.Point(20, 20),
					scaledSize: new google.maps.Size(40, 40)
				};
			}

			return prototypeIconCacher[color];
		};

		var directionIconCacher = {};

		BusMarkerIconManagerObj.getRotatedDirectionIcon = function(angle) {
			/*if (!isDirectionImageLoaded) {
				// This should not be happen
				return null;
			}*/

			angle = Math.round(angle / 2) * 2;

			if (!directionIconCacher.hasOwnProperty(angle)) {

				/*var canvas = document.createElement('canvas');
				var context = canvas.getContext('2d');
				var imageWidth = directionImage.width;
				var imageHeight = directionImage.height;
				canvas.width  = imageWidth;
				canvas.height = imageHeight;

				context.translate(imageWidth / 2, imageHeight / 2);
				context.rotate(angle * Math.PI / 180.0);
				context.drawImage(directionImage, -imageWidth / 2, -imageHeight / 2);

				directionIconCacher[angle] = {
					url: canvas.toDataURL(),
					anchor: new google.maps.Point(20, 20),
					scaledSize: new google.maps.Size(40, 40)
				};*/

				directionIconCacher[angle] = {
					path: 'M542 1233 c-165 -222 -215 -297 -241 -367 -59 -158 -24 -327 96 -456 162 -175 434 -184 608 -19 133 125 177 307 115 472 -27 72 -92 171 -252 385 -114 151 -133 172 -158 172 -24 0 -44 -22 -168 -187z m313 -223 c70 -34 139 -107 166 -177 106 -273 -161 -540 -434 -434 -69 27 -143 96 -177 166 -21 43 -25 64 -25 145 0 84 3 101 28 147 33 64 83 116 140 144 66 34 86 38 172 36 61 -2 92 -8 130 -27z',
					anchor: new google.maps.Point(710, 710),
					scale: 0.028169014,
					strokeOpacity: 0,
					fillColor: '#333333',
					fillOpacity: 1,
					rotation: angle
				};
			}

			return directionIconCacher[angle];
		};

		BusMarkerIconManagerObj.initialize = function() {
			prototypeImage.src = './images/cu-popbus-map-full/bus_icons_general.png';
			// directionImage.src = './images/cu-popbus-map-full/bus_direction.png';
		};

		BusMarkerIconManagerObj.waitForImageLoad = function() {
			return imagesLoadPromise;
		};

		return BusMarkerIconManagerObj;
	}();

	var BusDataOldLevel = {
		NEW: 1,
		OLD: 2,
		SIGNAL_LOST: 3
	};

	var BusNowMarker = function(busNow, mapObj) {
		var _this = this;

		function linkLine() {
			var busLineList = PopbusData.getBusLineList();
			for (var i = 0; i < busLineList.length; i++) {
				if (busLineList[i].getLineNo() === busNow.getLineNo()) {
					linkedLine = busLineList[i];
					linkedLine.addBusNowMarker(_this);

					color = busLineList[i].getColor();
					visible = busLineList[i].isVisible();

					return;
				}
			}
		}

		this.setVisible = function(value) {
			marker.setVisible(value);
			directionMarker.setVisible(value);
		};

		var linkedLine = null;

		var color = '666666';
		var visible = true;

		linkLine();

		var marker = new google.maps.Marker({
			position: busNow.getLocation(),
			map: mapObj,
			icon: BusMarkerIconManager.getColorizedIcon(color),
			optimized: false,
			visible: visible,
			clickable: false,
			zIndex: 20
		});
		var curDirection = busNow.getDirectionOrZero();
		var directionMarker = new google.maps.Marker({
			position: busNow.getLocation(),
			map: mapObj,
			icon: BusMarkerIconManager.getRotatedDirectionIcon(
				curDirection
			),
			optimized: false,
			visible: visible,
			clickable: false,
			zIndex: 10
		});

		this.setBusOldLevel = function(value) {
			switch (value) {
				case BusDataOldLevel.NEW: {
					marker.setOpacity(1.0);
					directionMarker.setOpacity(1.0);
					break;
				}
				case BusDataOldLevel.OLD: {
					marker.setOpacity(0.5);
					directionMarker.setOpacity(0.5);
					break;
				}
				case BusDataOldLevel.SIGNAL_LOST: {
					marker.setOpacity(0.02);
					directionMarker.setOpacity(0.02);
					break;
				}
			}
		};
		this.setBusOldLevel(busNow.getBusOldLevel());

		this.destroy = function() {
			marker.setMap(null);
			directionMarker.setMap(null);
			if (linkedLine !== null) {
				linkedLine.removeBusNowMarker(this);
			}
		};

		var targetPosition = null;
		var targetDirection = 0;
		var animationTimeLeft = 0;
		var lastDateTime = Date.now();

		this.animateTo = function(newPosition, newDirection) {
			targetPosition = newPosition;
			targetDirection = newDirection;
			animationTimeLeft = 1000 * 3;
			lastDateTime = Date.now();
		};

		this.updateAnimation = function() {
			if (animationTimeLeft > 0) {
				var pastDuration = Date.now() - lastDateTime;
				if (pastDuration >= animationTimeLeft) {
					animationTimeLeft = 0;

					marker.setPosition(targetPosition);
					directionMarker.setPosition(targetPosition);

					if (targetDirection !== curDirection) {
						directionMarker.setIcon(
							BusMarkerIconManager.getRotatedDirectionIcon(
								targetDirection
							)
						);
						curDirection = targetDirection;
					}
				} else {
					var ratio = pastDuration / animationTimeLeft;

					// Interpolating position
					var curPos = marker.getPosition();
					var newPosition = {
						lat: ratio * targetPosition.lat + (1 - ratio) * curPos.lat(),
						lng: ratio * targetPosition.lng + (1 - ratio) * curPos.lng()
					};
					marker.setPosition(newPosition);
					directionMarker.setPosition(newPosition);

					// Interpolating heading angle
					var overheading = targetDirection;
					while (overheading < curDirection) {
						overheading += 360;
					}
					var underheading = targetDirection;
					while (underheading > curDirection) {
						underheading -= 360;
					}
					var newHeading;
					if (overheading - curDirection < curDirection - underheading) {
						newHeading = curDirection + ratio * (overheading - curDirection);
					} else {
						newHeading = curDirection - ratio * (curDirection - underheading);
					}
					while (newHeading < 0) {
						newHeading += 360;
					}
					while (newHeading > 360) {
						newHeading -= 360;
					}
					if (newHeading !== curDirection) {
						directionMarker.setIcon(
							BusMarkerIconManager.getRotatedDirectionIcon(newHeading)
						);
						curDirection = newHeading;
					}

					animationTimeLeft -= pastDuration;
				}
				lastDateTime = Date.now();
			}
		};
	};

	var BusNowData = function(jsonObj) {
		var originalJsonObj = jsonObj;

		var imei, name, lineNo, dateTime, location, direction, speed;

		function setBusNowProperties(obj) {
			imei = obj.IMEI;
			name = obj.Name;
			lineNo = String(obj.LineNo); // May be "null"

			dateTime = NaN;
			var dateTimeStr = obj.GPSDateTime;
			if (dateTimeStr !== null && dateTimeStr !== undefined) {
				var dateTimeStrSpacePos = dateTimeStr.indexOf(' ');
				var dateStr = dateTimeStr.substring(0, dateTimeStrSpacePos);
				var timeStr = dateTimeStr.substring(dateTimeStrSpacePos + 1, dateTimeStr.length);
				dateTime = Date.parse(dateStr + 'T' + timeStr + '+07:00');
			}

			var latLngStr = obj.LatLng;
			var strCommaPos = latLngStr.indexOf(',');
			location = {
				lat: Number(latLngStr.substring(1, strCommaPos)),
				lng: Number(latLngStr.substring(strCommaPos + 1, latLngStr.length - 1))
			};

			// Both are nullable
			direction = Number(obj.Direction) || null;
			speed = obj.Speed;
		}
		setBusNowProperties(jsonObj);

		var marker = null;
		var oldMapObj;

		this.createMarker = function(mapObj) {
			oldMapObj = mapObj;
			marker = new BusNowMarker(this, mapObj);
		};

		this.refreshMarker = function(newBusNowData) {
			if (newBusNowData === undefined) {
				newBusNowData = this;
			}
			marker.destroy();
			marker = new BusNowMarker(newBusNowData, oldMapObj);
		};

		this.destroy = function() {
			console.log('Bus "' + name + '" (' + imei + ') is disappeared.');
			if (marker !== null) {
				marker.destroy();
				marker = null;
			}
		};

		this.update = function(newBusNowData) {
			// Ignore the data if the data is older than current data
			if (isNaN(newBusNowData.getDateTime()) ||
				(!isNaN(this.getDateTime()) && this.getDateTime() > newBusNowData.getDateTime())) {
				return;
			}

			if (marker !== null) {
				if (newBusNowData.getLineNo() !== this.getLineNo()) {
					// Change line
					console.log(
						'Change line from ' + this.getLineNo() +
						' to ' + newBusNowData.getLineNo()
					);
					this.refreshMarker(newBusNowData);
				} else {
					var oldLocation = this.getLocation();
					var newLocation = newBusNowData.getLocation();
					var newDirection = newBusNowData.getDirectionOrZero();
					if (oldLocation.lat !== newLocation.lat ||
						oldLocation.lng !== newLocation.lng ||
						this.getDirectionOrZero() !== newDirection) {
						// Change location
						marker.animateTo(newLocation, newDirection);
					}
				}
			}

			setBusNowProperties(newBusNowData.getOriginalJsonObj());
		};

		this.getImei = function() {
			return imei;
		};

		this.getLocation = function() {
			return location;
		};

		this.getDirectionOrZero = function() {
			return direction || 0;
		};

		this.getLineNo = function() {
			return lineNo;
		};

		this.getDateTime = function() {
			return dateTime;
		};

		this.getOriginalJsonObj = function() {
			return originalJsonObj;
		};

		var busOldLevel = BusDataOldLevel.NEW;
		this.setBusOldLevel = function(value) {
			busOldLevel = value;
			if (marker !== null) {
				marker.setBusOldLevel(value);
			}
		};
		this.getBusOldLevel = function() {
			return busOldLevel;
		};
		this.getName = function() {
			return name;
		};
		this.updateAnimation = function() {
			if (marker !== null) {
				marker.updateAnimation();
			}
		};
	};

	var BusNowDataManager = function() {
		var BusNowDataManagerObj = {};

		var busNowList = [];
		var isAnimationLooperStarted = false;
		var mapObj;

		BusNowDataManagerObj.linkMap = function(newMapObj) {
			mapObj = newMapObj;
		};

		function calculateBusDataOldLevel() {
			var i;

			var newestDate = 0;
			for (i = 0; i < busNowList.length; i++) {
				var date = busNowList[i].getDateTime();
				if (!isNaN(date) && date > newestDate) {
					newestDate = date;
				}
			}

			var thresholdDate1 = newestDate - 1000 * 90;
			var thresholdDate2 = newestDate - 1000 * 60 * 60;

			for (i = 0; i < busNowList.length; i++) {
				var busDate = busNowList[i].getDateTime();
				if (isNaN(busDate) || busDate < thresholdDate2) {
					busNowList[i].setBusOldLevel(BusDataOldLevel.SIGNAL_LOST);
				} else if (busDate < thresholdDate1) {
					busNowList[i].setBusOldLevel(BusDataOldLevel.OLD);
				} else {
					busNowList[i].setBusOldLevel(BusDataOldLevel.NEW);
				}
			}
		}

		function animLoop() {
			requestAnimationFrame(animLoop);

			for (var i = 0; i < busNowList.length; i++) {
				busNowList[i].updateAnimation();
			}
		}

		function startAnimationLoop() {
			animLoop();
		}

		// Call this when bus data has an update, i.e. the BusNow data is fetched.
		BusNowDataManagerObj.update = function(newBusNowList) {
			var i;

			// Merging new data with old ones

			var oldBusNowList = busNowList;
			busNowList = [];

			var oldBusNowSet = {};
			for (i = 0; i < oldBusNowList.length; i++) {
				oldBusNowSet[oldBusNowList[i].getImei()] = oldBusNowList[i];
			}

			for (i = 0; i < newBusNowList.length; i++) {
				if (oldBusNowSet.hasOwnProperty(newBusNowList[i].getImei())) {
					// There is existing BusNow with same IMEI
					var busNow = oldBusNowSet[newBusNowList[i].getImei()];
					busNow.update(newBusNowList[i]);
					busNowList.push(busNow);

					delete oldBusNowSet[newBusNowList[i].getImei()];
				} else {
					// New bus!
					newBusNowList[i].createMarker(mapObj);
					busNowList.push(newBusNowList[i]);
				}
			}

			// Remove bus that is not in new BusNow anymore.
			for (i = 0; i < oldBusNowList.length; i++) {
				if (oldBusNowSet.hasOwnProperty(oldBusNowList[i].getImei())) {
					oldBusNowList[i].destroy();
				}
			}

			calculateBusDataOldLevel();

			if (!isAnimationLooperStarted) {
				isAnimationLooperStarted = true;
				startAnimationLoop();
			}
		};

		return BusNowDataManagerObj;
	}();

	var BusFetchCycler = function() {
		var BusFetchCyclerObj = {};

		function handleFetchedData(jsonObj) {
			var busNowList = [];
			for (var i = 0; i < jsonObj.length; i++) {
				// If the bus is at (0, 0), silently ignore this bus
				if (jsonObj[i].LatLng !== '(0,0)') {
					busNowList.push(new BusNowData(jsonObj[i]));
				}
			}
			console.log('BusNow data fetched');
			BusNowDataManager.update(busNowList);
		}

		function scheduleNextCycle() {
			setTimeout(fetchBusNow, 5000);
		}

		function fetchBusNow() {
			Parse.Cloud.run('getBusNow').then(function(data) {
				var jsonData = [];
				try {
					jsonData = JSON.parse(data);
					showMessage('');
				} catch (e) {
					showErrorMessage('Server Anomaly: ' + e.message);
				}
				handleFetchedData(jsonData);

				scheduleNextCycle();
			}, function(error) {
				showErrorMessage('Server Anomaly', error);
				scheduleNextCycle();
			});
		}

		BusFetchCyclerObj.startFetchCycle = function() {
			fetchBusNow();
		};

		return BusFetchCyclerObj;
	}();

	var InfoWindowManager = function() {
		var InfoWindowManagerObj = {};

		var mapObj;
		var openingInfoWindow = null;

		InfoWindowManagerObj.linkMap = function(obj) {
			mapObj = obj;
		};

		function showInfoWindow(contentStr, anchorMarker) {
			// Close existing one
			if (openingInfoWindow !== null) {
				openingInfoWindow.close();
				openingInfoWindow = null;
			}

			openingInfoWindow = new google.maps.InfoWindow({
				content: contentStr
			});
			openingInfoWindow.open(mapObj, anchorMarker);
			openingInfoWindow.addListener('closeclick', function() {
				openingInfoWindow = null;
			});
		}

		InfoWindowManagerObj.showStationInfoWindow = function(station) {
			showInfoWindow(station.getInfoWindowContent(), station.getStationMarker());
		};

		return InfoWindowManagerObj;
	}();

	var BusStation = function(popbusStation) {
		var _this = this;

		var nameEn = popbusStation.get('nameEn');
		var nameTh = popbusStation.get('nameTh');
		var location = {
			lat: popbusStation.get('location').latitude,
			lng: popbusStation.get('location').longitude
		};
		var objectId = popbusStation.id;

		var markerIcon = {
			path: google.maps.SymbolPath.CIRCLE,
			fillColor: '#FFFFFF',
			fillOpacity: 1,
			anchor: new google.maps.Point(0,0),
			strokeWeight: 1.5,
			scale: 3.4
		};

		var stationMarker = new google.maps.Marker({
			position: location,
			icon: markerIcon,
			title: nameEn,
			visible: false
		});

		var lineList = [];
		var counter = 0;

		this.addLine = function(line) {
			lineList.push(line);
			if (line.isVisible()) {
				this.increaseVisibleCounter();
			}
		};

		this.linkMap = function(mapObj) {
			stationMarker.setMap(mapObj);
			stationMarker.addListener('click', function() {
				InfoWindowManager.showStationInfoWindow(_this);
			});
		};

		this.decreaseVisibleCounter = function() {
			counter--;
			if (counter === 0) {
				stationMarker.setVisible(false);
			}
		};

		this.increaseVisibleCounter = function() {
			counter++;
			if (counter === 1) {
				stationMarker.setVisible(true);
			}
		};

		this.getStationMarker = function() {
			return stationMarker;
		};

		this.getObjectId = function() {
			return objectId;
		};

		var infoWindowContentCache = null;

		this.getInfoWindowContent = function() {
			if (infoWindowContentCache === null) {
				var lineIconHtml = '';
				var allLineList = PopbusData.getBusLineList();

				for (var i = 0; i < allLineList.length; i++) {
					var isStationHasLine = false;
					for (var j = 0; j < lineList.length; j++) {
						if (lineList[j] === allLineList[i]) {
							isStationHasLine = true;
							break;
						}
					}

					var lineColor = '#' + allLineList[i].getColor();

					lineIconHtml += '<div class="bus-no" style="border: 1px solid ' +
						(isStationHasLine ? lineColor : 'rgba(0,0,0,0.60)') +
						';' + (isStationHasLine ? ('background: ' + lineColor + ';') : '') +
						'"></div>';
				}

				infoWindowContentCache =
					'<div class="info-content">' +
						'<div>' + nameEn + '</div>' +
						'<div style="padding-top: 5px;">' + lineIconHtml + '</div>' +
					'</div>';
			}
			return infoWindowContentCache;
		};

	};

	var BusLine = function(popbusLine) {
		var _this = this;

		var visible = true;

		var color = popbusLine.get('color');
		var name = popbusLine.get('name');
		var lineNo = popbusLine.get('lineNo');

		var pathway = [];
		var _linePlanPathway = popbusLine.get('linePlan').get('pathway');
		for (var i = 0; i < _linePlanPathway.length; i++) {
			pathway[i] = { lat: _linePlanPathway[i][0], lng: _linePlanPathway[i][1] };
		}

		var stationList = [];
		var _stationIdInLineList = popbusLine.get('linePlan').get('stations');

		this.addStation = function(station) {
			stationList.push(station);
		};

		this.getColor = function() {
			return color;
		};

		var linePolyline = new google.maps.Polyline({
			path: pathway,
			geodesic: true,
			strokeColor: '#' + color,
			strokeOpacity: 1.0,
			strokeWeight: 3,
			clickable: false
		});

		this.linkMap = function(mapObj) {
			linePolyline.setMap(mapObj);
		};

		this.isVisible = function() {
			return visible;
		};

		this.setVisible = function(newVisiblility) {
			if (newVisiblility !== visible) {
				visible = newVisiblility;
				linePolyline.setVisible(visible);
				for (var i = 0; i < stationList.length; i++) {
					if (visible) {
						stationList[i].increaseVisibleCounter();
					} else {
						stationList[i].decreaseVisibleCounter();
					}
				}
			}
		};

		this.getStationIdInLineList = function() {
			return _stationIdInLineList;
		};

		var $visibleButton = null;

		this.onVisibleButtonClick = function() {
			this.setVisible(!this.isVisible());
			if (this.isVisible()) {
				TweenMax.to($visibleButton, 0.2, {
					color: '#FFF',
					backgroundColor: '#' + color,
					ease: Quad.easeOut
				});
			} else {
				TweenMax.to($visibleButton, 0.2, {
					color: '#' + color,
					backgroundColor: 'rgba(255, 255, 255, 0.0)',
					ease: Quad.easeOut
				});
			}
			for (var i = 0; i < busNowMarkerList.length; i++) {
				busNowMarkerList[i].setVisible(this.isVisible());
			}
		};

		this.getVisibleButtonObj = function() {
			if ($visibleButton === null) {
				$visibleButton = $(
					'<div class="rt pointer" style="border: 2px solid #' + color +
					'; color: #fff; background: #' + color + '"><strong>' + name +
					'</strong></div>'
				);
				$visibleButton.click(function(e) {
					_this.onVisibleButtonClick();
				});
			}
			return $visibleButton;
		};

		this.getLineNo = function() {
			return lineNo;
		};

		var busNowMarkerList = [];

		this.addBusNowMarker = function(marker) {
			busNowMarkerList.push(marker);
		};

		this.removeBusNowMarker = function(marker) {
			for (var i = busNowMarkerList.length - 1; i >= 0; i--) {
				if (busNowMarkerList[i] === marker) {
					busNowMarkerList.splice(i, 1);
				}
			}
		};

	};

	function createBusLineVisibilityButtons(targetDOM) {
		var allLineList = PopbusData.getBusLineList();
		$(targetDOM).empty();
		for (var i = 0; i < allLineList.length; i++) {
			$(targetDOM).append(
				allLineList[i].getVisibleButtonObj()
					.css('opacity', 0)
					.delay(i * 100)
					.animate({ 'opacity': 1}, 400)
			);
		}
	}

	var PopbusData = function() {
		var PopbusDataObj = {};
		var busLineList = [];
		var busStationList = [];

		PopbusDataObj.getBusLineList = function() {
			return busLineList;
		};

		function loadLinesDataAsync() {
			var PopbusLines = Parse.Object.extend('PopbusLines');
			var query = new Parse.Query(PopbusLines);
			query.equalTo('isShowInApp', true);
			query.equalTo('isHidden', false);
			query.include('linePlan');
			query.ascending('name');

			return query.find();
		}

		function aggregateStationsIdList(linesData) {
			var idList = [];
			var idChecker = {};

			for (var i = 0; i < linesData.length; i++) {
				var stationList = linesData[i].get('linePlan').get('stations');
				for (var j = 0; j < stationList.length; j++) {
					var stationId = stationList[j];
					if (idChecker[stationId] !== true) {
						idChecker[stationId] = true;
						idList.push(stationId);
					}
				}
			}

			return idList;
		}

		function loadStationsDataAsync(linesData) {
			var stationsIdList = aggregateStationsIdList(linesData);

			var PopbusStations = Parse.Object.extend('PopbusStations');
			var query = new Parse.Query(PopbusStations);
			query.containedIn('objectId', stationsIdList);

			return query.find();
		}

		function linkLineAndStation() {
			var i, j;

			var busStationFinder = {};
			for (i = 0; i < busStationList.length; i++) {
				busStationFinder[busStationList[i].getObjectId()] = busStationList[i];
			}

			for (i = 0; i < busLineList.length; i++) {
				var stationIdList = busLineList[i].getStationIdInLineList();
				for (j = 0; j < stationIdList.length; j++) {
					busStationFinder[stationIdList[j]].addLine(busLineList[i]);
					busLineList[i].addStation(busStationFinder[stationIdList[j]]);
				}
			}
		}

		PopbusDataObj.initializeData = function(mapObj, options) {
			loadLinesDataAsync()
				.then(function(linesData) {
					for (var i = 0; i < linesData.length; i++) {
						busLineList[i] = new BusLine(linesData[i]);
						busLineList[i].linkMap(mapObj);
					}

					return loadStationsDataAsync(linesData);

				}).then(function(stationsData) {
					for (var i = 0; i < stationsData.length; i++) {
						busStationList[i] = new BusStation(stationsData[i]);
						busStationList[i].linkMap(mapObj);
					}

					linkLineAndStation();

					console.log('Data loading complete.');

					if (options.lineButtonsDOM !== undefined &&
						options.lineButtonsDOM !== null) {
						createBusLineVisibilityButtons(options.lineButtonsDOM);
					}

					return BusMarkerIconManager.waitForImageLoad();
				}, function(error) {
					showErrorMessage('Loading Data Fail.', error);
				}).then(function(msg) {
					console.log(msg);
					showMessage('Fetching Popbus Positions...');
					BusFetchCycler.startFetchCycle();
				});
		};

		return PopbusDataObj;
	}();

	function initializeGoogleMapUI(mapObj, zoomLevel) {
		return new google.maps.Map(mapObj, {
			center: { lat: 13.740636, lng: 100.529875 },
			zoom: zoomLevel || 16,
			disableDefaultUI: true
		});
	}

	PopbusTrackerObj.create = function(options) {
		messageTargetDOM = options.messageDOM;
		showMessage('Loading Data...');

		Parse.initialize(
			'OS97kGW9YxCRuZYxb5uPeCbSmBAToHTOEY7JZn18',
			'JNYrGMF92XJxleOQrKGx2UAc1feIAmKKYS4pYDDv'
		);
		var mainMapObj = initializeGoogleMapUI(options.mapDOM, options.zoomLevel);
		BusMarkerIconManager.initialize();
		BusNowDataManager.linkMap(mainMapObj);
		InfoWindowManager.linkMap(mainMapObj);
		PopbusData.initializeData(mainMapObj, options);

	};

	return PopbusTrackerObj;
}();
