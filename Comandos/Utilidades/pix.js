const Discord = require('discord.js')

module.exports = {
    name: 'pix',
    description: 'Mostra os meios de pagamentos disponíveis na loja.',
    run: async (client, interaction) => {
        // const chave_pix = '(47) 9758-3723'
        const email = 'cancunrpoficial@gmail.com'
        // const qrcode = 'https://nubank.com.br/pagar/18oeta/HfhbkxE3gr'

        const PixEmbed = new Discord.EmbedBuilder()
            .setColor('#56C0F0')
            .setTitle('<:shopping_cart:1064562072844779664> Formas de Pagamentos')
            .setDescription(`Nós temos uma forma de pagamento, abaixo estará listado os meios e o que é necessário para pagar com tal meio.\n<:email:1017547059341033543> **PIX E-MAIL:** ${email}\n`)
            // .setImage(qrcode)
            // \n\n<:vibration_mode:1064563067297484840> **PIX CELULAR:** ${chave_pix}
        interaction.reply({ embeds: [PixEmbed], ephemeral: false })
    }
}