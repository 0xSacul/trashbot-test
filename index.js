// Require necessary files
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, InteractionType } = require('discord.js');
const { token } = require('./config.json');

// New client instance with specified intents
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// Read commands
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

// Notify that the bot is online
client.once('ready', () => {
	console.log(`Ready! Logged in as ${client.user.tag}`);
});



// Dynamically execute commands
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command, please contact Sacul if this contiue.' });
	}
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isSelectMenu()) return;

	if (interaction.customId === 'wts-select-menu') {

        // Get the selected option
        const selectedOption = interaction.values

        // Diplay a modal to ask the price of selected option
        const modal = new ModalBuilder()
            .setCustomId('wts-modal')
            .setTitle('How much do you want?')

        // Add a text input to the modal
        const WoodPriceInput = new TextInputBuilder()
            .setCustomId('wts-wood-price-input')
            .setLabel('For Wood')
            .setPlaceholder('Enter the price')
            .setStyle(TextInputStyle.Short);

        /*const WoodQuantityInput = new TextInputBuilder()
            .setCustomId('wts-wood-quantity-input')
            .setLabel('For Wood')
            .setPlaceholder('Enter the quantity')
            .setStyle(TextInputStyle.Short);*/

        const StonePriceInput = new TextInputBuilder()
            .setCustomId('wts-stone-price-input')
            .setLabel('For Stone?')
            .setPlaceholder('Enter the price')
            .setStyle(TextInputStyle.Short);

        /*const StoneQuantityInput = new TextInputBuilder()
            .setCustomId('wts-stone-quantity-input')
            .setLabel('For Stone?')
            .setPlaceholder('Enter the quantity')
            .setStyle(TextInputStyle.Short);*/

        const IronPriceInput = new TextInputBuilder()
            .setCustomId('wts-iron-price-input')
            .setLabel('For Iron?')
            .setPlaceholder('Enter the price')
            .setStyle(TextInputStyle.Short);

        /*const IronQuantityInput = new TextInputBuilder()
            .setCustomId('wts-iron-quantity-input')
            .setLabel('For Iron?')
            .setPlaceholder('Enter the quantity')
            .setStyle(TextInputStyle.Short);*/

        const GoldPriceInput = new TextInputBuilder()
            .setCustomId('wts-gold-price-input')
            .setLabel('For Gold?')
            .setPlaceholder('Enter the price')
            .setStyle(TextInputStyle.Short);

        /*const GoldQuantityInput = new TextInputBuilder()
            .setCustomId('wts-gold-quantity-input')
            .setLabel('For Gold?')
            .setPlaceholder('Enter the quantity')
            .setStyle(TextInputStyle.Short);*/

        // Add the text inputs to the modal
        const WoodPriceInputAction = new ActionRowBuilder().addComponents(WoodPriceInput);
        //const WoodQuantityInputAction = new ActionRowBuilder().addComponents(WoodQuantityInput);
        const StonePriceInputAction = new ActionRowBuilder().addComponents(StonePriceInput);
        //const StoneQuantityInputAction = new ActionRowBuilder().addComponents(StoneQuantityInput);
        const IronPriceInputAction = new ActionRowBuilder().addComponents(IronPriceInput);
        //const IronQuantityInputAction = new ActionRowBuilder().addComponents(IronQuantityInput);
        const GoldPriceInputAction = new ActionRowBuilder().addComponents(GoldPriceInput);
        //const GoldQuantityInputAction = new ActionRowBuilder().addComponents(GoldQuantityInput);

        // if option is selected, add the text inputs to the modal
        var options = [];
        if (selectedOption.includes('wts-wood')) { options.push(WoodPriceInputAction); /*options.push(WoodQuantityInputAction);*/ }
        if (selectedOption.includes('wts-stone')) { options.push(StonePriceInputAction); /*options.push(StoneQuantityInputAction);*/ }
        if (selectedOption.includes('wts-iron')) { options.push(IronPriceInputAction); /*options.push(IronQuantityInputAction);*/ }
        if (selectedOption.includes('wts-gold')) { options.push(GoldPriceInputAction); /*options.push(GoldQuantityInputAction);*/ }

        modal.addComponents(options);

        // Send the modal to the user
        await interaction.showModal(modal);

        // Destroy the select menu
        interaction.deleteReply();

	}
});

client.on('interactionCreate', interaction => {

    // #### NOT WORKING ####

	if (interaction.type !== InteractionType.ModalSubmit) return;

    const wts_wood_price = interaction.fields.getTextInputValue('wts-wood-input'); 
    const wts_stone_price = interaction.fields.getTextInputValue('wts-stone-input');
    const wts_iron_price = interaction.fields.getTextInputValue('wts-iron-input');
    const wts_gold_price = interaction.fields.getTextInputValue('wts-gold-input');

    // check if any of the text inputs are empty
    interaction.reply({ content: `**${interaction.user.name} Want to sell**\n\nWood` });

    
	console.log({ favoriteColor, hobbies });
});

// Login to Discord
client.login(token);