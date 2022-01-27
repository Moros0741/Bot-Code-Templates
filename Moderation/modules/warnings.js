const { MessageEmbed } = require("discord.js");
const { getCaseNumber } = require("./helper");
const userSchema = require("../models/userSchema");

async function getProfile(user) {
  let userProfile = await userSchema.findOne({
    userId: user.id,
  });

  if (!userProfile) {
    userProfile = new userSchema({
      userId: user.id,
    });
  }
  return userProfile;
}

exports.add = async function (interaction, user, reason) {
  let dateNow = new Date();
  let userProfile = getProfile(user);
  let caseNumber = await getCaseNumber();

  const warn = {
    warnId: caseNumber,
    createdAt: Date.now(),
    createdTimestamp: Math.floor(dateNow.getTime() / 1000),
    reason: reason,
    moderator: {
      id: interaction.user.id,
      tag: interaction.user.tag,
    },
  };

  userProfile.warnings.push(warn);
  userProfile.save();

  const embed = new MessageEmbed()
    .setTitle("User Warned")
    .setDescription(
      `
User ${user.tag} was warned successfully. They now have ${warnings.length} warnings. 

**Reason:** ${reason}`
    )
    .setFooter({
      text: `Warn ID: ${caseNumber}`,
      iconURL: interaction.guild.iconURL({ dynamic: false }),
    })
    .setColor("DEFAULT"); // Change for branding at a later date

  return interaction.reply({
    embeds: [embed],
    ephemeral: false,
  });
};

exports.get = async function (interaction, user, warnId) {
  let userProfile = await getProfile(user);

  if (!userProfile.warnings) {
    return interaction.reply({
      content: "This user has no warnings.",
      ephemeral: true,
    });
  }

  let warning = userProfile.warnings.find(
    (warning) => warning.warnId === warnId
  );

  if (!warning) {
    return interaction.reply({
      content: `No warning found with ID: \`${warnId}\``,
      ephemeral: true,
    });
  }

  const embed = new MessageEmbed()
    .setTitle(`Warning #${warning.warnId}`)
    .setDescription(
      `
***Date:** \`${warning.createdAt.toLocaleString("en-US")}\`
**Moderator: \`${warning.moderator.tag}\` (\`${warning.moderator.id}\`)
**Reason:** ${warning.reason}
`
    )
    .setThumbnail(user.avatarURL({ dynamic: false }));

  return interaction.reply({
    embeds: [embed],
    ephemeral: true,
  });
};

exports.getAll = async function (interaction, user) {
  let userProfile = await getProfile(user);

  if (!userProfile.warnings) {
    return interaction.reply({
      content: "No warnings for this user.",
      ephemeral: true,
    });
  }

  const embed = new MessageEmbed()
    .setTitle(`User Warnings (${warnings.length})`)
    .setDescription(`All warnings for **\`${user.tag}\`**`)
    .setColor("DEFAULT"); // Change at a later date for branding

  for (const warning of userProfile.warnings) {
    embed.addField(
      `Warn | \`${warning.warnId}`,
      `**Date:** <t:${warning.createdTimestamp}:> 
**Moderator:** ${warning.moderator.tag} (\`${warning.moderator.id}\`)
**Reason:** ${warning.reason}`,
      true
    );
  }

  return interaction.reply({
    embeds: [embed],
    ephemeral: true,
  });
};

exports.delete = async function (interaction, user, warnId) {
  let userProfile = await getProfile(user);

  let warning = userProfile.warnings.find(
    (warning) => warning.warnId === warnId
  );

  if (!warning) {
    return interaction.reply({
      content: `No warning found with WarnId: \`${warnId}\``,
      ephemeral: true,
    });
  }

  userProfile.warnings.pull(warning);
  userProfile.save();

  return interaction.reply({
    content: `Warning #\`${warnId}\` has been deleted Successfully.`,
    ephemeral: true,
  });
};

exports.deleteAll = async function (interaction, user) {
  let userProfile = await getProfile(user);

  if (!userProfile.warnings) {
    return interaction.reply({
      content: `**Can't delete what isn't there...** 
> I'll Take the credit though. All warnings deleted for this user.`,
      ephemeral: true,
    });
  }

  userProfile.warnings = [];
  userProfile.save();

  return interaction.reply({
    content: "All warnings deleted for this user.",
    ephemeral: true,
  });
};
