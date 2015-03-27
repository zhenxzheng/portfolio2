'use strict';

checkMobile();

window.setTimeout(function(){
	$('header').removeClass("hideHeader").addClass("showHeader");
	$('.nextSection').css("top","87%");
},700);

$('#messageName').change(function(){
	validate($(this));
});
$('#messageEmail').change(function(){
	validate($(this));
});
$('#messageContent').change(function(){
	validate($(this));
});


function validate(selector){
	var pattern, input, match, validated;
	var $input;
	if ($(selector).attr('id') == $('#messageName').attr('id')){
		pattern = /[a-zA-Z ]+/;
		$input = $(selector).find('input');
		input = $input.val().toUpperCase();
		match = input.match(pattern);
		validated = (match == input ? true : false);
	}
	else if ($(selector).attr('id') == $('#messageEmail').attr('id')){
		pattern = /[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)\b/;
		$input = $(selector).find('input');
		input = $input.val().toLowerCase();
		match = input.match(pattern);
		validated = (match == input ? true : false);
	}
	else if ($(selector).attr('id') == $('#messageContent').attr('id')){
		$input = $(selector).find('textarea');
		input = $input.val();
		validated = (input != '' ? true : false);
	}

	if (validated){
		$(selector).find('.validation').removeClass("glyphicon glyphicon-remove red").addClass("glyphicon glyphicon-ok green");
		$input.css("border-color","Green");
	}
	else{
		$(selector).find('.validation').removeClass("glyphicon glyphicon-ok green").addClass("glyphicon glyphicon-remove red");
		$input.css("border-color","red");
	}
	return validated;
}
function sendMessage() {
	// $('#messageButton').click(function(e){
		var name = $('#messageName input').val().toUpperCase();
		var email = $('#messageEmail input').val().toLowerCase();
		var date = new Date();
		var message = $('#messageContent textarea').val();


		var validitymsg = "validated"
		if (!validate($('#messageName')) || !validate($('#messageEmail')) || !validate($('#messageContent'))){
			validitymsg ="Something is not right..\n";
			if (!validate($('#messageName'))){
				validitymsg = validitymsg+"\nInvalid Name. [Alphabet A-Z Only]";
			}
			if (!validate($('#messageEmail'))){
				validitymsg = validitymsg+"\nInvalid E-mail. [John.Smith@example.com]";
			}
			if (!validate($('#messageContent'))){
					validitymsg = validitymsg+"\nEmpty Message. ";
			}
		}

		if (validitymsg == "validated"){
			var confirmEmail = prompt("Please re-enter your Email address to send your message.").toLowerCase();
			if (confirmEmail == email)
			{
				var json = {
					"name":name,
					"email":email,
					"confirmEmail":confirmEmail,
					"date":date,
					"message":message
				};
				$.post('/messages/new', json, function() {
					$('#error').text("").css("opacity",0);
					$('#messageButton').replaceWith("<a class=\"button\" id=\"sent\">Message Sent!</a>")
					$('#sent').css({"color":"green",
											"border-color":"green"});
				});
			}
			else{
				$('#error').text("The two Email addresses that you entered did not match :( Please Try Again.").css("opacity",1);
			}
		}
		else{
			alert(validitymsg);
		}

	// });
}

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-48511938-4', 'zxzdesigns.com');
ga('send', {
    'hitType':'pageview',
    'page':'/contact'
  });