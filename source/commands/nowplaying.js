const { Client, Message, MessageEmbed, Permissions } = require("discord.js");
const emojis = require('../../config/emojis.json');
const db = require('quick.db');
const { player } = require('../index');
const progressbar = require("string-progressbar")

module.exports = {
  name: "nowplaying",
  aliases: [],
  description: "What is paying",

  /**
   * 
   * @param {Client} client
   * @param {Message} message
   * @param {Guild} guild
   */

  run: async (client, message, args, prefix, lang) => {
    if (lang == "en") {
      module.exports.guildID = message.guild.id;
      const voiceChannel = message.member.voice.channel;
      if (!voiceChannel) {
        message.reply({ content: emojis.error + " | **You Have To Be On Voice Channel**", allowedMentions: false, ephemeral: true })
        return
      }
      const queue = player.getQueue(message);
      if (!queue) return message.reply({ content: emojis.error + " | **Thare are no music in the queue**", allowedMentions: false, ephemeral: true })
      let track = queue.songs[0];
      if (track) {
        const time = track.duration * 1000;
        const currentTime = queue.currentTime;
        const result = new MessageEmbed()
          .setColor('YELLOW')
          .setAuthor(track.name, track.Thumbnail, track.url)
          .setDescription(`${queue.paused == true ? ":pause_button:" : ":arrow_forward:"} | ${progressbar.filledBar(time === 0 ? currentTime : time, currentTime, 10)[0]} \`[${queue.formattedCurrentTime}/${track.formattedDuration}]\``)
          .setThumbnail(track.Thumbnail)
        message.channel.send({
          embeds: [result],
          ephemeral: false,
          allowedMentions: false
        }).then(async function(m) {
          setInterval(() => {
            m.edit({
              embeds: [new MessageEmbed()
                .setColor('YELLOW')
                .setAuthor(track.name, track.Thumbnail, track.url)
                .setDescription(`${queue.paused == true ? ":pause_button:" : ":arrow_forward:"} | ${progressbar.filledBar(time === 0 ? currentTime : time, currentTime, 10)[0]} \`[${queue.formattedCurrentTime}/${track.formattedDuration}]\``)
                .setThumbnail(track.Thumbnail)
              ],
              ephemeral: false,
              allowedMentions: false
            })
          }, 1000);
        })
      }
    } else if (lang == "ar") {
      const voiceChannel = message.member.voice.channel;
      if (!voiceChannel) {
        message.reply({ content: emojis.error + " | **يجب انت تكون في غرفه صوتيه**", allowedMentions: false, ephemeral: true })
        return
      }
      const queue = player.getQueue(message);
      if (!queue) return message.reply({ content: emojis.error + " | **لم يتم تشغيل اي أغنيه اصلا**", allowedMentions: false, ephemeral: true })
      let track = queue.songs[0];
      if (track) {
        const time = track.duration * 1000;
        const currentTime = queue.currentTime;
        const result = new MessageEmbed()
          .setColor('YELLOW')
          .setAuthor(track.name, track.Thumbnail, track.url)
          .setDescription(`${queue.paused == true ? ":pause_button:" : ":arrow_forward:"} | ${progressbar.splitBar(time === 0 ? currentTime : time, currentTime, 10)[0]} \`[${queue.formattedCurrentTime}/${track.formattedDuration}]\``)
          .setThumbnail(track.Thumbnail)
        message.channel.send({
          embeds: [result],
          ephemeral: false,
          allowedMentions: false
        }).then(async function(m) {
          setInterval(() => {
            m.edit({
              embeds: [new MessageEmbed()
                .setColor('YELLOW')
                .setAuthor(track.name, track.Thumbnail, track.url)
                .setDescription(`${queue.paused == true ? ":pause_button:" : ":arrow_forward:"} | ${progressbar.filledBar(time === 0 ? currentTime : time, currentTime, 10)[0]} \`[${queue.formattedCurrentTime}/${track.formattedDuration}]\``)
                .setThumbnail(track.Thumbnail)
              ],
              ephemeral: false,
              allowedMentions: false
            })
          }, 1000);
        })
      }
    }
  }
};