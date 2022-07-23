const { Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const fs = require('fs');
const index = require("./index.js");

commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith(".js"))
const commands = [];

for (const file of commandFiles){
  const command = require(`./commands/${file}`)
  commands.push(command.data.toJSON())
  index.CommandCollection.set(command.data.name, command)
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

rest.put(Routes.applicationGuildCommands(process.env.S_ONE, process.env.S_TWO), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
