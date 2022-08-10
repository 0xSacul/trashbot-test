const { SlashCommandBuilder, Client, GatewayIntentBits, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, SelectMenuBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
	    .setName('market')
	    .setDescription('Test market')
        .addStringOption(option =>
            option.setName('type')
                .setDescription('What do you want to do?')
                .setRequired(true)
                .addChoices(
                    { name: 'I want to buy', value: 'wtb' },
                    { name: 'I want to sell', value: 'wts' }
                )
            ),
    async execute(interaction) {
        // check what option was selected
        const type = interaction.options.getString('type');
        if (type === 'wtb') {
            interaction.reply({ content: 'You want to buy' });
        } else if (type === 'wts') {
            const row = new ActionRowBuilder()
            .addComponents(
                new SelectMenuBuilder()
                    .setCustomId('wts-select-menu')
                    .setPlaceholder('Select what you want to sell')
                    .setMinValues(1)
                    .setMaxValues(4)
                    .addOptions([
                        { label: 'Wood', value: 'wts-wood' },
                        { label: 'Stone', value: 'wts-stone' },
                        { label: 'Iron', value: 'wts-iron' },
                        { label: 'Gold', value: 'wts-gold' },
                    ]),
            )
            await interaction.reply({ content: 'What do you want to sell today?', components: [row] });

            

        }
    }

}