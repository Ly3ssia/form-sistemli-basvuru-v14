const { Client, GatewayIntentBits, Partials, ButtonBuilder, ButtonStyle, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, InteractionType } = require("discord.js");
const Discord = require("discord.js")
const config = require("./config.js");
const db = require("croxydb")
const client = new Client({
  partials: [
    Partials.Message, 
    Partials.Channel,
    Partials.GuildMember,
    Partials.Reaction,
    Partials.GuildScheduledEvent, 
    Partials.User, 
    Partials.ThreadMember, 
  ],
  intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations, 
    GatewayIntentBits.GuildWebhooks, 
    GatewayIntentBits.GuildInvites, 
    GatewayIntentBits.GuildVoiceStates, 
    GatewayIntentBits.GuildPresences, 
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping, 
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions, 
    GatewayIntentBits.DirectMessageTyping, 
    GatewayIntentBits.MessageContent, 
  ],
});

module.exports = client;

require("./events/message.js")
require("./events/ready.js")

const modal = new ModalBuilder()
.setCustomId('form')
.setTitle('Godzilla - Başvuru Formu!')
  const a1 = new TextInputBuilder()
  .setCustomId('isim')
  .setLabel('İsminiz?')
  .setStyle(TextInputStyle.Paragraph) 
  .setMinLength(2)
  .setPlaceholder('Arda')
  .setRequired(true)
	const a2 = new TextInputBuilder() 
	.setCustomId('yas')
	.setLabel('Yaşınız Nedir?')
  .setStyle(TextInputStyle.Paragraph)  
	.setMinLength(1)
	.setPlaceholder('15')
	.setRequired(true)
	const a3 = new TextInputBuilder() 
	.setCustomId('biz')
	.setLabel('Neden Biz?')
  .setStyle(TextInputStyle.Paragraph)  
	.setMinLength(1)
	.setPlaceholder('Neden Bizimle Çalışmak İstiyorsun?')
	.setRequired(true)
	const a4 = new TextInputBuilder() 
	.setCustomId('yetkili')
	.setLabel('Daha Önce Bir Sunucuda Yetkili Oldun Mu?')
	.setMinLength(1)
  .setStyle(TextInputStyle.Paragraph)  
	.setPlaceholder('Farklı bir sunucuda yetkili oldun mu?')
	const a5 = new TextInputBuilder() 
    .setCustomId('aciklama')
    .setLabel('Eklemek İstediğin?')
    .setMinLength(1)
    .setStyle(TextInputStyle.Paragraph) 
    .setPlaceholder('Ek olarak bir şey söylemek istiyorsan yazabilirsin.')
    const row = new ActionRowBuilder().addComponents(a1);
    const row2 = new ActionRowBuilder().addComponents(a2);
    const row3 = new ActionRowBuilder().addComponents(a3);
    const row4 = new ActionRowBuilder().addComponents(a4);
    const row5 = new ActionRowBuilder().addComponents(a5);
    modal.addComponents(row, row2, row3, row4, row5);
  
   
client.on('interactionCreate', async (interaction) => {

	if(interaction.customId === "başvuru"){
    await interaction.showModal(modal);
	}
})
 
    client.on('interactionCreate', async interaction => {
      if (interaction.type !== InteractionType.ModalSubmit) return;
      if (interaction.customId === 'form') {

  let kanal = db.fetch(`basvurulog_${interaction.guild.id}`)
let rol = db.fetch(`basvururol_${interaction.guild.id}`)


		const isim = interaction.fields.getTextInputValue('isim')
		const yas = interaction.fields.getTextInputValue('yas')
		const biz = interaction.fields.getTextInputValue('biz')
		const yetkili = interaction.fields.getTextInputValue('yetkili')
    const aciklama = interaction.fields.getTextInputValue('aciklama')
	
    const embed = new Discord.EmbedBuilder()
    .setTitle("Yeni Başvuru Geldi!")
    .setDescription(`Başvuran: **${interaction.user.tag}**\n\nİsim: **${isim}**\n\nYaş: **${yas}**\n\nNeden Biz? **${biz}**\n\nYetkili Olduğu Sunucular: **${yetkili}**\n\nAçıklama: **${aciklama}**         ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀`)
    .setColor(0x0099FF)
    const row = new Discord.ActionRowBuilder()
    .addComponents(
    new ButtonBuilder()
    .setCustomId('evet')
    .setLabel('Evet')
    .setStyle(ButtonStyle.Success),
    new ButtonBuilder()
    .setCustomId("hayir")
    .setLabel("Hayır")
    .setStyle(ButtonStyle.Danger))
  
    
    


    await interaction.reply({ content: 'Başvurun gönderildi.', ephemeral: true });
    client.channels.cache.get(kanal).send({embeds: [embed], components: [row]}).then(async m => {
      db.set(`basvuru_${m.id}`, interaction.user.id)
      })
    }
    })




client.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton()) return;

if (interaction.customId == "evet") {
  interaction.deferUpdate()
  const data = await db.get(`basvuru_${interaction.message.id}`)
  if(!data) return;
const uye = data;
  let log = db.fetch(`basvurukanal_${interaction.guild.id}`)
  let rol = db.fetch(`basvururol_${interaction.guild.id}`)
 
  client.channels.cache.get(log).send(`<@${uye}> Adlı Kullanıcının Başvurusu Kabul Edildi Rolleri Verildi.`)
interaction.guild.members.cache.get(uye).roles.add(rol)

}
})


client.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton()) return;

if (interaction.customId == "hayir") {
  interaction.deferUpdate()
  const data = await db.get(`basvuru_${interaction.message.id}`)
  if(!data) return;
const uye = data;
  let log = db.fetch(`basvurukanal_${interaction.guild.id}`)
  
 
  client.channels.cache.get(log).send(`<@${uye}> Adlı Kullanıcının Başvurusu Red Edildi.`)

}
})
  

client.login(config.token)


