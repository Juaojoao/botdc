## Base para criar comandos:

const Discord = require("discord.js")
module.exports = {
  name: "", // Coloque o nome do comando
  description: "", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "quantidade",
      description: "Número de mensagens para serem apagadas.",
      type: Discord.ApplicationCommandOptionType.Number,
      required: true,
    },
  ],
  run: async (client, interaction) => {
  }
}

## Adicionar Bot

`// discordapp.com/oauth2/authorize?=&client_id=1066454659620945972&scope=bot&permissions=8`