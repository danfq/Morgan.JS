//Morgan.JS Source Code

//Packages
require('dotenv').config();
var colors = require('colors');
const { exec } = require("child_process");
const Discord = require('discord.js');
const { measureMemory } = require('vm');
const client = new Discord.Client();

//Log In
client.on('ready', () => {

    process.stdout.write('\033c')
    exec('title Ralph v1.0')

    console.log(' -------------------------');
    console.log(`  Logged In As ${client.user.tag}`);
    console.log(' -------------------------');
    console.log('');
    console.log(' -----------------------------');
    console.log('  Logging all Commands below:');
    console.log(' -----------------------------');
    console.log('');
});

client.login(process.env.DISCORD_TOKEN);

//Commands
var prefix = process.env.DISCORD_PREFIX

client.on('message', msg => {

    //Log Commands - Shows if Command was Issued by an Admin or a User
    if (msg.content.includes('!') && !(msg.author.id === client.user.id)) {

        if (msg.member.hasPermission("ADMINISTRATOR")) {

            console.log(` > ${msg.author.tag} issued the '${msg.content}' command. | ${'[ADMIN]'.red}`)

        } else {

            console.log(` > ${msg.author.tag} issued the '${msg.content}' command. | ${'[USER]'.blue}`)

        }
    }

    //Ping Command
    if (msg.content === prefix + 'ping') {

        msg.channel.send('Pong! :ping_pong:');

    }

    //Purge Command - Deletes All Messages on Current Channel
    if (msg.content === prefix + 'purge') {

        msg.channel.messages.fetch().then (messages => {

            msg.channel.bulkDelete(messages);

            console.log(` > DELETED ${messages.size} MESSAGES < `.red);

        });

    }

    //Kick Command - Kicks the Mentioned User
    if (msg.content.startsWith(prefix + 'kick')) {

        const user = msg.mentions.users.first();
        
        if (user) {
          
          const member = msg.guild.members.resolve(user);
          
          if (member) {
            
            member
              .kick('Optional reason that will display in the audit logs')
              .then(() => {
                
                msg.channel.send(`Successfully kicked ${user.tag}.`);

                console.log(` > KICKED ${user.tag} < `.red);

              })
              .catch(err => {

                msg.channel.send('I was unable to kick the member you mentioned.');
                
                console.error(err);

              });

          } else {

            msg.channel.send("That user isn't in this guild!");
          }

        } else {

            msg.channel.send("You need to mention a user.");

        }

      }

      //Ban Command - Bans the Mentioned User
      if (msg.content.startsWith(prefix + 'ban')) {
        
        const user = msg.mentions.users.first();
        
        if (user) {
          
          const member = msg.guild.members.resolve(user);
          
          if (member) {
            
            member
              .ban({
                reason: 'Banned!',
              })
              .then(() => {
                
                msg.channel.send(`Successfully banned ${user.tag}.`);

                console.log(` > BANNED ${user.tag} < `.red);

              })
              .catch(err => {
                
                msg.channel.send('I was unable to ban the member you mentioned.');
                
                console.error(err);

              });

          } else {
            
            msg.channel.send("That user isn't in this guild!");

          }

        } else {
          
            msg.channel.send("You need to mention a user.");

        }
        
      }

});