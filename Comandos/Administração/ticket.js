const Discord = require('discord.js');

module.exports = {
    name: 'ticket',
    description: 'Grupo de subcomando sobre tickets',
    options: [
        {
            name: 'enviar',
            description: 'Envia a mensagem de ticket para o canal selecionado',
            type: Discord.ApplicationCommandOptionType.Subcommand,
            options: [
                { name: 'canal', description: 'Selecione o canal para onde o ticket será enviado', required: false, type: Discord.ApplicationCommandOptionType.Channel, channelTypes: [Discord.ChannelType.GuildText] }
            ]
        }
    ],
    /** @param {Discord.Client} client @param {Discord.ChatInputCommandInteraction} interaction */
    run: async (client, interaction) => {
        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) return interaction.reply({ content: 'Somente **administradores** podem utilizar este comando.', ephemeral: true });

        const canal = interaction.options.getChannel('canal', false) || interaction.channel;
        if (!canal.permissionsFor(client.user.id).has(Discord.PermissionFlagsBits.SendMessages)) return interaction.reply({ content: 'Eu não tenho permissão para enviar mensagens no canal selecionado.', ephemeral: true });

        const TicketEmbed = new Discord.EmbedBuilder()
            .setTitle('<:ticket:1014337532034564126> Atendimento')
            .setDescription('**SELECIONE UMA OPÇÃO** de acordo com o **ASSUNTO** que você deseja tratar com um de nossos atendentes')
            .setImage('https://cdn.discordapp.com/attachments/927639622794739852/1017436375789875300/acrestoreticket.png')
            .setFooter({ text: 'DLS Hosting © Todos os direitos reservados.', iconURL: interaction.guild.iconURL() })
        

        const TicketMenu = new Discord.ActionRowBuilder()
            .setComponents(
                new Discord.SelectMenuBuilder()
                    .setCustomId('abrir-ticket')
                    .setPlaceholder('Clique aqui para ver as categorias')
                    .setOptions(
                        { label: 'Comprar', emoji: '<:carrinho:1014336802217271387>', description: 'Realize a compra de um produto', value: 'com' },
                        { label: 'Suporte', emoji: '<a:config:1016066129078263830>', description: 'Suporte para produtos adquiridos e dúvidas', value: 'sup' },
                        { label: 'Dúvidas', emoji: '<:suporte:1014341338776485928>', description: 'Para retirar dúvidas sobre um produto', value: 'duv' },
                        { label: 'Parceria', emoji: '<:parceria:1014337569158352917> ', description: 'Seja um parceiro da loja', value: 'par' },
                    )
            )

        await canal.send({
            embeds: [TicketEmbed],
            components: [TicketMenu]
        }).catch((e) => {
            if (!interaction.replied) return interaction.reply({ content: 'Ocorreo um erro ao enviar o menu:\n' + e.message });
            interaction.editReply({ content: 'Ocorreu um erro ao enviar o menu:\n' + e.message });
        });
        interaction.reply({ content: `O menu para criação de ticket foi enviado em ${canal}.`, ephemeral: true });
    }
}