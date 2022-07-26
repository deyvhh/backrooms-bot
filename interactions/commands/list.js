const { SlashCommandBuilder } = require('discord.js')
const { collectRoom, isConfigChannel } = require('../../db/roomHandler')

module.exports = {
    data:  new SlashCommandBuilder()
        .setName("list")
        .setDescription("Lista osób w pokoju"),
    async execute(interaction) {
        let _isConfigChannel = await isConfigChannel(interaction.channel.id, interaction.guild.id);
        if (!_isConfigChannel) {
            return interaction.reply({
                content: "Nie możesz użyć tej komendy w tym pokoju",
                ephemeral: true
            })
        }
        const room = await collectRoom(interaction.channel.id, interaction.guild.id)
        const users = room.users.map(user => `> <@${user}>`)
        interaction.reply({
            content: users.length > 0 ? users.join('\n') : "Nikt nie posiada dostępu",
            ephemeral: true
        });
    }
}