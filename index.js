const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client({
  intents: [
      Discord.GatewayIntentBits.Guilds,
      Discord.GatewayIntentBits.MessageContent,
      Discord.GatewayIntentBits.GuildMessages,
      Discord.GatewayIntentBits.GuildMembers
  ],
  partials: [Discord.Partials.Message, Discord.Partials.Channel]
});

module.exports = client;

client.on('interactionCreate', (interaction) => {
    if (interaction.type === Discord.InteractionType.ApplicationCommand) {
        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd) return interaction.reply('Error');

        interaction['member'] = interaction.guild.members.cache.get(interaction.user.id);
        cmd.run(client, interaction);
    }
});

client.on('ready', () => {
    console.log(`櫨 Estou online em ${client.user.username}!`);
});

client.slashCommands = new Discord.Collection();
client.login(config.token);
require('./handler')(client);

///ticket

const Categorias = {
    'com': {
        nome: '🛒 Comprar-{user-tag}',
        topico: 'Ticket para Comprar de: {user-tag}\n\nID do Usuﾃ｡rio: {user-id}\n**NOTA:** Por favor, Nﾃグ alterar esse tﾃｳpico.',
        categoria: '1017548208362246224',
        embed: '<:carrinho:1017542904941658252>  Agradecemos o seu contato com a **Invoke Roleplay**! Especifique qual **PRODUTO** ou **SERVIÇO** você deseja **ADQUIRIR**, que assim que possível um de nossos atendentes irá atender você.'
    },
    'sup': {
        nome: '⚙️ Suporte {user-tag}',
        topico: 'Ticket para Suporte Geral de: {user-tag}\n\nID do Usuﾃ｡rio: {user-id}\n**NOTA:** Por favor, Nﾃグ alterar esse tﾃｳpico.',
        categoria: '1017548208362246224',
        embed: '<a:config:1017542826705309787> Agradecemos o seu contato com a **Invoke Roleplay**! Especifique qual seu **PROBLEMA** que assim que possível um de nossos atendentes irá atender você.'
    },
    'duv': {
        nome: '❔ Duvida{user-tag}',
        topico: 'Ticket para Dúvidas de: {user-tag}\n\nID do Usuﾃ｡rio: {user-id}\n**NOTA:** Por favor, Nﾃグ alterar esse tﾃｳpico.',
        categoria: '1017548208362246224',
        embed: '<:suporte:1017542857864785940> Agradecemos o seu contato com a **Invoke Roleplay**! Especifique qual sua **DÚVIDA** que assim que possível um de nossos atendentes irá atender você.'
    },
    'par': {
        nome: '❔ Parceria{user-tag}',
        topico: 'Ticket para Parceria de: {user-tag}\n\nID do Usuﾃ｡rio: {user-id}\n**NOTA:** Por favor, Nﾃグ alterar esse tﾃｳpico.',
        categoria: '1017548208362246224',
        embed: '<a:wn_infinito:1017542785999568968> Agradecemos o seu contato com a **Invoke Roleplay**! Especifique detalhadamente qual sua **PROPOSTA** para se tornar um **PARCEIRO**, que assim que possível um de nossos atendentes irá atender você. '
    }
};
const Permissoes = [
    { id: '1013288002962870283', allow: ['ViewChannel', 'SendMessages', 'ManageMessages', 'ManageChannels'], deny: [] }
];

client.on('interactionCreate', async interaction => {
    if (interaction.type !== 3) return;
    
            if (interaction.isSelectMenu()) {
                interaction.message.edit()
                const ProcurarCanal = interaction.guild.channels.cache.find(channel => channel.topic?.includes(interaction.user.id))
                if (ProcurarCanal) return interaction.reply({ content: `Você já tem um ticket aberto no canal ${ProcurarCanal}.`, ephemeral: true })
    
                const CategoriaSelecionada = Categorias[interaction.values[0]]
                const CanalCategoria = await interaction.guild.channels.create({
                    name: (CategoriaSelecionada.nome).replace(/{user-tag}/g, interaction.user.tag),
                    topic: (CategoriaSelecionada.topico).replace(/{user-tag}/g, interaction.user.tag).replace(/{user-id}/g, interaction.user.id),
                    parent: (CategoriaSelecionada.categoria),
                    rateLimitPerUser: 1000,
                    permissionOverwrites: [
                        {
                            id: interaction.guild.id,
                            deny: ['ViewChannel', 'SendMessages', 'AddReactions']
                        },
                        {
                            id: interaction.user.id,
                            allow: ['ViewChannel', 'SendMessages', 'AttachFiles', 'EmbedLinks', 'ReadMessageHistory']
                        },
                        ...Permissoes.map(perm => ({ id: perm.id, allow: perm.allow, deny: perm.deny }))
                    ]
                });
    
                const EmbedTicket = new Discord.EmbedBuilder()
                    .setTitle(`Atendimento de ${interaction.user.username}`)
                    .setDescription(CategoriaSelecionada.embed)
                    .setFooter({ text: 'Para fechar esse ticket clique no botão abaixo.' })
    
                const ButtonTicket = new Discord.ActionRowBuilder().setComponents(
                    new Discord.ButtonBuilder()
                        .setStyle(Discord.ButtonStyle.Secondary)
                        .setCustomId('fechar-ticket')
                        .setLabel('Finalizar atendimento')
                )
    
                CanalCategoria.send({ embeds: [EmbedTicket], components: [ButtonTicket] })
                interaction.reply({
                    content: `Seu ticket foi criado com sucesso, verifique-o no canal ${CanalCategoria}.`,
                    ephemeral: true
                })
            }
    
            if (interaction.isButton()) {
                if (interaction.customId === 'fechar-ticket') {
                    if (!interaction.channel.permissionsFor(interaction.user.id).has(Discord.PermissionFlagsBits.ManageChannels)) return interaction.reply({ content: 'Você não tem permissão para utilizar esse botão.', ephemeral: true })
    
                    interaction.reply({ content: 'Tem certeza que deseja finalizar esse atendimento?\nDigite `sim` para finalizar e `não` para cancelar.' })
                    const coletor = interaction.channel.createMessageCollector({
                        filter: msg => msg.author.id === interaction.user.id && ['sim', 'não', 's', 'sim', 'ss', 'nn', 'n', 'nao'].includes(msg.content.toLowerCase())
                    }).on('collect', (collected) => {
                        collected.delete().catch(e => null)
                        if (['não', 'nn', 'n', 'nao'].includes(collected.content.toLowerCase())) {
                            coletor.stop();
                            return interaction.editReply({ content: 'Esse canal não será mais excluído.' })
                        }
    
                        coletor.stop();
                        interaction.editReply({ content: 'Esse canal será **excluído** em 5 segundos.' })
                        setTimeout(() => interaction.channel.delete().catch(e => null), 5_000)
                    })
                }
            }
    })

    ///antilink

    const { QuickDB } = require('quick.db')
