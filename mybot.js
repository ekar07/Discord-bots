var Discord = require("discord.js");
var bot = new Discord.Client();

var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'www.edkarwacki.com',
  user            : 'bot',
  password        : 'Q7LvmGBwLUBwBFO4',
  database        : 'discord'
});


bot.on('message', (message) => {
	if(message.author.bot) return;


	let args = message.content.split(" ").slice(0);
	pool.getConnection(function(err, connection) {
			if(err){
				console.log('Error connecting to Db');
				return;
			}
			console.log('Connection established');
	
			connection.query('SELECT * FROM cusses',function(err,rows,fields){
				if(err){ 
					throw err;
				}
				console.log('Data received from Db:\n');
				console.log(rows);
		
			for (i = 0; i < rows.length; i++) {
				for (j = 0; j < args.length; j++){
				
					if (args[j] == rows[i].cuss){
		
						console.log(args[j],"    ",rows[i].cuss);
						message.reply(rows[i].response);
					}
				}
			}

		});
	connection.release();
	});
});




bot.on('ready',() => {
	console.log('I am ready!');
});

bot.login("MjU4NDQ1MjAxOTY4ODU3MDg4.CzJ5Mw.WUDhV0p9H6qyiCD5KxT1gbTQ9iw");
