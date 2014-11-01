'use strict';

window.setTimeout(function(){
	$('header').removeClass("hideHeader").addClass("showHeader");
},700);

function sendMessage() {
	// $('#messageButton').click(function(e){
		var name = $('#messageName').val().toUpperCase();
		var email = $('#messageEmail').val().toLowerCase();
		var date = new Date();
		var message = $('#messageContent').val();

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
					$('#sent').text("Message Sent!").css("opacity",1);
				});
			}
			else{
				alert("E-mail Confirmation Failed :(\nMessage NOT Sent.\n\nPlease Try Again.")
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