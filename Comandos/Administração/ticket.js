const Discord = require("discord.js")

module.exports = {
  name: "ticket", // Coloque o nome do comando
  description: "Abra o painel de tickets.", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages)) {
        interaction.reply({ content: `Você não possui permissão para utilzar este comando!`, ephemeral: true })
    } else {
        let embed = new Discord.EmbedBuilder()
        .setColor("#56C0F0")
        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
        .setDescription(`Abra um ticket aqui no servidor selecionando uma das opções abaixo:`);

        let painel = new Discord.ActionRowBuilder().addComponents(
            new Discord.SelectMenuBuilder()
            .setCustomId("painel_ticket")
            .setPlaceholder("Clique aqui!")
            .addOptions(
                {
                    label: "Comprar",
                    description: "Deseja comprar algo?.",
                    value: "opc1"
                },
                {
                    label: "Ajuda",
                    description: "Precisa de ajuda?.",
                    value: "opc2"
                },
                {
                    label: "Contato",
                    description: "Entre em contato conosco.",
                    value: "opc3"
                }
            )
        );

        interaction.reply({ content: `✅ Mensagem enviada!`, ephemeral: true })
        interaction.channel.send({ embeds: [embed], components: [painel] })
    }


  }
}