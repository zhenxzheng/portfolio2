'use strict';

window.setTimeout(function(){
	$('header').removeClass("hideHeader").addClass("showHeader");
},700);

$('#messageName').focusout(function(){
	autoValidate($(this));
});
$('#messageEmail').focusout(function(){
	autoValidate($(this));
});
$('#messageContent').focusout(function(){
	autoValidate($(this));
});


function autoValidate(selector){
	var pattern, input;
	var $input;
	if ($(selector).attr('id') == $('#messageName').attr('id')){
		pattern = /[a-zA-Z ]+/;
		$input = $(selector).find('input');
		input = $input.val().toUpperCase();
	}
	else if ($(selector).attr('id') == $('#messageEmail').attr('id')){
		pattern = /[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)\b/;
		$input = $(selector).find('input');
		input = $input.val().toLowerCase();
	}
	else if ($(selector).attr('id') == $('#messageContent').attr('id')){
		pattern = /.+/;
		$input = $(selector).find('textarea');
		input = $input.val();
	}
	var match = input.match(pattern);
	var validated = (match == input ? true : false);

	if (validated){
		$(selector).find('.validation').removeClass("glyphicon glyphicon-remove red").addClass("glyphicon glyphicon-ok green");
		$input.css("border-color","Green");
	}
	else{
		$(selector).find('.validation').removeClass("glyphicon glyphicon-ok green").addClass("glyphicon glyphicon-remove red");
		$input.css("border-color","red");
	}
}
function sendMessage() {
	// $('#messageButton').click(function(e){
		var name = $('#messageName input').val().toUpperCase();
		var email = $('#messageEmail input').val().toLowerCase();
		var date = new Date();
		var message = $('#messageContent textarea').val();

		var validity = validation(name,email,message);
		if (validity == "validated"){
			var confirmEmail = prompt("E-mail confirmation.\nPlease re-enter your E-mail to send your message.").toLowerCase();
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
				$('#error').text("Email Confirmation Failed :( Please Try Again.").css("opacity",1);
			}
		}
		else{
			alert(validity);
		}

	// });
}

function validation(name, email, message){
	var nameRegExp = /[a-zA-Z ]+/;
	var emailRegExp = /[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)\b/;

	var nameMatch = name.match(nameRegExp);
	var emailMatch = email.match(emailRegExp);

	var validitymsg = "validated";

	$('#messageName, #messageEmail, #messageContent').css("border-color","black");

	if (nameMatch!=name || emailMatch!=email || message=="") {
		validitymsg = "Something is not right..\n";
		if (nameMatch!=name){
			validitymsg = validitymsg+"\nInvalid Name. [English Letters Only]";
			$('#messageName').css("border-color","red");
		}
		if (emailMatch!=email){
			validitymsg = validitymsg+"\nInvalid E-mail. [John.Smith@example.com]";
			$('#messageEmail').css("border-color","red");
		}
		if (message==""){
			validitymsg = validitymsg+"\nEmpty Message. ";
			$('#messageContent').css("border-color","red");
		}
	}
	return validitymsg;
}

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-48511938-4', 'zxzdesigns.com/about');
ga('send', {
    'hitType':'pageview',
    'page':'/about'
  });