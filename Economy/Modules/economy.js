const { MessageEmbed, Interaction } = require('discord.js');
const { jobs, locations, rates } = require('../data/components.json');
const random = require('random');

async function getProfile(user) {
	let userProfile = await userSchema.findOne({userId: user.id});

	if (!userProfile) {
		userProfile = new userSchema({
			userId: user.id,
			balance: 0,
			cooldowns: []
		});
	}
	return userProfile
};

exports.getProfile = async function(user) {
	return await getProfile(user);
};

exports.getBalance = async function(interaction, user) {
	let userProfile = await getProfile(user);

	const embed = new MessageEmbed()
		.setTitle('User Balance')
		.setDescription(`User ${user.tag} has a balance of \`${new Intl.NumberFormat("en-US", userProfile.balance)}\``)
		.setColor("DEFAULT") // change at a later date for branding

	return Interaction.reply({
		embeds: [embed],
		ephemeral: false
	});
};

exports.work = async function(interaction, user) {
	let userProfile = await getProfile(user);

	let cooldown = userProfile.cooldowns.find(
		(cooldown) => cooldown.name === interaction.commandName
	);

	if (!cooldown) {
		
	}

	let workData = jobs[random.int((min = 0), (max = jobs.locations.length))];
	let reward = random.int((min = jobs.rate[0]), (max = jobs.rate[1]));

}