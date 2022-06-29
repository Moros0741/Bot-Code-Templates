const { 
  Client, 
  Collection, 
  Intents, 
  MessageEmbed 
} = require("discord.js");
const fs = require("fs")
const mongoose = require("mongoose");

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_PRESENCES
 ]
});

client.commands = new Collection();
client.assets = require("./data/assets.json");

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"))

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  if (command) {
    client.commands.set(command.data.name, command);
  };
};

class BaseEmbed extends MessageEmbed{
  constructor(BaseEmbedData) {
    super(BaseEmbedData) 
    this.color = "" //set color for brand
    this.thumbnail.url = "" //link for branded thumbnail
    this.image.url = "" // Link for branded image / divider
  },
};

client.baseEmbed = (BaseEmbedData) => {
  return new BaseEmbed(BaseEmbedData);
};

const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"))

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args))
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
};

mongoose.connect(database_srv)
  .then((connection) => {
      console.log("connected to database!")
  })
  .catch((err) => {
    console.log("DATABASE: ERROR => Failed to connect to database!")
  });

try { 
  client.login(token);
} catch (err) {
  console.log("DISCORD ERROR: Failed to log onto Discord.");
  console.log("ADVICE: Double check that you have provided the correct token in './data/config.json'")
};
