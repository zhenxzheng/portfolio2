'use strict';
// var titleWidth = $('#splashHome .splashTitle h2').width();
// $('#splashHome .splashTitle .line').css({"width": titleWidth});
layoutResize();

function scrollDown(){
	var destination = $('.home').find('.aboutMe').offset().top;  
    $mainElement.animate({ scrollTop: destination}, 500 );
}
