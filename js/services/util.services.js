'use strict'

function makeid(length = 5) {
	var id = ''
	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

	for (var i = 0; i < length; i++) {
		id += possible.charAt(getRandomInt(0, possible.length))
	}
	return id
}

function getRandomInt(min, max) {
	const minCeiled = Math.ceil(min)
	const maxFloored = Math.floor(max)
	return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled) // The maximum is exclusive and the minimum is inclusive
}
function getRandomIntInclusive(min, max) {
	const minCeiled = Math.ceil(min);
	const maxFloored = Math.floor(max);
	return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
  }
  


function loremIpsum(wordCount) {
	const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
	const words = lorem.split(' ');
	let result = '';
	for (let i = 0; i < wordCount; i++) {
	  result += words[i % words.length] + ' ';
	}
	return result.trim();
  }