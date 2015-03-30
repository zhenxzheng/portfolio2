'use strict';

var $isMobile = null,
	$mainElement = null;
var preload,
	highRes = false;
var windowWidth = 0,
	windowHeight = 0,
	mainN = 1;
	//indexes to keep track of pages and in ajaxify.js
var myindex,
	previndex;

var mypages = [
	'home',
	'about',
	'contact',
	'projects',
		'ActivityViz',		//1
		'UCSDMap',			//2
		'OnMyBlock',		//3
		'PastPortfolios',	//4
		'ResumeDesign',		//5
		'SocialFitness',	//6
		'ParknGo',			//7
		'IconDesign',		//8
		'DancingTails',		//9
		'SFMuseum',			//10
	'instagram'
];
var myscripts = [
	'../js/home.js',
	'../js/about.js',
	'../js/contact.js',
	'../js/default.js',
		'../../js/default.js',	//1
		'../../js/default.js',	//2
		'../../js/default.js',	//3
		'../../js/default.js',	//4
		'../../js/default.js',	//5
		'../../js/default.js',	//6
		'../../js/default.js',	//7
		'../../js/default.js',	//8
		'../../js/default.js',	//9
		'../../js/default.js',	//10
	'../js/default.js'
];


$(document).ready(function(){
	// RegExp search for address href, .+(1 or more character) \/ (end in escape /) ([^\/]+) (all other character except /)
	var pattern = /.+\/([^\/]+)/;
	var regexpMatches = pattern.exec(window.location.href);
	myindex = jQuery.inArray(regexpMatches[1],mypages);
	previndex = myindex;
	
	$isMobile=navigator.userAgent.match(/(Phone|iPod|iPad|Android|BlackBerry)/);
	windowWidth=$(window).width();
	windowHeight=$(window).height();

	document.addEventListener("scroll", scrollingStuff, false);
	document.addEventListener("touchmove", scrollingStuff, false);

	updateMainElement();
	mainResize();
	// layoutResize();
	windowResize();
	setNav();
	$('#main').scroll(function(){
		scrollingStuff();
	});
	$('#main2').scroll(function(){
		scrollingStuff();
	});
	$mainElement.css("opacity", 1);
	$('#main2').css("opacity",1);
	layoutResize();
	//keyScroll();
	checkMobile();
	$mainElement.focus();
	if( window.devicePixelRatio ){
		if( window.devicePixelRatio > 1 ){
			loadHighRes();
		}
	}
});


/*
 * Update main content Selector 
 */
function updateMainElement()
{
	if (mainN == 1) {$mainElement = $('#main')}
	else ($mainElement = $('#main2'));
}

/*
 * Resize splash images
 */
function layoutResize(){
	$mainElement.find(".splash").css({"height": windowHeight});
}
function homeLogoAnimation(){
	window.setTimeout(function(){
		$('#line1, #line2, #line3').removeClass('hideBottom');
		window.setTimeout(function(){
			$('nav').removeClass("hideNav").addClass("showNav");
			$('.nextSection').css("top","87%");
		},800);
	},600);
}
/*
 * Resize Main element
 */
function mainResize(){
	windowWidth=$(window).width();
	windowHeight=$(window).height();

	if(mainN == 1){
		$('#main').css({top:0, height:windowHeight});
		$('#main2').css({top:windowHeight, height:0});
	}
	else {
		$('#main2').css({top:0, height:windowHeight});
		$('#main1').css({top:windowHeight, height:0});
	}
}

/*
 * Function to resize main container and other layout element when window resizes
 */
function windowResize(){
	$(window).resize(function(){
		if($(window).width() != windowWidth || $(window).height() != windowHeight ){
			mainResize();
			layoutResize();
			if ($(window).width() > 2000) loadHighRes();
		}
	});
}

