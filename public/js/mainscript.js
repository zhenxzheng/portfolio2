'use strict';

var $isMobile = null,
	$mainElement = null;
var preload;
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
		'DancingTails',
		'SFMuseum',
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

	document.addEventListener("scroll", headerScroll, false);
	document.addEventListener("touchmove", headerScroll, false);

	updateMainElement();
	mainResize();
	// layoutResize();
	windowResize();
	setHeader();
	$('#main').scroll(function(){
		headerScroll();
	});
	$('#main2').scroll(function(){
		headerScroll();
	});

	//keyScroll();
	checkMobile();
	loadingHome();
	$mainElement.focus();
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
	if (mypages[myindex]=="home"){
		    window.setTimeout(function(){
		    	$('#line1, #line2, #line3').removeClass('hideBottom');
		    	window.setTimeout(function(){
		    		$('header').removeClass("hideHeader").addClass("showHeader");
		    		$('.nextSection').css("top","87%");
		    		$('#splashHome span').removeClass("cubicBezier");
		    	},800);
		    },600);
	}
}

/*
 * Resize Main element
 */
function mainResize(){
	windowWidth=$(window).width();
	windowHeight=$(window).height();

	if(mainN == 1){
		$('#main').css("top",0);
		$('#main').css('height',windowHeight);
		$('#main2').css('height',0);
		$('#main2').css("top",windowHeight);
	}
	else {
		$('#main2').css("top",0);
		$('#main2').css('height',windowHeight);
		$('#main').css('height',0);
		$('#main').css("top",windowHeight);
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
		}
	});
}

function loadingHome(){
	if (preload != null) preload.onload=null;

	var url = "url(\"../HomeCover2.JPG\")";
	preload  = new Image();
	preload.src = "../HomeCover2.JPG";
	preload.onload = function(){
		$mainElement.find('#splashHome').css("background-image", url);
		$mainElement.css("opacity", 1);
		$('#main2').css("opacity",1);
		layoutResize();
	}
}

/*
 * Header functions
 */

//Set header for each page
function setHeader(){
	//if home or about page, white text header for image background
	if (mypages[myindex] == 'home'||
		mypages[myindex] == 'about'||
		mypages[myindex] == 'contact'){
			$('header ul li a').css("color","white");
			$('header').removeClass("whiteHeader").addClass("transHeader");
	}
	//else black text header
	else{
		$('header ul li a').css("color","black");
		$('header').removeClass("transHeader").addClass("whiteHeader");

	}
}
//header scrolling function 
var prevScroll = 0;
var currScroll = 0;
function headerScroll(){
	currScroll = $mainElement.scrollTop();

	// if (mypages[myindex] == 'home'||
	// mypages[myindex] == 'about'){

		if ($mainElement.find(".splash").length > 0)
			for (var i=0; i< $mainElement.find(".splash").length; i++){
				if ($mainElement.find(".splash:eq("+i+")").offset().top < 1 &&
					$mainElement.find(".splash:eq("+i+")").offset().top > ($(window).height()-$('header ul li').height())*-1){
					$('header ul li a').css("color","white");
					$('header').removeClass("whiteHeader").addClass("transHeader");
					break;
				}
				else{
					$('header ul li a').css("color","black");
					$('header').removeClass("transHeader").addClass("whiteHeader");
				}
			}
	// 	if (currScroll > $(window).height()-$('header ul li').height()){
	// 		$('header ul li a').css("color","black");
	// 	}
	// 	else {
	// 		$('header ul li a').css("color","white");
	// 	}
	// 	if (currScroll > $(window).height()){
	// 		$('header').removeClass("transHeader").addClass("whiteHeader");
	// 	}
	// 	else {
	// 		$('header').removeClass("whiteHeader").addClass("transHeader");
	// 	}	
	// }


	//scroll up/down for header hide/show
	if (currScroll > prevScroll){
		$('header').removeClass("showHeader").addClass("hideHeader");
	}
	else {
		$('header').removeClass("hideHeader").addClass("showHeader");
	}
	prevScroll = currScroll;
	
	// $('#splashHome').css({"height": windowHeight-currScroll});
	//hides down arrow when past a quarter of the home page
	if (currScroll > (windowHeight/4)) {
		$('.nextSection').css("opacity", 0);
	}
	else $('.nextSection').css("opacity", 1);
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