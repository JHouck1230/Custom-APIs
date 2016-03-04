'use strict';
 
const PORT = 8001;

var md5 = require('md5');
var moment = require('moment');
var http = require('http');

var server = http.createServer(function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');

	var urlParts = req.url.match(/[^/]+/g);

	if(urlParts) {
		var path = urlParts.shift();
		switch(path) {
			case 'square':
				var num = parseInt(urlParts[0]);
				var square = Math.pow(num, 2); 
				res.write(square.toString());
				break;
			case 'sum':
				var sum = urlParts.reduce(function(sum, num) {
					return sum + parseInt(num);
				}, 0);
				res.write(sum.toString());
				break;
			case 'sentence':
				var sentence = decodeURI(urlParts[0]);
				var statsObj = {};
				var letterMatch = sentence.match(/[a-z]/ig) || [];
				statsObj.letterCount = letterMatch.length;
				statsObj.wordCount = sentence.split(' ').length;
				statsObj.avgWordLength = statsObj.letterCount / statsObj.wordCount;
				res.write(JSON.stringify(statsObj));
				break;
			case 'birthday':
				var person = {};
				var birthdate = [urlParts[2], urlParts[0] - 1, urlParts[1]];
				person.age = moment(birthdate).fromNow(true) + ' old';
				person.date = moment(birthdate).format('dddd, MMMM Do YYYY');
				res.write(JSON.stringify(person));
				break;
			case 'gravatar':
				res.write(md5(urlParts.join('')));
				break;
			default:
				break;
		}
	}
	res.write(' \n');
	res.end();
});

server.listen(PORT, function(err) {
	console.log('err: ', err);
	console.log(`Server listening on port ${PORT}`);
});
