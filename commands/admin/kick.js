const Discord = require("discord.js");

module.exports = {
  name: "kick",
  description: "Expulse um membro.",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "membro",
      description: "Mencione um membro.",
      type: Discord.ApplicationCommandOptionType.User,
      require: true,
    },
    {
      name: "motivo",
      description: "Descreva o motivo da expulção.",
      type: Discord.ApplicationCommandOptionType.String,
      require: false,
    },
  ],

  run: async (client, interaction) => {
    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.KickMembers)) {
        interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, epemeral: true });
    } else {
      const user = interaction.options.getUser("membro");
      const membro = interaction.guild.members.cache.get(user.id);

      let motivo = interaction.options.getString("motivo");
      if (!motivo) motivo = "Motivo não informado";

      let embed = new Discord.EmbedBuilder()
        .setColor("Green")
        .setDescription(
          `O usuário ${membro} foi expulso com sucesso\n\n > Motivo: \`${motivo}\``
        );

      let embed_erro = new Discord.EmbedBuilder()
        .setColor("Red")
        .setDescription(`O usuário ${membro} não foi expulso`);

        membro.kick(motivo).then( () => {
            interaction.reply({ embeds: [embed] })
        }).catch(e => {
            interaction.reply({ embeds: [embed_erro] })
        })
    }
  },
};
