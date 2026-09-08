URL: https://www.sportstrade.io/js/main-java.js\nSTATUS: 200\n\n$(document).ready(function() {


$('li.dd-nav').hover(function(){
	$(this).find(".navigation-dropdown").slideToggle();
});


$('#tipsterdd').hover(function(){
	$(this).find(".sub-list").fadeToggle();
});


$(".res-gaming").click(function(e){
	e.preventDefault();
	$(".resp-gaming").fadeIn(200);
});

$(".age-restriction").click(function(e){
	e.preventDefault();
	$(".age-res-pop").fadeIn(200);
});

$(".credits-back").click(function(e){
	e.preventDefault();
	$(".credits-back-pop").fadeIn(200);
});

$(".subscribe-button").click(function(e){
	e.preventDefault();
	$(".subscribe-popup").fadeIn();
});

$(".closesubscribe").click(function(e){
	e.preventDefault();
	$(".subscribe-popup").fadeOut();
});

$(".subscribe-overlay").click(function(e){
	e.preventDefault();
	$(".subscribe-popup").fadeOut();
});

$(".popup-close").click(function(e){
	e.preventDefault();
	$(".popup").fadeOut();
});


$(".signin-overlay").click(function(e){
	e.preventDefault();
	$(".signin-popup").fadeOut();
});

$(".closesignin").click(function(e){
	e.preventDefault();
	$(".signin-popup").fadeOut();
});

$("#forgetpass").click(function(e){
	e.preventDefault();
	$(".signin-content").hide();
	$(".forgetpass-content").fadeIn();
});

$("#backtosignin").click(function(e){
	e.preventDefault();
	$(".forgetpass-content").hide();
	$(".signin-content").fadeIn();
});

$("#signin").click(function(e){
	e.preventDefault();
	$(".signin-popup").fadeIn();
});

$("#responsiblegaming").click(function(e){
	e.preventDefault();
	$("#resp-gaming").fadeIn();
});


});






