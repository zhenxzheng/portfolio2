'use strict';

checkMobile();

window.setTimeout(function(){
	$('nav').removeClass("hideNav").addClass("showNav");
    animateContent();
},800);

$('.category h2.graphic').addClass('categoryActive');
$('.ux, .code').removeClass('asideActive');
$('.ux img, .code img').css('height',0);
$('.graphic').addClass('asideActive');
$('.graphic img').css('height','auto');

$('.category h2').click(function(){
    $('.category h2').removeClass('categoryActive');
    $(this).addClass('categoryActive');
    if ($(this).hasClass('graphic')) {
        $('.ux, .code').removeClass('asideActive');
        $('.ux img, .code img').css('height',0);
        $('.graphic').addClass('asideActive');
        $('.graphic img').css('height','auto');
    }
    else if ($(this).hasClass('ux')) {
        $('.graphic, .code').removeClass('asideActive');
        $('.graphic img, .code img').css('height',0);
        $('.ux').addClass('asideActive');
        $('.ux img').css('height','auto');
    }
    else if ($(this).hasClass('code')) {
        $('.ux, .graphic').removeClass('asideActive');
        $('.ux img, .graphic img').css('height',0);
        $('.code').addClass('asideActive');
        $('.code img').css('height','auto');
    }
})
if (mypages[myindex] == "projects"){
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-48511938-4', 'zxzdesigns.com');
    ga('send', {
	    'hitType':'pageview',
	    'page':'/projects'
    });
}
else{
	    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-48511938-4', 'zxzdesigns.com');
    ga('send', {
	    'hitType':'pageview',
	    'page':'/projects/'+mypages[myindex]
    });
}