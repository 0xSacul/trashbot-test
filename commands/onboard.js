const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("onboard")
    .setDescription("Get onboard details from the user")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user to get onboard details for")
        .setRequired(true)
    ),
  async execute(interaction) {
    const selectedUser = interaction.options.getUser("user");
    const selectedUserId = selectedUser.id;
    const params = {
      discordId: selectedUserId,
    };
    const selectedUserOnboardDetails = await axios
      .post("https://api-unp.sacul.cloud/lilly/getOnboardData", params)
      .then((res) => {
        if (res.data.success) {
          return res.data.data;
        } else {
          return null;
        }
      })
      .catch((err) => {
        //console.log(err);
        return null;
      });

    if (!selectedUserOnboardDetails) {
      return interaction.reply(
        "This user has not completed the onboarding process (Or there is an error idk ask Sacul)."
      );
    }

    const metamaskWallet =
      selectedUserOnboardDetails.walletMetamask || "unspecified";
    const solanaWallet =
      selectedUserOnboardDetails.walletSolana || "unspecified";
    const roninWallet = selectedUserOnboardDetails.walletRonin || "unspecified";
    const waxWallet = selectedUserOnboardDetails.walletWax || "unspecified";

    const cryptoWallets = `Metamask: ${metamaskWallet}\nSolana: ${solanaWallet}\nRonin: ${roninWallet}\nWax: ${waxWallet}`;

    var gamesInterestedIn = "";
    if (selectedUserOnboardDetails.gamesInterestedIn.length > 0) {
      gamesInterestedIn =
        selectedUserOnboardDetails.gamesInterestedIn.join(", ");
    } else {
      gamesInterestedIn = "None";
    }

    const onboardEmbed = new EmbedBuilder()
      .setTitle(`${selectedUser.username}'s Application`)
      .setColor(0x0099ff)
      .setThumbnail(selectedUserOnboardDetails.discordAvatar)
      .addFields(
        {
          name: "First Name",
          value: selectedUserOnboardDetails.firstName || "unknown",
          inline: true,
        },
        {
          name: "Last Name",
          value: selectedUserOnboardDetails.lastName || "unknown",
          inline: true,
        },
        {
          name: "Country",
          value: selectedUserOnboardDetails.country || "unknown",
          inline: true,
        },
        {
          name: "Email",
          value: selectedUserOnboardDetails.email || "unknown",
          inline: true,
        },
        {
          name: "Phone Number",
          value: selectedUserOnboardDetails.phoneNumber || "unknown",
          inline: true,
        },
        {
          name: "Game(s) interested in",
          value: gamesInterestedIn,
        },
        {
          name: "Wallets",
          value: cryptoWallets,
        },
        {
          name: "Your reason why",
          value: selectedUserOnboardDetails.reasonWhy || "unknown",
        },
        {
          name: "Where did you hear about us",
          value: selectedUserOnboardDetails.hearAboutUs || "unknown",
          inline: true,
        },
        {
          name: "Ever played a crypto game before?",
          value: selectedUserOnboardDetails.nftGamesBefore || "unknown",
        },
        {
          name: "Ever been in a guild?",
          value: selectedUserOnboardDetails.scholarBefore || "unknown",
          inline: true,
        },
        {
          name: "If yes, guild name",
          value: selectedUserOnboardDetails.scholarBeforeName || "unknown",
          inline: true,
        },
        {
          name: "How well do you consider to know the game you are applying for?",
          value: selectedUserOnboardDetails.gameKnowledge || "unknown",
        },
        {
          name: "Referral Discord Username",
          value:
            selectedUserOnboardDetails.referralDiscordUsername || "unknown",
          inline: true,
        },
        {
          name: "Created On",
          value: selectedUserOnboardDetails.createdAt || "unknown",
          inline: true,
        },
        {
          name: "Application Status",
          value: selectedUserOnboardDetails.status || "unknown",
          inline: true,
        }
      );

    return interaction.reply({ embeds: [onboardEmbed] });
  },
};
