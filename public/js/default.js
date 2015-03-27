'use strict';

checkMobile();

window.setTimeout(function(){
	$('header').removeClass("hideHeader").addClass("showHeader");
},700);

if (mypages[myindex] == "projects"){
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-48511938-4', 'zxzdesigns.com/projects');
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

    ga('create', 'UA-48511938-4', 'zxzdesigns.com/projects/'+mypages[myindex]);
    ga('send', {
	    'hitType':'pageview',
	    'page':'/projects/'+mypages[myindex]
    });
}