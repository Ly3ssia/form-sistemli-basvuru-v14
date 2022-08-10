
const {EmbedBuilder,  ActionRowBuilder, ButtonBuilder, ButtonStyle} = require("discord.js");
const db = require("croxydb")
exports.run = async (client, message, args) => {
        
        if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send("Yeterli yetkin yok!")
  
  let rol = message.mentions.roles.first()
 
  if(!rol) return message.channel.send("Lütfen bir rol etiketle!")
  
  db.set(`basvururol_${message.guild.id}`, rol.id)
  message.channel.send("Ayarlandı!")
    }
   
  


exports.conf = {
  aliases: []
};

exports.help = {
  name: "başvuru-rol"
};
