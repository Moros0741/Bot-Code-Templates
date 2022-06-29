/* 
Handles Button interactions the bot receives

NOTE: 
Only needed if handling buttons on a global scale
*/

// Required for guildProfile system
const guildSchema = require("../models/guildSchema");

module.exports = {
  name: "interactionCreate",
  once: false,
  async execute(interaction) {
    if (!interaction.isButton()) return;

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
			guildProfile = newProfile
		};

    try {
      await buttonHandler.execute(interaction, guildProfile);
    } catch (err) {
      console.log(err);
      return interaction.reply({
        content: "An error occurred while executing this button press",
        ephemeral: true,
      });
    }
    guildProfile.save();
  },
};
