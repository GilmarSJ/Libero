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
    console.log(`🤑 Estou online em ${client.user.username}!`);
});

client.slashCommands = new Discord.Collection();
client.login(config.token);
require('./handler')(client);

///ticket
client.on("interactionCreate", (interaction) => {
  if (interaction.isSelectMenu()) {
    if (interaction.customId === "painel_ticket") {
      let opc = interaction.values[0]
      if (opc === "opc1") {

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Nova opção

        let nome = `📨-${interaction.user.id}`;
        let categoria = "" // Coloque o ID da categoria

        if (!interaction.guild.channels.cache.get(categoria)) categoria = null;

        if (interaction.guild.channels.cache.find(c => c.name === nome)) {
          interaction.reply({ content: `❌ Você já possui um ticket aberto em ${interaction.guild.channels.cache.find(c => c.name === nome)}!`, ephemeral: true })
        } else {
          interaction.guild.channels.create({
          name: nome,
          type: Discord.ChannelType.GuildText,
          parent: categoria,
          permissionOverwrites: [
            {
              id: interaction.guild.id,
              deny: [
                Discord.PermissionFlagsBits.ViewChannel
              ]
            },
            {
              id: interaction.user.id,
              allow: [
                Discord.PermissionFlagsBits.ViewChannel,
                Discord.PermissionFlagsBits.SendMessages,
                Discord.PermissionFlagsBits.AttachFiles,
                Discord.PermissionFlagsBits.EmbedLinks,
                Discord.PermissionFlagsBits.AddReactions
              ]
            }
          ]
        }).then( (ch) => {
          interaction.reply({ content: `✅ Olá ${interaction.user}, seu ticket foi aberto em ${ch}!`, ephemeral: true })
          let embed = new Discord.EmbedBuilder()
          .setColor("Random")
          .setDescription(`Olá ${interaction.user}, você abriu o ticket pela opção Comprar.`);
          let botao = new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
          .setCustomId("fechar_ticket")
          .setEmoji("🔒")
          .setStyle(Discord.ButtonStyle.Danger)
          );

          ch.send({ embeds: [embed], components: [botao] }).then( m => { 
            m.pin()
           })
        })
        }
        
      } else if (opc === "opc2") {

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Nova opção

        let nome = `📨-${interaction.user.id}`;
        let categoria = "" // Coloque o ID da categoria

        if (!interaction.guild.channels.cache.get(categoria)) categoria = null;

        if (interaction.guild.channels.cache.find(c => c.name === nome)) {
          interaction.reply({ content: `❌ Você já possui um ticket aberto em ${interaction.guild.channels.cache.find(c => c.name === nome)}!`, ephemeral: true })
        } else {
          interaction.guild.channels.create({
          name: nome,
          type: Discord.ChannelType.GuildText,
          parent: categoria,
          permissionOverwrites: [
            {
              id: interaction.guild.id,
              deny: [
                Discord.PermissionFlagsBits.ViewChannel
              ]
            },
            {
              id: interaction.user.id,
              allow: [
                Discord.PermissionFlagsBits.ViewChannel,
                Discord.PermissionFlagsBits.SendMessages,
                Discord.PermissionFlagsBits.AttachFiles,
                Discord.PermissionFlagsBits.EmbedLinks,
                Discord.PermissionFlagsBits.AddReactions
              ]
            }
          ]
        }).then( (ch) => {
          interaction.reply({ content: `✅ Olá ${interaction.user}, seu ticket foi aberto em ${ch}!`, ephemeral: true })
          let embed = new Discord.EmbedBuilder()
          .setColor("Random")
          .setDescription(`Olá ${interaction.user}, você abriu o ticket pela opção Ajuda.`);
          let botao = new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
          .setCustomId("fechar_ticket")
          .setEmoji("🔒")
          .setStyle(Discord.ButtonStyle.Danger)
          );

          ch.send({ embeds: [embed], components: [botao] }).then( m => { 
            m.pin()
           })
        })
        }
        
      } else if (opc === "opc3") {

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Nova opção

        let nome = `📨-${interaction.user.id}`;
        let categoria = "" // Coloque o ID da categoria

        if (!interaction.guild.channels.cache.get(categoria)) categoria = null;

        if (interaction.guild.channels.cache.find(c => c.name === nome)) {
          interaction.reply({ content: `❌ Você já possui um ticket aberto em ${interaction.guild.channels.cache.find(c => c.name === nome)}!`, ephemeral: true })
        } else {
          interaction.guild.channels.create({
          name: nome,
          type: Discord.ChannelType.GuildText,
          parent: categoria,
          permissionOverwrites: [
            {
              id: interaction.guild.id,
              deny: [
                Discord.PermissionFlagsBits.ViewChannel
              ]
            },
            {
              id: interaction.user.id,
              allow: [
                Discord.PermissionFlagsBits.ViewChannel,
                Discord.PermissionFlagsBits.SendMessages,
                Discord.PermissionFlagsBits.AttachFiles,
                Discord.PermissionFlagsBits.EmbedLinks,
                Discord.PermissionFlagsBits.AddReactions
              ]
            }
          ]
        }).then( (ch) => {
          interaction.reply({ content: `✅ Olá ${interaction.user}, seu ticket foi aberto em ${ch}!`, ephemeral: true })
          let embed = new Discord.EmbedBuilder()
          .setColor("Random")
          .setDescription(`Olá ${interaction.user}, você abriu o ticket pela opção Contato.`);
          let botao = new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
          .setCustomId("fechar_ticket")
          .setEmoji("🔒")
          .setStyle(Discord.ButtonStyle.Danger)
          );

          ch.send({ embeds: [embed], components: [botao] }).then( m => { 
            m.pin()
           })
        })
        }
        
      }
    }
  } else if (interaction.isButton()) {
    if (interaction.customId === "fechar_ticket") {
      interaction.reply(`Olá ${interaction.user}, este ticket será excluído em 5 segundos...`)
      setTimeout ( () => {
        try { 
          interaction.channel.delete()
        } catch (e) {
          return;
        }
      }, 5000)
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
      let channel = client.channels.cache.get('1064948517883363419') //canal para o envio da sugestão.
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
  // client.on("messageCreate", (message) => {
  
  //   if (message.channel.id === "1063146506644881494" /*id do canal para auto reagir.*/) {
  
  //     let concordo = "<:DLSHOSTING:1013988181688975360>"
  //     let nao_concordo = "<a:1477_BlankHeart:1017549988752015460> "
  
  //     message.react(concordo).catch(e => { })
  //     message.react(nao_concordo).catch(e => { })
  
  //   } else { return; }
  // })


  // ///bemvindo

  // client.on('guildMemberAdd', async (member) => {
  //   let servers = ['1013284073936003122']
  //   if(!servers.includes(member.guild.id)) return;
  //   let channel = client.channels.cache.get('1013284074619666485')
  //   if(!channel) return;
    
  //   const embed = new Discord.EmbedBuilder()
  //   .setDescription(`Bem vindo(a)  ${member} Você acaba de entrar na **DLS Hosting**. Atualmente estamos com **${member.guild.memberCount}** membro(s)!  Qualquer dúvida abra um ticket que iremos sanar todas elas! `)
  //   .setImage('https://cdn.discordapp.com/attachments/927639622794739852/1017436375160737942/bemvindo.png')
  //   ///.setFooter({ text: member.user.tag})
    
  //   channel.send({ embeds: [embed] })
  //   })

  
///AFK

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (await db.get(`modo_afk_${message.author.id}`) === true) {
    message.reply(`Olá ${message.author}, seu modo AFK foi desativado!`)
    await db.delete(`modo_afk_${message.author.id}`)
  }

  let afk_user = message.mentions.members.first()
  if (!afk_user) return;

  if (afk_user) {
  let afk_mode = await db.get(`modo_afk_${afk_user.id}`);
  if (afk_mode === true) {
    let afk_motivo = await db.get(`motivo_afk_${afk_user.id}`);
    message.reply(`Olá ${message.author}, o usuário **${afk_user.user.username}** está com o modo AFK ativado pelo motivo: \`${afk_motivo}\``)
  } else {
    return;
  }
  }
});


///AUTOROLE

client.on("guildMemberAdd", (member) => {
  let cargo_autorole = member.guild.roles.cache.get("1064552052237291540") // Coloque o ID do cargo
  if (!cargo_autorole) return console.log("❌ O AUTOROLE não está configurado.")

  member.roles.add(cargo_autorole.id).catch(err => {
    console.log(`❌ Não foi possível adicionar o cargo de autorole no usuário ${member.user.tag}.`)
  })
})