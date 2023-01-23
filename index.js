const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const config = require("./config.json");
// discordapp.com/oauth2/authorize?=&client_id=1066454659620945972&scope=bot&permissions=8 
// ID do bot para adicioanr

client.on('ready', () => {
    console.log(`Bot foi iniciado, com ${client.users.cache.size} usuários, em ${client.channels.cache.size} Canais, em ${client.guilds.cache.size} servidores`);
    client.user.setPresence({ activities: [{ name: 'Master Mu' }], status: 'online' });
    client.user.setUsername('MuBot');
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true },);
        interaction.editReply(`Meu ping está em: **${sent.client.ws.ping}ms.**`);
    }
});

client.login(config.token);