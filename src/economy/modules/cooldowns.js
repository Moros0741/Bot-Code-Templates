const { MessageEmbed } = require('discord.js');

async function getProfile (user) {
	let userProfile = await user
}

exports.check = async function(interaction) {
	let date = new Date()
	let dateTS = Math.floor(date.getTime() / 1000);

	if (cooldown.usedTimestamp > dateTS) {
		return [false, cooldown.usedTimestamp - dateTS];
	};

	if (cooldown.usedTimestamp <= dateTS) {
		return [true, 0];
	}
}
