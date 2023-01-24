const { Client, GatewayIntentBits, Events } = require('discord.js');
const config = require('./config.json')
const client = new Client({ intents: 38671 });

client.on(Events.ClientReady, () => {
  client.user.setPresence({ 
    activities: [{ 
      name: 'Master Mu' 
    }], 
    status: 'online' 
  });
  client.user.setUsername('MuBot');
  
  console.log(`Bot foi iniciado, com ${client.users.cache.size} usuários, em ${client.channels.cache.size} Canais, em ${client.guilds.cache.size} servidores`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply(`Meu ping está em: **${client.ws.ping}ms.**`);
  }
});

client.on(Events.MessageCreate, async (message) => {
  if (message.content.startsWith("!clear")) {
    let args = message.content.split(" ").slice(1);
    let num = parseInt(args[0]);
    if(!num) return message.reply("please provide a number of messages to delete")
    message.channel.bulkDelete(num)
      .then(messages => console.log(`Bulk deleted ${messages.size} messages`))
      .catch(console.error);
  }
});

client.login(config.token);