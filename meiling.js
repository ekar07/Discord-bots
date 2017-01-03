const Discord = require("discord.js");
const client = new Discord.Client();
const ytdl = require('ytdl-core');
const streamOptions = { seek: 0, volume: 0.10 };
var mysql = require('mysql');
var pool  = mysql.createPool({
  host            : 'www.edkarwacki.com',
  user            : 'bot',
  password        : 'Q7LvmGBwLUBwBFO4',
  database        : 'discord'
});

function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

// Joins the voice channel as soon as the client starts up
client.on('message', (message) => {
	
	
	if(message.author.bot) return;
	

	if (message == "140.96"){
		pool.getConnection(function(err, connection) {
			if(err){
				console.log('Error connecting to Db');
				return;
			}
			console.log('Connection established');
			connection.query('SELECT * FROM proverbs',function(err,rows){
				if(err){ 
					throw err;
				}
				console.log('Data received from Db:\n');
				i = randomInt(0,rows.length);
				meilingvid = rows[i].url;
				// Get the channel via ID
				let channel = client.channels.get('255874834364497923');
				//let channel = client.channels.get('210153699153149953');
				// Or via name (less persistent)

				channel.join()
				.then(connection => {
					console.log('Connected')
					const stream = ytdl(meilingvid, {filter : 'audioonly'});
					const dispatcher = connection.playStream(stream, streamOptions);
				});
		//var interval = setInterval (function(){
		//channel.disconnect(), 60*1000});
			});
		
		});
		
	}
});
//client.destroy();
client.on('ready',() => {
	console.log('I am ready!');
});
//log into the discord server
client.login("MjYwMjgwMjA3MDIwMjYxMzc4.CzkEjw.5CSpxBc1plsXRqfRp9Y294L1lpo");
