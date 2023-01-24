## Base

`const fs = require("fs");
const path = require("path");
const { Client, Collection, GatewayIntentBits, Events } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const { token } = require("./config.json");`
## Adicionar Bot

`// discordapp.com/oauth2/authorize?=&client_id=1066454659620945972&scope=bot&permissions=8`

## Ao Adicionar a uma guilda

`client.on("guildCreate", guild =>{
    console.log(`O bot entrou no nosso servidor: ${guild.name} (id: ${guild.id}). População: ${guild.members} membros`);
    client.user.setActivity(`Estou em: ${client.guilds.cache.size} servers`)
})`

## Ao remover de uma guilda

`client.on("guildDelete", guild =>{
    console.log(`O bot foi removido do servidor: ${guild.name} (id: ${guild.id})`);
    client.user.setActivity(`Serving ${client.guilds.cache.size} servers`);
})`

## Para não responder aos bots ou algo direcionado ao dm

`client.on("message", async message =>{
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    if(!message.content.startsWith(config.prefix)) return;
})`

## Base para criar comandos:

`const { SlashCommandBuilder, Client } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
    async execute(interaction) {
    return interaction.reply(`Pong`);
}`}

## Evento para limpar o chat

`client.on(Events.MessageCreate, async (message) => {
    if (message.content.startsWith("!clear")) {
    let args = message.content.split(" ").slice(1);
    let num = parseInt(args[0]);
    if (!num) return message.reply("please provide a number of messages to delete")
    message.channel.bulkDelete(num)
        .then(messages => console.log(`Bulk deleted ${messages.size} messages`))
        .catch(console.error);
}});`
