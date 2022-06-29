const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban a member from the server")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("User to ban from server")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Reason for banning this user")
        .setRequired(false)
    ),
  async execute(interaction, guildProfile) {
    let user = interaction.options.getUser("user");
    let reason = interaction.options.getString("reason");
    let member = interaction.guild.members.cache.find(
      (member) => member.id === user.id
    );

    if (!reason) {
      reason = "No Reason Provided";
    }

    // Add Permissions Checks

    try {
      await member.ban(reason);

      const embed = new MessageEmbed()
        .setTitle("User Banned!")
        .setDescription(
          stripIndents`User ${user.tag} banned successfully!
          
          **Reason:** ${reason}
          `
        )
        .setColor("DEFAULT"); // Change for branding at a later time

      return interaction.reply({
        embeds: [embed],
        ephemeral: false,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