const db = new QuickDB()

client.on('messageCreate', async (message) => {

  if (message.author.bot) return;
  if (message.channel.type == 'dm') return;

  let verificando = await db.get(`antilink_${message.guild.id}`);
  if (!verificando || verificando === "off" || verificando === null || verificando === false) return;

  if (verificando === "on") {

    if (!message.channel.permissionsFor(message.author).has(Discord.PermissionFlagsBits.ManageGuild))
      if (!message.channel.permissionsFor(message.author).has(Discord.PermissionFlagsBits.Administrator))

        if (message.content.includes("https".toLowerCase() || "http".toLowerCase() || "www".toLowerCase() || ".com".toLowerCase() || ".br".toLowerCase())) {

          message.delete();
          message.channel.send({
            content: `${message.author}`,
            embeds: [
              new Discord.EmbedBuilder()
                .setTitle(`System`)
                .setDescription(`**${message.author.tag},** Você não pode enviar links aqui.`)
                .setColor("Red")
                .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL({ dinamyc: true }) })
            ]
          })
        }
  }
})

////sugestão

client.on('interactionCreate', async interaction => {
    //botao
    if (interaction.isButton()) {
      if (interaction.customId.startsWith("botao_modal")) {
        const modal = new Discord.ModalBuilder()
          .setCustomId('modal_sugestao')
          .setTitle(`Olá usuário, Nos diga qual é a sua sugestão.`)
        const sugestao3 = new Discord.TextInputBuilder()
          .setCustomId('sugestão')
          .setLabel('Qual sua sugestão?')
          .setStyle(Discord.TextInputStyle.Paragraph)
  
        const firstActionRow = new Discord.ActionRowBuilder().addComponents(sugestao3);
        modal.addComponents(firstActionRow)
        await interaction.showModal(modal);
  
        interaction.followUp({
          content: `${interaction.user}, Não abuse dessa função, caso contrario poderá e irá resultar em banimento.`,
          ephemeral: true
        })
  
      }
    }
    //
  
    if (!interaction.isModalSubmit()) return;
    if (interaction.customId === 'modal_sugestao') {
      const moment = require("moment")
      let channel = client.channels.cache.get('1014674673985933352') //canal para o envio da sugestão.
      const sugestao2 = interaction.fields.getTextInputValue('sugestão');
  
      interaction.reply({
        content: `<:check:1007452676193259550> | ${interaction.user}, Sua sugestão foi enviada com sucesso!`, ephemeral: true
      })
  
      channel.send({
        embeds: [new Discord.EmbedBuilder()
          .setColor('Green')
          .setAuthor({ name: `👤 - ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dinamyc: true }) })
          .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL({ dinamyc: true }) })
          .setThumbnail(interaction.user.displayAvatarURL({ format: "png", dinamyc: true, size: 4096 }))
          .setDescription(`Horário da sugestão:
  <t:${moment(interaction.createdTimestamp).unix()}>(<t:${parseInt(interaction.createdTimestamp / 1000)}:R>)
  
  \\✏️ - Sugestão:\n\`\`\`${sugestao2}\`\`\``)
        ]
      })
    }
  })
  
  //autoreact mensagem
  client.on("messageCreate", (message) => {
  
    if (message.channel.id === "1016803149530538054" /*id do canal para auto reagir.*/) {
  
      let concordo = "<:DLSHOSTING:1013988181688975360>"
      let nao_concordo = "<a:1477_BlankHeart:1017549988752015460> "
  
      message.react(concordo).catch(e => { })
      message.react(nao_concordo).catch(e => { })
  
    } else { return; }
  })


  ///bemvindo

  client.on('guildMemberAdd', async (member) => {
    let servers = ['1013284073936003122']
    if(!servers.includes(member.guild.id)) return;
    let channel = client.channels.cache.get('1013284074619666485')
    if(!channel) return;
    
    const embed = new Discord.EmbedBuilder()
    .setDescription(`Bem vindo(a)  ${member} Você acaba de entrar na **DLS Hosting**. Atualmente estamos com **${member.guild.memberCount}** membro(s)!  Qualquer dúvida abra um ticket que iremos sanar todas elas! `)
    .setImage('https://cdn.discordapp.com/attachments/927639622794739852/1017436375160737942/bemvindo.png')
    ///.setFooter({ text: member.user.tag})
    
    channel.send({ embeds: [embed] })
    })