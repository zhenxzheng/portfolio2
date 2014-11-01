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
	'projects',
		'ActivityViz',		//1
		'UCSDMap',			//2
		'OnMyBlock',		//3
		'PastPortfolios',	//4
		'ResumeDesign',		//5
		'SocialFitness',	//6
		'ParknGo',			//7
		'IconDesign'		//8
];
var myscripts = [
	'../js/home.js',
	'../js/about.js',
	'../js/default.js',
		'../../js/default.js',	//1
		'../../js/default.js',	//2
		'../../js/default.js',	//3
		'../../js/default.js',	//4
		'../../js/default.js',	//5
		'../../js/default.js',	//6
		'../../js/default.js',	//7
		'../../js/default.js'	//8
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
	// layoutResize();
	windowResize();
	setHeader();
	$('#main').scroll(function(){
		headerScroll();
	});
	$('#main2').scroll(function(){
		headerScroll();
	});
	loading();
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

function loading(){
	if (preload != null) preload.onload=null;

	var url = "url(\"../photo1.JPG\")";
	preload  = new Image();
	preload.onload = function(){
		$mainElement.find('splashHome').css("background-image", url);
	}
	window.setTimeout(function(){
		$mainElement.css("opacity", 1);
		$('#main2').css("opacity",1);
		layoutResize();
	}, 1000);
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
			// $('header').css("box-shadow","");
			$('header').css("border-bottom","");

	}
	//else black text header
	else{
		$('header ul li a').css("color","black");
		$('header').css("background","white");
		// $('header').css("box-shadow","0 0 10px #777");
		$('header').css("border-bottom","solid 1px #777");

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
			$('header').css("border-bottom","solid 1px #777");
		}
		else {
			$('header').css("background","");
			$('header').css("border-bottom","");
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