const { SlashCommandBuilder } = require('discord.js')
const { isConfigChannel, isUserInRoom, removeUser, collectRoom } = require('../../db/roomHandler')

module.exports = {
    data:  new SlashCommandBuilder()
        .setName("remove")
        .setDescription("Usuń użytkownika z pokoju")
        .addUserOption(input =>
            input.setName("user")
            .setDescription('Kogo?')
            .setRequired(true)
        ),
    async execute(interaction) {
        let isConfigChannel = await isConfigChannel(interaction.message.channel.id);
        if (!isConfigChannel) {
            interaction.reply("Nie możesz użyć tej komendy w tym pokoju")
            return
        }
        let isUserIn = await isUserInRoom(interaction.channel.id, interaction.options.getMember("user").id)
        if(!isUserIn) return interaction.reply({
            content: 'Użytkownik nie jest w strefie',
            ephemeral: true
        })
        const room = await collectRoom(interaction.channel.id)
        if(!room.settings.isConfigured) return interaction.reply({
            content: 'Musisz wybrac szablon zanim usuniesz osobe',
            ephemeral: true
        })
        removeUser(interaction.channel.id, interaction.options.getMember("user").id)
        const channel = await interaction.guild.channels.cache.get(room.category)
        channel.permissionOverwrites.edit(interaction.options.getMember("user"), { ViewChannel: false })
        room.chats.forEach(async e => {
            const c = await interaction.guild.channels.cache.get(e)
            c.permissionOverwrites.edit(interaction.options.getMember("user"), { ViewChannel: false })
        })
        interaction.reply({
            content: `Użytkownik <@${interaction.options.getMember("user").id}> został usunięty z twojej strefy!`,
            ephemeral: true
        });
    }
}