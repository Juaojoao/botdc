const Discord = require("discord.js");
const client = new Discord.Client({ intents: [1, 512, 32768, 2, 128] });
const config = require("./config.json");

module.exports = client;

// Quando houver uma interação
client.on("interactionCreate", (interaction) => {
  if (interaction.type === Discord.InteractionType.ApplicationCommand) {
    //Gerar comandos usando slashCommands
    const cmd = client.slashCommands.get(interaction.commandName);

    if (!cmd) return interaction.reply(`Error`);

    interaction["member"] = interaction.guild.members.cache.get(
      interaction.user.id
    );

    cmd.run(client, interaction);
  }
});

client.on("ready", () => {
  console.log(`🔥 Estou online em ${client.user.username}!`);
});

client.slashCommands = new Discord.Collection();

require("./handler")(client);

client.login(config.token);
