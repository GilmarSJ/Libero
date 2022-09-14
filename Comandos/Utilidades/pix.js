const Discord = require('discord.js')

module.exports = {
    name: 'pix',
    description: 'Mostra os meios de pagamentos disponíveis na loja.',
    run: async (client, interaction) => {
        const chave_pix = '(11) 98693-9657'
        const email = 'diasperseghin@gmail.com'
        //const qrcore = 'https://'

        const PixEmbed = new Discord.EmbedBuilder()
            .setColor('Aqua')
            .setTitle('<:carrinho:1017542904941658252> Formas de pagamentos da DLS Hosting')
            .setDescription(`Nós temos 2 meios de pagamentos, abaixo estará listado os meios e o que é necessário para pagar com tal meio.\n\n<:pix:1017546565486911638> **PIX CELULAR:** ${chave_pix}\n<:email:1017547059341033543> **PIX E-MAIL:** ${email}\n`)
            //.setImage(qrcode)

        interaction.reply({ embeds: [PixEmbed], ephemeral: false })
    }
}