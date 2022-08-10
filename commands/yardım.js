const {EmbedBuilder} = require("discord.js");
const config = require("../config.js")
let prefix = config.prefix
exports.run = async (client, message, args) => {

  const menu = new EmbedBuilder()
  .setTitle("Godzilla - Yardım Menüsü")
  .setDescription(`${prefix}yardım\n${prefix}başvuru-log\n${prefix}başvuru-kanal\n${prefix}başvuru-rol\n${prefix}başvur`)
  .setColor(0x0099FF)

  
  message.channel.send({
    embeds: [menu]
  });


};
exports.conf = {
  aliases: []
};

exports.help = {
  name: "yardım"
};