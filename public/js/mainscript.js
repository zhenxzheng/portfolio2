'use strict';

var $isMobile = null,
	$mainElement = null;
var windowWidth = 0,
	windowHeight = 0,
	mainN = 1;
	//indexes to keep track of pages and in ajaxify.js
var myindex,
	previndex;

var mypages = [
	'home',
	'about',
	'projects'
];
var myscripts = [
	'../js/home.js',
	'../js/about.js',
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

	updateMainElement();
	mainResize();
	layoutResize();
	windowResize();
	setHeader();
	$('#main').scroll(function(){
		headerScroll();
	});
	$('#main2').scroll(function(){
		headerScroll();
	});
});

function updateMainElement()
{
	if (mainN == 1) {$mainElement = $('#main')}
	else ($mainElement = $('#main2'));
}

function layoutResize(){
	if (mypages[myindex] == 'home'||
		mypages[myindex] == 'about')
		{
		$mainElement.find(".splash").css({"height": windowHeight});
		if(mypages[myindex] == 'home'){
			var titleWidth = $('#splashHome .splashTitle h2').width();
			window.setTimeout(function(){
				$('#splashHome .splashTitle .line').css({"width": titleWidth});
				    window.setTimeout(function(){
				    	$('#zxz, #designs').css('opacity',1);
				    	window.setTimeout(function(){
				    		$('#zxz, #designs').removeClass();
				    		$('header').removeClass("hideHeader").addClass("showHeader");
				    		$('.nextSection').css("bottom","3%");
				    		// $('#splashHome span').removeClass("cubicBezier");
				    	},1000);
				    },600);
			},600);
		}
	}
}

/*
 * Resize Main element
 */
function mainResize(){
	windowWidth=$(window).width();
	windowHeight=$(window).height();
	$('#main').css('height',windowHeight);
	$('#main2').css('height',windowHeight);
	if(mainN == 1){
		$('#main').css("top",0);
		$('#main2').css("top",windowHeight);
	}
	else {
		$('#main2').css("top",0);
		$('#main').css("top",windowHeight);
	}
}

/*
 * Function to resize main container and other layout element when window resizes
 */
function windowResize(){
	$(window).resize(function(){
		if( $isMobile != null ){
			if($(window).width() != windowWidth && $(window).height != windowHeight ){
			  	mainResize();
			  	layoutResize();
			}
		}
		else{
			if($(window).width() != windowWidth || $(window).height() != windowHeight ){
				mainResize();
				layoutResize();
			}
		}     
	});
}


/*
 * Header functions
 */

//Set header for each page
function setHeader(){
	//if home or about page, white text header for image background
	if (mypages[myindex] == 'home'||
		mypages[myindex] == 'about'){
			$('header ul li a').css("color","white");
			$('header').css("background","");
			$('header').css("box-shadow","");
			console.log("home aobut");
	}
	//else black text header
	else{
		$('header ul li a').css("color","black");
		$('header').css("background","white");
		$('header').css("box-shadow","0 0 10px #777");
		console.log("projects");

	}
	if($isMobile != null){
		$('body').addClass('mobileMode');
	}
}
//header scrolling function 
var prevScroll = 0;
function headerScroll(){
	var currScroll = $mainElement.scrollTop();

	if (mypages[myindex] == 'home'||
	mypages[myindex] == 'about'){
		if (currScroll > $(window).height()-$('header ul li').height()){
			$('header ul li a').css("color","black");
		}
		else {
			$('header ul li a').css("color","white");
		}
		if (currScroll > $(window).height()){
			$('header').css("background","white");
			$('header').css("box-shadow","0 0 10px #777");
		}
		else {
			$('header').css("background","");
			$('header').css("box-shadow","");
		}	
	}


	//scroll up/down for header hide/show
	if (currScroll > prevScroll){
		$('header').removeClass("showHeader").addClass("hideHeader");
	}
	else {
		$('header').removeClass("hideHeader").addClass("showHeader");
	}
	prevScroll = currScroll;

}

function scrollDown(){
	var destination = $('.home').find('.aboutMe').offset().top;  
    $mainElement.animate({ scrollTop: destination}, 500 );
}