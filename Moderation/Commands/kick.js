const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions } = require("discord.js");
const helper = require("../modules/helper");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick a user from the server")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("User to Kick from server")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Reason for kicking this user.")
        .setRequired(false)
    ),
  async execute(interaction, guildProfile) {
    let user = interaction.options.getUser("user");
    let reason = interaction.options.getString("reason");
    let member = interaction.guild.members.cache.find(
      (member) => member.id === user.id
    );

    if (!reason) {
      reason = "No Reason provided";
    }

    // Add Permissions Check here

    try {
      await member.kick(reason);
      const embed = new MessageEmbed()
        .setTitle("User Kicked!")
        .setDescription(
          `
User ${user.tag} was kicked successfully. 

**Reason:** ${reason}`
        )
        .setColor("DEFAULT"); // Change later at branding

      return interaction.reply({
        embeds: [embed],
        ephemeral: false,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
