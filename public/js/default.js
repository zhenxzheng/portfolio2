'use strict';

checkMobile();

window.setTimeout(function(){
	$('nav').removeClass("hideNav").addClass("showNav");
    animateContent();
},800);

$('.category h2.graphic').addClass('categoryActive');
$('.ux, .code').removeClass('asideActive');
$('.graphic').addClass('asideActive');
$('.projectDetails').css('opacity','1');

$('.category h2').click(function(){
    if (!$(this).hasClass('categoryActive')){
        $mainElement.animate({scrollTop:$(".category").offset().top + $mainElement.scrollTop()-$('nav').height()}, '500', 'swing');
        $('.category h2').removeClass('categoryActive');
        $(this).addClass('categoryActive');
        $('.projectDetails').css('opacity',0);
        var selector = this;
        window.setTimeout(function(){
            if ($(selector).hasClass('graphic')) {
                $('.ux, .code').removeClass('asideActive');
                $('.graphic').addClass('asideActive');
            }
            else if ($(selector).hasClass('ux')) {
                $('.graphic, .code').removeClass('asideActive');
                $('.ux').addClass('asideActive');
            }
            else if ($(selector).hasClass('code')) {
                $('.ux, .graphic').removeClass('asideActive');
                $('.code').addClass('asideActive');
            }
            $('.projectDetails').css('opacity',1);
        },800)
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