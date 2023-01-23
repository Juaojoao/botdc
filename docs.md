
## Ao inicar
client.on('ready', () => {
    console.log(`Bot foi iniciado, com ${client.users.cache.size} usuários, em ${client.channels.cache.size} Canais, em ${client.guilds.cache.size} servidores`);
    client.user.setPresence({ game: { name: 'comando'} });
});

## Ao Adicionar a uma guilda
client.on("guildCreate", guild =>{
    console.log(`O bot entrou no nosso servidor: ${guild.name} (id: ${guild.id}). População: ${guild.members} membros`);
    client.user.setActivity(`Estou em: ${client.guilds.cache.size} servers`)
})

## Ao remover de uma guilda
client.on("guildDelete", guild =>{
    console.log(`O bot foi removido do servidor: ${guild.name} (id: ${guild.id})`);
    client.user.setActivity(`Serving ${client.guilds.cache.size} servers`);
})

## Para não responder aos bots ou algo direcionado ao dm
client.on("message", async message =>{
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    if(!message.content.startsWith(config.prefix)) return;
})


## Criar comandos:
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
  
    if (interaction.commandName === 'ping') {
        const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true },);
        interaction.editReply(`Meu ping está em: **${sent.client.ws.ping}ms.**`);
    }
});

## Criação de ação botão --MANUTENÇÃO
if (interaction.commandName === 'button') {
		const row = new ActionRowBuilder()
			.addComponents(
                new ButtonBuilder()
                .setCustomId('primary')
                .setLabel('Click me!')
                .setStyle(ButtonStyle.Link)
            );

		const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Vote Reward')
			.setURL('https://mastermu.net')
			.setDescription('Vote e receba!');

	await interaction.reply({ embeds: [embed], components: [row] });