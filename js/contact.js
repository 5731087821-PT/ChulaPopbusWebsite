// JavaScript Document
$(document).ready(function() {	
	//CHECK-WAYPOINTS-COMPATIBLE
	$(".menu-bar").waypoint(function() {
		$("html").addClass("waypoints");
	});

	//WAYPOINTS
	if($("html").hasClass("waypoints")) {
		/*SECTION-2*/
		TweenMax.set($('.sc-2 .container-sc-2 .illus-sec-2-2'), {left: "-100%"});
		TweenMax.set($('.sc-2 .container-sc-2 .illus-sec-2-1'), {scale: 0, transformOrigin: "50% 50%"});
		TweenMax.set($('.sc-2 .container-sc-2 .illus-sec-2-3'), {autoAlpha: 0});
		$('.sc-2').waypoint(function(direction) {
			if(direction == 'down') {
				TweenMax.to($('.sc-2 .container-sc-2 .illus-sec-2-2'), 0.8, {left: -40, ease:Quad.easeOut});
				TweenMax.to($('.sc-2 .container-sc-2 .illus-sec-2-1'), 0.4, {scale: 1, transformOrigin: "50% 50%", ease:Quad.easeOut, delay: 0.8});
				TweenMax.to($('.sc-2 .container-sc-2 .illus-sec-2-3'), 0.4, {autoAlpha: 1, ease:Quad.easeOut, delay: 1.2});
			}
			/*else if(direction == 'up')
				TweenMax.to($(this), 0.5, {scale: 0, transformOrigin: "50% 50%", ease:Quad.easeOut});*/
		}, { offset: '55%' });
	}

	//HEAD
	$(".head .container-head .content .button").on("mouseenter", function() {
		TweenMax.to($(this), 0.5, {border: "2px solid rgba(255,255,255,1.00)", color: "rgba(255,255,255,1.00)", background: "rgba(0,0,0,0.10)", ease:Quad.easeOut});
	});
	$(".head .container-head .content .button").on("mouseleave", function() {
		TweenMax.to($(this), 0.5, {border: "2px solid rgba(255,255,255,0.80)", color: "rgba(255,255,255,0.80)", background: "rgba(0,0,0,0.00)", ease:Quad.easeOut});
	});
	
	
	TweenMax.from($('.header .container-header .hang-1'), 1.2, {top: -110, repeat: -1, yoyo: true});
	TweenMax.from($('.header .container-header .hang-2'), 1.5, {top: -180, ease:Quad.easeOut, repeat: -1, yoyo: true});
	TweenMax.from($('.header .container-header .hang-3'), 1.4, {top: -80, ease:Quad.easeOut, repeat: -1, yoyo: true});
	TweenMax.from($('.header .container-header .hang-4'), 1.5, {top: -160, ease:Quad.easeOut, repeat: -1, yoyo: true});
	TweenMax.from($('.header .container-header .hang-5'), 1.3, {top: -90, ease:Quad.easeOut, repeat: -1, yoyo: true});
	
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