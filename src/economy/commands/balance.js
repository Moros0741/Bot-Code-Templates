const { MessageEmbed, User } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const economy = require('../modules/economy');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("balance")
		.setDescription("View a member's balance, or your own.")
		.addUserOption(option =>
			option
				.setName('user')
				.setDescription("OPTIONAL: User who's balance to see.")
				.setRequired(false)
		),
	async execute(interaction, guildProfile) {
		let user = interaction.options.getUser('user');

		if (!user) {
			user = interaction.user;
		};

		if (guildProfile.economy.isActive === false) {
			return interaction.reply({
				content: "The economy system is disabled for this server.",
				ephemeral: true,
			});
		};

		let userProfile = await economy.getProfile(interaction.user);

		if (userProfile.isBlacklisted) {
			return interaction.reply({
				content: "You are BLACKLISTED from using commands.",
				ephemeral: true,
			});
		};

		return economy.getBalance(interaction, user);
	}
}
