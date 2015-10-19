// JavaScript Document
$(document).ready(function() {	
	//CHECK-WAYPOINTS-COMPATIBLE
	$(".menu-bar").waypoint(function() {
		$("html").addClass("waypoints");
	});
	
	//WAYPOINTS-MENU-BAR-FIXED
	if($("html").hasClass("waypoints")) {		
		TweenMax.set($('.menu-bar-fixed'), {top: -50});
		$('.header').waypoint(function(direction) {
			if(direction == 'down')
				TweenMax.to($('.menu-bar-fixed'), 0.4, {autoAlpha: 1, top: 0, ease:Quad.easeOut});
			else if(direction == 'up')
				TweenMax.to($('.menu-bar-fixed'), 0.4, {autoAlpha: 0, top: -50, ease:Quad.easeOut});
		}, {offset: function() { return -$(this).height();}});
	}
	
	//LINK-ANCHOR
	$(".link-anchor").on("click", function() {
		var a=$(this).data("anchor");
		var $b=$(a);
		var c=parseInt($(this).data("offset"));
		$('html, body').animate({
			scrollTop: $b.offset().top-c
		}, 500);
	});
	
	//MENU-BAR
	
	/*LOGO*/
	$(".menu-bar .container-menu-bar .logo").on("mouseenter", function() {
		TweenMax.to($(this), 0.5, {autoAlpha: 0, ease:Quad.easeOut});
		TweenMax.to($(".menu-bar .container-menu-bar .logo-mover"), 0.5, {autoAlpha: 1, ease:Quad.easeOut});
	});
	$(".menu-bar .container-menu-bar .logo").on("mouseleave", function() {
		TweenMax.to($(this), 0.5, {autoAlpha: 1, ease:Quad.easeOut});
		TweenMax.to($(".menu-bar .container-menu-bar .logo-mover"), 0.5, {autoAlpha: 0, ease:Quad.easeOut});
	});
	
	/*EACH-MENU*/
	$(".menu-bar .container-menu-bar .m").on("mouseenter", function() {
		var a=$(this).attr('class').split('-')[1];
		var b=$("body").attr('class').split('-')[1];
		if(a != b[0]) {
			TweenMax.to($(this), 0.5, {border: "1px solid rgba(255,255,255,1.00)", ease:Quad.easeOut});
		}
	});
	$(".menu-bar .container-menu-bar .m").on("mouseleave", function() {
		var a=$(this).attr('class').split('-')[1];
		var b=$("body").attr('class').split('-')[1];
		if(a != b[0]) {
			TweenMax.to($(this), 0.5, {border: "1px solid rgba(255,255,255,0.00)", ease:Quad.easeOut});
		}
	});

	/*CONTACT-ELEMENT*/	
	$(".menu-bar .container-menu-bar .ce").on("mouseenter", function() {
		var a=$(this).attr('class').split('-')[1];
		var b=$(this).data("color");
		TweenMax.to($(".menu-bar .container-menu-bar .contact-element .ce-"+a+" .ce-active"), 0.5, {autoAlpha: 1, ease:Quad.easeOut});
		TweenMax.to($(".menu-bar .container-menu-bar .contact-element .ce-"+a+" .ce-non-active"), 0.5, {autoAlpha: 0, ease:Quad.easeOut});
		TweenMax.to($(this), 0.5, {border: "1px solid "+b, ease:Quad.easeOut});
	});
	$(".menu-bar .container-menu-bar .ce").on("mouseleave click", function() {
		var a=$(this).attr('class').split('-')[1];
		TweenMax.to($(".menu-bar .container-menu-bar .contact-element .ce-"+a+" .ce-active"), 0.5, {autoAlpha: 0, ease:Quad.easeOut});
		TweenMax.to($(".menu-bar .container-menu-bar .contact-element .ce-"+a+" .ce-non-active"), 0.5, {autoAlpha: 1, ease:Quad.easeOut});
		TweenMax.to($(this), 0.5, {border: "1px solid rgba(255,255,255,1.00)", ease:Quad.easeOut});
	});
	
	//SECTION-1
	$(".sc-1 .go-to-sc").on("mouseenter", function() {
		TweenMax.to($(this), 0.5, {background: "rgba(255,255,255,1.00)", ease:Quad.easeOut});
	});
	$(".sc-1 .go-to-sc").on("mouseleave click", function() {
		TweenMax.to($(this), 0.5, {background: "rgba(255,255,255,0.40)", ease:Quad.easeOut});
	});
});