function loadHighRes(){
	if (!highRes){
		var imgObjArr = new Array();
		$('.hasHighRes').each(function(i, image){
			imgObjArr[i] = new Image();
			if ($(image).attr('src')===undefined){
				var newUrl = new RegExp(/http.+\/[^\/'");]+/).exec($(image).attr("style").match(/background-image.+/)[0])[0].replace(/\./, "@2x.");
				imgObjArr[i].src = newUrl;
				imgObjArr[i].onload = function(){
					$(image).css('background-image', 'url('+newUrl+')');
				}
			}
			else{
				var newUrl = $(image).attr('src').replace(/\./, "@2x.");
				imgObjArr[i].src = newUrl;
				imgObjArr[i].onload = function(){
					$(image).attr('src', newUrl);
				}
			}
		})
		highRes = true;
	}
}

/*
 * Nav functions
 */

//Set nav for each page
function setNav(){
	//if home or about page, white text nav for image background
	if (mypages[myindex] == 'home'||
		mypages[myindex] == 'about'||
		mypages[myindex] == 'contact'){
			$('nav ul li a').css("color","white");
			$('nav').removeClass("whiteNav").addClass("transNav");
	}
	//else black text nav
	else{
		$('nav ul li a').css("color","black");
		$('nav').removeClass("transNav").addClass("whiteNav");

	}
}
//Nav scrolling function 
var prevScroll = 0;
var currScroll = 0;
function scrollingStuff(){
	currScroll = $mainElement.scrollTop();

	// if (mypages[myindex] == 'home'||
	// mypages[myindex] == 'about'){

	if ($mainElement.find(".splash").length > 0)
		for (var i=0; i< $mainElement.find(".splash").length; i++){
			if ($mainElement.find(".splash:eq("+i+")").offset().top < 1 &&
				$mainElement.find(".splash:eq("+i+")").offset().top > ($(window).height()-$('nav ul li').height())*-1){
				$('nav ul li a').css("color","white");
				$('nav').removeClass("whiteNav").addClass("transNav");
				break;
			}
			else{
				$('nav ul li a').css("color","black");
				$('nav').removeClass("transNav").addClass("whiteNav");
			}
		}

	//scroll up/down for nav hide/show
	if (currScroll > prevScroll){
		$('nav').removeClass("showNav").addClass("hideNav");
	}
	else {
		$('nav').removeClass("hideNav").addClass("showNav");
	}
	prevScroll = currScroll;
	
	// $('#splashHome').css({"height": windowHeight-currScroll});
	//hides down arrow when past a quarter of the home page
	if (currScroll > (windowHeight/4)) {
		$('.nextSection').css("opacity", 0);
	}
	else $('.nextSection').css("opacity", 1);
	animateContent();
}

function animateContent(){
	console.log("animating");
	$('.bottom, .top, .left, .right, .scale').each(function(i, item){
		if ($(item).hasClass('hideBottom')){
			console.log($(item).offset().top +" | "+$(window).height())
			if ($(item).offset().top < $(window).height()){
				$(item).removeClass('hideBottom');
				window.setTimeout(function(){
					$(item).removeClass('bottom');
				},1000)
			}
		}
		else {
			if ($(item).offset().top + $(item).height()/2 < $(window).height()){
				$(item).removeClass('hideTop hideLeft hideRight scaleHide');
				window.setTimeout(function(){
					$(item).removeClass('top left right scale');
				},1000)
			}
		}
	})
}

function scrollDown(destination){
    if ($isMobile == null) $mainElement.animate({ scrollTop: $mainElement.find(destination).offset().top}, 500 );
    else $mainElement.animate({scrollTop: $mainElement.find(destination).offset().top},500)
}

function checkMobile(){
	if($isMobile != null){
		$('body').addClass("mobileMode");
		$('.splash').css("background-attachment","scroll");
		// $('.button').bind('touchstart',function(){
		// 	$('.button').css({	"background":"#373737",
		// 						"color":"#fff"});
		// 	console.log("touch started");

		// });
		// $('.button').bind('touchend',function(){
		// 	$('.button').css({	"background":"#fff",
		// 						"color":"#373737"});
		// 	console.log("touch ended");
		// });
		// $('#mutt .button').bind('touchstart',function(){
		// 	$('.button').css({	"background":"#fff",
		// 						"color":"#000"});
		// 	console.log("touch started");

		// });
		// $('#mutt .button').bind('touchend',function(){
		// 	$('.button').css({	"background":"transparent",
		// 						"color":"#fff"});
		// 	console.log("touch ended");
		// });
	}
}

// function keyScroll(){

// 	document.getElementsByTagName("body")[0].onkeydown = function(e){
// 		console.log("key pressed");

// 		if (document.activeElement == $("body")[0]){
// 			var charCode = e.keyCode || e.charCode;
// 			if (charCode == 40){
// 				if (currScroll < $mainElement[0].scrollHeight-$mainElement.height()){
// 					currScroll = currScroll + 40;
// 					$mainElement.scrollTop(currScroll);
// 					console.log("down key");
// 				}
// 			}
// 			else if (charCode == 38){
// 				if (currScroll > 40){
// 					currScroll = currScroll - 40;
// 					$mainElement.scrollTop(currScroll);
// 					console.log("up key");
// 				}
// 				else if (currScroll > 0){
// 					currScroll = 0;
// 					$mainElement.scrollTop(currScroll);
// 					console.log("up key");
// 				}

// 			}
// 		}
// 	}
// }