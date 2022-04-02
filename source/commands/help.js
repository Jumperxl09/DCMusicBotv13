const { Client, Message, Guild, MessageEmbed } = require("discord.js");
const ms = require("ms");
const emojis = require('../../config/emojis.json');

module.exports = {
    name: "help",
    aliases: ["h"],
    description: "Give's You The Commands List",

    /**
     * 
     * @param {Client} client
     * @param {Message} message
     * @param {Guild} guild
     */
    run: async(client, message, args, prefix, lang) => {
        const embed = new MessageEmbed()
            .setTitle(`Help Commands`)
            .setColor(0x2f3136)
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setImage('https://share.creavite.co/MHR3oB6TV8eK6XJp.gif')
            .setDescription(`**[reXom](https://github.com/DevelopersSupportAR/rexom.git)**, Play your favorite playlist with ReXom 🎶`)
        require('fs').readdir(__dirname + '/', (err, files) => {
            if (err) return console.error(err);
            files.forEach(file => {
                if (!file.endsWith(".js")) return;
                let props = require(__dirname + '/' + file);
                embed.addFields({ name: prefix + props.name, value: props.description || "o", inline: true })
            });
        });
        message.reply({ content: emojis.loading + " | processing command...", allowedMentions: false, ephemeral: true }).then(msg => {
            setTimeout(() => { msg.edit({ content: emojis.done + " | processing complete!.", embeds: [embed], allowedMentions: false, ephemeral: true }) }, ms('1s'))
        });
    }
};