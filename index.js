const { Client, GatewayIntentBits, Events, messageCreate } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ]
});
const config = require("./config.json");

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

client.on("message", async messageCreate => {
    console.log(messageCreate)
    if (messageCreate.content === "clear") {
        messageCreate.channel.bulkDelete(100)
            .then(messages => console.log(`Deleted ${messages.size} messages`))
            .catch(console.error);
    }
});


client.login(config.token);