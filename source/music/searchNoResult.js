const { Client, MessageEmbed, Message } = require('discord.js');

/**
 * 
 * @param {Client} client 
 * @param {Message} message
 */

module.exports = async(client, message, query) => {
    let lang = require('../slashCommands/play').guildLANG || require('../commands/play').guildLANG;
    if (lang == "en") {
        message.channel.send({ content: `:x: | **No result found for \`${query}\`!.**`, embeds: [], allowedMentions: false });
    } else if (lang == "ar") {
        message.channel.send({ content: `:x: | **تم أختيار الخيار: \`${query}\`!.**`, embeds: [], allowedMentions: false });
    }
}
