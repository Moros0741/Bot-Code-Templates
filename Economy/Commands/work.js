const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('work')
		.setDescription('Earn wages from working.'),
	async execute(interaction, guildProfile) {
		return economy.work(interaction.user);
	},
};