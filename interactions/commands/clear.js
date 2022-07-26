const { SlashCommandBuilder } = require('discord.js')
const { isConfigChannel, isUserOwner } = require('../../db/roomHandler')

module.exports = {
    data:  new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Usuń wybraną ilość wiadomości")
        .addIntegerOption(input =>
            input.setName("ilość")
            .setDescription('ile?')
            .setMinValue(1)
            .setMaxValue(99)
            .setRequired(true)
        ),
    async execute(interaction) {
        let _isConfigChannel = await isConfigChannel(interaction.channel.id, interaction.guild.id);
        if (_isConfigChannel) {
            return interaction.reply({
                content: "Nie możesz użyć tej komendy w kanale, który jest konfiguracyjnym",
                ephemeral: true
            })
        }
        let _isUserOwner = await isUserOwner(interaction.user.id ,interaction.channel.id, interaction.guild.id);
        if (!_isUserOwner) {
            return interaction.reply({
                content: "Nie jesteś właścicielem pokoju",
                ephemeral: true
            })
        }
        const res = await interaction.channel.bulkDelete(interaction.options.getInteger("ilość"))
        interaction.reply({
            content: `Usunięto ${res.size} wiadomości`,
            ephemeral: true
        });
    }
}