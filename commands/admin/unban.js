const Discord = require("discord.js")
module.exports = {
    name: "unban",
    description: "Desbanir um usuário",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
    {
        name: "user",
        description: "Mencione um usuário para ser desbanido",
        type: Discord.ApplicationCommandOptionType.User,
        required: true,
    },
    {
        name:'motivo',
        description: 'Descrva o motivo do desbanimento',
        type: Discord.ApplicationCommandOptionType.String,
        required: false,
    }
  ],
  
    run: async (client, interaction) => {
        if(!interaction.member.permissions.has(Discord.PermissionFlagsBits.BanMembers)){
            interaction.reply({ content: `Você não possui permissão para utilizar este comando.`})
          }else{
            const user = interaction.options.getUser('user')
            let motivo = interaction.options.getString('motivo')
            if(!motivo) motivo = 'Motivo não informado';
        
            let embed = new Discord.EmbedBuilder()
              .setColor('Green')
              .setDescription(`O usuário ${user} (\`${user.id}\`) foi desbanido com sucesso\n\n > Motivo: \`${motivo}\``);
            
            let embed_erro = new Discord.EmbedBuilder()
              .setColor('Red')
              .setDescription(`Não foi possivel desbanir o usuário ${user.id} (\`${user}\`)do servidor`);
        
            interaction.guild.members.unban(user.id, motivo).then(()=>{
              interaction.reply({ embeds: [embed] })
            }).catch(e =>{
              interaction.reply({ embeds: [embed_erro] })
            })
          }
    }
}