'use strict';

module.exports = {

	regexPrepare: /##(?<numdice>[1-9][0-9]{0,1})d(?<numsides>1[0-9]{1,8}|[2-9][0-9]{0,8})(?:(?<operator>[+-])(?<modifier>[1-9][0-9]{0,8}))?(?<value>=[1-9][0-9]{0,8})?/gmi,
	regexMarkdown: /##(?<numdice>[1-9][0-9]{0,1})d(?<numsides>1[0-9]{1,8}|[2-9][0-9]{0,8})(?:(?<operator>[+-])(?<modifier>[1-9][0-9]{0,8}))?&#x3D;(?<value>[1-9][0-9]{0,8})/gmi,

	prepare: (force) => (match, numdice, numsides, operator, modifier, value) => {
		if (!force && value) {
			return match;
		}

		numdice = parseInt(numdice);
		numsides = parseInt(numsides);
		let matchWithoutValue = match.replace(/=.*/, '');

		let sum = 0;
		for (let i = 0; i < numdice; ++i) {
			sum += Math.floor(Math.random() * numsides) + 1;
		}
		if (modifier && operator) {
			modifier = parseInt(modifier);
			//do i need to make sure it doesnt go negative or maybe give absolute value?
			if (operator === '+') {
				sum += modifier;
			} else {
				sum -= modifier;
			}
		}
		return `${matchWithoutValue}=${sum}${value ? value : ''}`;
	},

	markdown: (permLevel, match, numdice, numsides, operator, modifier, value) => {
		numdice = parseInt(numdice);
		numsides = parseInt(numsides);
		value = parseInt(value);
		let matchWithoutValue = match.replace(/&#x3D;.*/, '');
		return `<img src='/file/dice.png' height='16' width='16' /><span class='dice'>(${matchWithoutValue}) Lançados ${numdice} dados com ${numsides} lados${modifier ? ' e o modificador '+operator+modifier : '' } = ${value}</span>`;
	},
}
