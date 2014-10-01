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
});

function updateMainElement()
{
	if (mainN == 1) {$mainElement = $('#main')}
	else ($mainElement = $('#main2'));
}

function layoutResize(){
	if (mypages[myindex] == 'home'||
		mypages[myindex] == 'about'||
		mypages[myindex] == 'projects')
		{
		$mainElement.find(".splash").css({"height": windowHeight});
		if(mypages[myindex] == 'home'){
			var titleWidth = $('#splashHome .splashTitle h2').width();
			window.setTimeout(function(){
				$('#splashHome .splashTitle .line').css({"width": titleWidth});
				    window.setTimeout(function(){
				    	$('#zxz, #designs').css('opacity',1);
				    },600);
			},600);
		}
	}
}
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
function windowResize(){
	$(window).resize(function(){
		if( $isMobile != null ){
			if($(window).width() != windowWidth && $(window).height != windowHeight ){
			  	mainResize();
			  	layoutResize();
			}
		}
		else{
			if($(window).width() != windowWidth || $(window).height != windowHeight ){
				mainResize();
				layoutResize();
			}
		}     
	});
}