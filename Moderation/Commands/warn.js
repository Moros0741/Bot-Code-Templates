/* 
Warn Schema would be whatever you define is the array of warnings
that have been created inside of a user's profile

example: 

const warn = {
	warnId: { type: Number },
	createdAt: { type: Date, default: Date.now() },
	createdTimestamp: { type: Number },
	reason: { type: String, default: "No Reason Provided" },
	moderator: {
		id: { type: String },
		tag: { type: String }
	}
}
*/

const userSchema = require("../models/userSchema");
const { MessageEmbed, Permissions } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const warnings = require("../modules/warnings");
// Needed for checking permissions;
// const check = require('../modules/permissions');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("warn")
    .setDescription("Warn a member.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user to warn")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("data")
        .setDescription("Reason for warning or Warn Id to review or remove.")
        .setRequired(false)
    ),
  async execute(interaction, guildProfile) {
    let choice = interaction.options.getString("choice");
    let user = interaction.options.getUser("user");
    let input = interaction.options.getString("data");

    switch (choice) {
      case "add":
        await warnings.add(interaction, user, input);
        break;
      case "view":
        await warnings.get(interaction, user, input);
        break;
      case "remove":
        await warnings.delete(interaction, user, input);
        break;
    }
  },
};
