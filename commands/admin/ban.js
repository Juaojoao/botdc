const Discord = require("discord.js")
module.exports = {
    name: "ban",
    description: "Banir um usuário",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
    {
        name: "user",
        description: "Mencione um usuário para ser banido",
        type: Discord.ApplicationCommandOptionType.User,
        required: true,
    },
    {
        name:'motivo',
        description: 'Descrva o motivo do banimento',
        type: Discord.ApplicationCommandOptionType.String,
        required: false,
    }
  ],
  
    run: async (client, interaction) => {
        if(!interaction.member.permissions.has(Discord.PermissionFlagsBits.BanMembers)){
            interaction.reply({ content: `Você não possui permissão para utilizar este comando.`})
          }else{
            const userr = interaction.options.getUser('user')
            const user = interaction.guild.members.cache.get(userr.id)
            let motivo = interaction.options.getString('motivo')
            if(!motivo) motivo = 'Motivo não informado';
        
            let embed = new Discord.EmbedBuilder()
              .setColor('Green')
              .setDescription(`O usuário ${user} (\`${user.id}\`) foi banido com sucesso`);
            
            let embed_erro = new Discord.EmbedBuilder()
              .setColor('Red')
              .setDescription(`Não foi possivel banir o usuário ${user} (\`${user.id}\`)do servidorn\n\n > Motivo: \`${motivo}\``);
        
            user.ban( {reason: [motivo] }).then(()=>{
              interaction.reply({ embeds: [embed] })
            }).catch(e =>{
              interaction.reply({ embeds: [embed_erro] })
            })
          }
    }
}