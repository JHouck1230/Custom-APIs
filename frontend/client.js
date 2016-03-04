'use strict';

$(function() {
	$(document).on('click', '.input', createRequest);
})

function createRequest(event) {
	event.preventDefault();
	var $this = $(this);
	var request;
	switch($this.attr('id')) {
		case 'squareBut':
			var num = $('#squareInput').val();
			num.toString();
			request = `square/${num}`;
			sendRequest($this, num, request);
		 	break;		 
	 	case 'sumBut':
	 		var num = $('#sumInput').val();
			num.toString();
			num = num.split(/\D/).join('/');
			request = `sum/${num}`;
			sendRequest($this, num, request);
		 	break;		 
	 	case 'sentBut':
	 		var sentence = $('#sentInput').val();
			sentence.toString();
			request = `sentence/${sentence}`;
			sendRequest($this, sentence, request);
		 	break;		 
	 	case 'birthBut':
	 		var date = $('#birthInput').val().split('-');
	 		var birthday = [date[1], date[2], date[0]]
	 		birthday = birthday.join('/');
			birthday.toString();
			request = `birthday/${birthday}`;
			sendRequest($this, birthday, request);
		 	break;		 
	 	case 'emailBut':
	 		var email = $('#emailInput').val();
			email.toString();
			request = `gravatar/${email}`;
			sendRequest($this, email, request);
		 	break;
		default:
			break;
	}
}

function sendRequest($this, entry, request) {
	$.ajax({
		url: `http://localhost:8001/${request}`,
		success: function(data) {
			showData($this, entry, data);
			return;
		},
		error: function(err) {
			console.log('error: ', error);
		}
	})
}

function showData($this, entry, data) {
	switch($this.attr('id')) {
		case 'squareBut':
			$('#squareOutput').text(`Squared: ${data}`);
		 	break;		 
	 	case 'sumBut':
	 		$('#sumOutput').text(`Sum: ${data}`);
		 	break;		 
	 	case 'sentBut':
	 		data = JSON.parse(data);
	 		$('#sentOutput').text(`"${entry}," analyzed: Letter Count: ${data.letterCount} Word Count: ${data.wordCount} Average Word Length: ${data.avgWordLength}`);
		 	break;		 
	 	case 'birthBut':
	 		data = JSON.parse(data);
	 		$('#birthOutput').text(`${entry}: Age: ${data.age} Date: ${data.date}`);
		 	break;		 
	 	case 'emailBut':
	 		$('#gravImage').attr('src', `http://en.gravatar.com/avatar/${data}`);
		 	break;
		default:
		break;
	}
}


