// JavaScript Document
$(document).ready(function() {	
	//CHECK-WAYPOINTS-COMPATIBLE
	$(".menu-bar").waypoint(function() {
		$("html").addClass("waypoints");
	});

	//WAYPOINTS
	if($("html").hasClass("waypoints")) {		
		TweenMax.set($('.sc-2 .container-sc-2 .images'), {right: '-100%', alpha: 0});
		TweenMax.set($('.sc-2 .container-sc-2 .images .illus-pop'), {autoAlpha: 0, scale: 0, rotationX: -90, rotationY: -90, transformOrigin: "50% 100%", transformPerspective:-200});
		TweenMax.set($('.sc-2 .container-sc-2 .images .illus-shadow'), {autoAlpha: 0});
		$('.sc-2 .container-sc-2 .images').waypoint(function(direction) {
			if(direction == 'down'){
				TweenMax.to($(this), 0.6, {alpha: 1, right: -350, ease:Quad.easeOut});
				TweenMax.to($('.sc-2 .container-sc-2 .images .illus-pop'), 0.7, {autoAlpha: 1, scale: 1, rotationX: 0, rotationY: 0, transformOrigin: "50% 100%", transformPerspective:-200, delay: 0.5});
				TweenMax.to($('.sc-2 .container-sc-2 .images .illus-shadow'), 0.5, {autoAlpha: 1, delay: 1.1});
			}
			/*else if(direction == 'up') {
				TweenMax.to($(this), 0.6, {alpha:0, right: '-100%', ease:Quad.easeOut});
				TweenMax.set($('.sc-2 .container-sc-2 .images .illus-pop'), {autoAlpha: 0, scale: 0, rotationX: -90, rotationY: -90, transformOrigin: "50% 100%", transformPerspective:-200});
				TweenMax.set($('.sc-2 .container-sc-2 .images .illus-shadow'), {autoAlpha: 0});
			}*/
		}, { offset: '55%' });
		
		TweenMax.set($('.sc-3 .container-sc-3 .illus-sec-3-wrap .illus-sec-3-h'), {top: 387, ease:Quad.easeOut});
		TweenMax.set($('.sc-3 .container-sc-3 .illus-sec-3-wrap .illus-sec-3-a'), {top: 427, ease:Quad.easeOut});
		$('.sc-3 .container-sc-3 .illus-sec-3-wrap').waypoint(function(direction) {
			if(direction == 'down'){
				TweenMax.to($('.sc-3 .container-sc-3 .illus-sec-3-wrap .illus-sec-3-h'), 0.6, {top: 0, ease:Quad.easeOut});
				TweenMax.to($('.sc-3 .container-sc-3 .illus-sec-3-wrap .illus-sec-3-a'), 0.6, {top: 40, ease:Quad.easeOut});
				$('.app_preview')[0].play();
			}
			else if(direction == 'up') {
				$('.app_preview')[0].pause();
			}
		}, { offset: '55%' });
		
		$('.sc-4').waypoint(function(direction) {
			if(direction == 'down'){
				$('.app_preview')[0].pause();
			}
			else if(direction == 'up') {
				$('.app_preview')[0].play();
			}
		}, { offset: '100' });
		
		TweenMax.set($('.sc-5 .container-sc-5 .images'), {top: '30%', alpha: 0});
		TweenMax.set($('.sc-5 .container-sc-5 .images .illus-2'), {autoAlpha: 0, top:60, left:75});
		TweenMax.set($('.sc-5 .container-sc-5 .images .illus-3'), {autoAlpha: 0, top:60, left:75});
		$('.sc-5 .container-sc-5 .images').waypoint(function(direction) {
			if(direction == 'down'){
				TweenMax.to($(this), 0.7, {alpha: 1, top: 20, ease:Quad.easeOut});
				TweenMax.to($('.sc-5 .container-sc-5 .images .illus-2'), 0.9, {autoAlpha: 1, delay: 1.0, top: 50, left: 90, ease:Quad.easeOut});
				TweenMax.to($('.sc-5 .container-sc-5 .images .illus-3'), 0.9, {autoAlpha: 1, delay: 0.8, top: 29, left: 104, ease:Quad.easeOut});
			}
			/*else if(direction == 'up') {
				TweenMax.to($(this), 1.0, {alpha:0, ease:Quad.easeOut});
			
				TweenMax.to($('.sc-5 .container-sc-5 .images .illus-2'),0.7, {autoAlpha: 0});
				TweenMax.to($('.sc-5 .container-sc-5 .images .illus-3'),0.7, {autoAlpha: 0});
				TweenMax.set($('.sc-5 .container-sc-5 .images .illus-2'), {autoAlpha: 0,top:60,left:70});
				TweenMax.set($('.sc-5 .container-sc-5 .images .illus-3'), {autoAlpha: 0,top:45,left:92});
			}*/
		}, { offset: '55%' });
			
		TweenMax.set($('.sc-4 .container-sc-4 .illus-sec-2-2'), {scale: 0, ease:Quad.easeOut});
		$('.sc-4 .container-sc-4 .illus-sec-2-2').waypoint(function(direction) {
			if(direction == 'down'){
				TweenMax.to($(this), 0.7, {scale: 1, ease:Quad.easeOut});
			}
			/*else if(direction == 'up') {
				TweenMax.to($(this), 1.0, {alpha:0, ease:Quad.easeOut});
			
				TweenMax.to($('.sc-5 .container-sc-5 .images .illus-2'),0.7, {autoAlpha: 0});
				TweenMax.to($('.sc-5 .container-sc-5 .images .illus-3'),0.7, {autoAlpha: 0});
				TweenMax.set($('.sc-5 .container-sc-5 .images .illus-2'), {autoAlpha: 0,top:60,left:70});
				TweenMax.set($('.sc-5 .container-sc-5 .images .illus-3'), {autoAlpha: 0,top:45,left:92});
			}*/
		}, { offset: '55%' });
		
	}

	//HEAD
	$(".header .container-header .content .button").on("mouseenter", function() {
		TweenMax.to($(this), 0.5, {border: "2px solid rgba(255,255,255,1.00)", color: "rgba(255,255,255,1.00)", background: "rgba(0,0,0,0.10)", ease:Quad.easeOut});
	});
	$(".header .container-header .content .button").on("mouseleave", function() {
		TweenMax.to($(this), 0.5, {border: "2px solid rgba(255,255,255,0.80)", color: "rgba(255,255,255,0.80)", background: "rgba(0,0,0,0.00)", ease:Quad.easeOut});
	});
	
	TweenMax.from($(".header .container-header .content"), 1.0, {left: 550, delay:1.0, ease:Quad.easeOut});
	TweenMax.from($(".header .container-header .phoneLeft"), 1.0, {left: 264, autoAlpha: 0, delay:1.0, ease:Quad.easeOut});
	TweenMax.from($(".header .container-header .phoneRight"), 1.0, {left: 264, autoAlpha: 0, delay:1.0, ease:Quad.easeOut});
});