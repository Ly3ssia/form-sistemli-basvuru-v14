
const db = require("croxydb");
const {EmbedBuilder,  ActionRowBuilder, ButtonBuilder, ButtonStyle} = require("discord.js");

exports.run = async (client, message, args) => {
 
  if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply(`   **Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.**`);
  let kanal = message.mentions.channels.first()
  if(!kanal) return message.reply({content: "> Üzgünüm Bir Kanal Belirtmen Gerekiyor."})
  
  

  

 
    
    message.reply("ayarlandı!")

  db.set(`basvurulog_${message.guild.id}`, kanal.id)
  
}

exports.conf = {
  aliases: []
};

exports.help = {
  name: "başvuru-log"
};
