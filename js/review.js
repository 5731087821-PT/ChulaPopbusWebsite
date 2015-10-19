// JavaScript Document
$(document).ready(function() {	
	//CHECK-WAYPOINTS-COMPATIBLE
	$(".menu-bar").waypoint(function() {
		$("html").addClass("waypoints");
	});	

	//HEAD
	$(".header .container-header .content .button").on("mouseenter", function() {
		TweenMax.to($(this), 0.5, {border: "2px solid rgba(255,255,255,1.00)", color: "rgba(255,255,255,1.00)", background: "rgba(0,0,0,0.10)", ease:Quad.easeOut});
	});
	$(".header .container-header .content .button").on("mouseleave", function() {
		TweenMax.to($(this), 0.5, {border: "2px solid rgba(255,255,255,0.80)", color: "rgba(255,255,255,0.80)", background: "rgba(0,0,0,0.00)", ease:Quad.easeOut});
	});
	
	TweenMax.from($('.header .container-header .macbook-illus-wrap .macbook-screen-2'), 0.5, {autoAlpha: 0, ease:Quad.easeOut, delay: 1.5});
	
	//CHART.JS
	var ctx_line = $("#popularity-chart").get(0).getContext("2d");
	var ctx_dougthnut = $("#doughtnut-chart").get(0).getContext("2d");
	
	Chart.defaults.global.tooltipTemplate = "<%= value %>";
	
	var lineChartData = {
		
		labels : ["2/17/2014", "2/24/2014", "3/3/2014", "3/10/2014", "3/17/2014", "3/24/2014", "3/31/2014", "4/7/2014", "4/14/2014", "4/21/2014", "4/28/2014", "5/5/2014", "5/12/2014", "5/19/2014", "5/26/2014", "6/2/2014", "6/9/2014", "6/16/2014", "6/23/2014", "6/30/2014", "7/7/2014", "7/14/2014", "7/21/2014", "7/28/2014", "8/4/2014", "8/11/2014", "8/18/2014", "8/25/2014", "8/30/2014"],
		datasets : [
			{
				label: "My Second dataset",
				fillColor : "rgba(151,187,205,0.2)",
				strokeColor : "rgba(151,187,205,1)",
				pointColor : "rgba(151,187,205,1)",
				pointStrokeColor : "#fff",
				pointHighlightFill : "#fff",
				pointHighlightStroke : "rgba(151,187,205,1)",
				data : [0, 31, 33, 2656, 3689, 4106, 4725, 5088, 5298, 5657, 5984, 6192, 6433, 6683, 6897, 7196, 7562, 7963, 8466, 9587, 10596, 11655, 13056, 14967, 16833, 18547, 20314, 21038]
			}
		]
	};
	var doughnutData = [
		{
			value: 80.4/*185623*/,
			color:"#F7464A",
			highlight: "#FF5A5E",
			label: "iOS"
		},
		{
			value: 19.6/*45629*/,
			color: "#46BFBD",
			highlight: "#5AD3D1",
			label: "Android"
		}
	];
	/*
	var LineChart = new Chart(ctx_line).Line(lineChartData, {
		scaleGridLineWidth : 1.5,
		bezierCurve : false,
		pointDotRadius : 4,
		pointHitDetectionRadius : 3,
		responsive: true
	});*/
	
	//var DoughnutChart = new Chart(ctx_dougthnut).Doughnut(doughnutData, {responsive : true});
	
	//WAYPOINTS
	var sentinel = 0;
	if($("html").hasClass("waypoints")) {
		/*SECTION-2*/
		$('.sc-2').waypoint(function(direction) {
			if(direction == 'down' && sentinel != 1) {
				var LineChart = new Chart(ctx_line).Line(lineChartData, {
					scaleGridLineWidth : 1.5,
					bezierCurve : false,
					pointDotRadius : 4,
					pointHitDetectionRadius : 3,
					responsive: true
				});
				var DoughnutChart = new Chart(ctx_dougthnut).Doughnut(doughnutData, {
					animationEasing : "easeOutQuart",
					tooltipTemplate : "<%if (label){%><%=label%>: <%}%><%= value%>"+"%",
					responsive : true
				});
				sentinel = 1;
			}
			/*else if(direction == 'up')
				TweenMax.to($(this), 0.5, {scale: 0, transformOrigin: "50% 50%", ease:Quad.easeOut});*/
		}, { offset: '40%' });
		
		TweenMax.set($('.sc-4 .container-sc-4 .container-active .graph-active-line-wrap'), {width: 0, ease:Quad.easeOut});
		$('.sc-4').waypoint(function(direction) {
			if(direction == 'down') {
				TweenMax.to($('.sc-4 .container-sc-4 .container-active .graph-active-line-wrap'), 4.0, {width: 757, ease:Quad.easeOut});
			}
			/*else if(direction == 'up')
				TweenMax.to($(this), 0.5, {scale: 0, transformOrigin: "50% 50%", ease:Quad.easeOut});*/
		}, { offset: '10%' });
	}
	else {
		var LineChart = new Chart(ctx_line).Line(lineChartData, {
			scaleGridLineWidth : 1.5,
			bezierCurve : false,
			pointDotRadius : 4,
			pointHitDetectionRadius : 3,
			responsive: true
		});
		var DoughnutChart = new Chart(ctx_dougthnut).Doughnut(doughnutData, {
			animationEasing : "easeOutQuart",
			tooltipTemplate : "<%if (label){%><%=label%>: <%}%><%= value%>"+"%",
			responsive : true
		});
	}
});