/* 
handles Slash commands recieved by the bot. 
*/

// Needed for guildProfile
const guildSchema = require('../models/guildSchema');

module.exports = {
  name: "interactionCreate",
  once: false,
  async execute(interaction) {
    if (!interaction.isCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) return;

    /*
    If Implementing MongoDB with guildSchema model you will be able to inject the
		functionality for updating & accessing the guildProfile into every interaction or
		command that is received by the bot.
    */
    
    let guildProfile = await guildSchema.findOne({guildId: interaction.guild.id});

    if (!guildProfile) {
      let newProfile = new guildSchema({
        guildId: interaction.guild.id,
      });
      guildProfile = newProfile;
    };

    try {
      await command.execute(interaction, guildProfile);
    } catch (err) {
      console.error(err);
      return interaction.reply({
        content: "An error occured while executing this command.",
        ephemeral: true,
      });
    }
    guildProfile.save();
  },
};
