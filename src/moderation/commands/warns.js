/* 
View or Delete all of a user's stored warnings.
*/

// CHORE: add permissions checks

const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require("discord.js");
const warnings = require("../modules/warnings");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("warns")
    .setDescription("View or Clear all of a user's warnings.")
    .addStringOption((option) =>
      option
        .setName("choice")
        .setDescription("What would you like to do?")
        .setRequired(true)
        .addChoice("View", "view")
        .addChoice("Clear", "clear")
    )
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("User warnings to view or clear")
        .setRequired(false)
    ),
  async execute(interaction, guildProfile) {
    let choice = interaction.options.getString("choice");
    let user = interaction.options.getUser("user");

    if (!user) {
      user = interaction.user;
    }

    switch (choice) {
      case "view":
        await warnings.getAll(interaction, user);
        break;
      case "clear":
        if (user.id === interaction.user.id) return;
        await warnings.deleteAll(interaction, user);
        break;
    }
  },
};
