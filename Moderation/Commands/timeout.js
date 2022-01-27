/*
Removes a members ability to communicate in any form 
for a set time on Discord inside of your server.
*/

/*
NEEDED:
- ../Logging/log.js
- ../Utility/Permissions.js
*/

const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions } = require("discord.js");
const helper = require("../modules/helper.js");
// Assuming you added the permissions.js from Utility to a Modules folder add:
//const check = require('../modules/permissions');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Places a user in timeout")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("Select a user to place on Timeout.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("duration")
        .setDescription("Length of time for user to be in Timeout")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Reason for placing this user in Timeout")
        .setRequired(false)
    ),
  async execute(interaction, guildProfile) {
    let user = interaction.options.getUser("user");
    let duration = interaction.options.getString("duration");
    let reason = interaction.options.getString("reason");
    let member = interaction.guild.members.cache.find(
      (member) => member.id === user.id
    );

    if (!reason) {
      reason = "No Reason Provided.";
    }

    let time = await helper.convertTime(duration);

    const embed = new MessageEmbed()
      .setTitle("Member Excommunicated")
      .setDescription(
        `User ${user.tag} has been excommunicated for <t:${time}:R>. \n\n **Reason:** ${reason}`
      )
      .setColor("DEFAULT"); // change for branding at a later time

    try {
      await member.disableCommunicationUntil(time, reason);

      return interaction.reply({
        embeds: [embed],
        ephemeral: true,
      });
    } catch (err) {
      console.error(err.message);
    }
  },
};
