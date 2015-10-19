// JavaScript Document
$(document).ready(function() {	
	//CHECK-WAYPOINTS-COMPATIBLE
	$(".menu-bar").waypoint(function() {
		$("html").addClass("waypoints");
	});

	//WAYPOINTS
	if($("html").hasClass("waypoints")) {
		/*SECTION-2*/
		TweenMax.set($('.sc-2 .container-sc-2 .illus-sec-2-2'), {scale: 0, transformOrigin: "50% 50%"});
		$('.sc-2 .container-sc-2 .illus-sec-2-2').waypoint(function(direction) {
			if(direction == 'down')
				TweenMax.to($(this), 0.5, {scale: 1, transformOrigin: "50% 50%", ease:Quad.easeOut});
			else if(direction == 'up')
				TweenMax.to($(this), 0.5, {scale: 0, transformOrigin: "50% 50%", ease:Quad.easeOut});
		}, { offset: '55%' });
	}

	//HEAD
	$(".head .container-head .content .button").on("mouseenter", function() {
		TweenMax.to($(this), 0.5, {border: "2px solid rgba(255,255,255,1.00)", color: "rgba(255,255,255,1.00)", background: "rgba(0,0,0,0.10)", ease:Quad.easeOut});
	});
	$(".head .container-head .content .button").on("mouseleave", function() {
		TweenMax.to($(this), 0.5, {border: "2px solid rgba(255,255,255,0.80)", color: "rgba(255,255,255,0.80)", background: "rgba(0,0,0,0.00)", ease:Quad.easeOut});
	});

	$(".edit").on("mouseenter", function() {
		var a=$(this).attr('class').split('-')[1];
		TweenMax.to($(this), 0.5, {border:"5px solid rgba(255,255,255,1)", ease:Quad.easeOut});
		TweenMax.to($(".edit-"+a+" .darken"), 0.5, {background: "rgba(0,0,0,0.4)", ease:Quad.easeOut});
		TweenMax.to($(".edit-"+a+" .darken img"), 0.5, {autoAlpha: 1, ease:Quad.easeOut});
	});
	$(".edit").on("mouseleave", function() {
		var a=$(this).attr('class').split('-')[1];
		TweenMax.to($(this), 0.5, {border:"5px solid rgba(255,255,255,0)", ease:Quad.easeOut});
		TweenMax.to($(".edit-"+a+" .darken"), 0.5, {background: "rgba(0,0,0,0)", ease:Quad.easeOut});	
		TweenMax.to($(".edit-"+a+" .darken img"), 0.5, {autoAlpha: 0, ease:Quad.easeOut});
	});

});