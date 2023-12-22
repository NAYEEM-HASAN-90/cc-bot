import dotenv from 'dotenv';
dotenv.config();
import fetch from 'node-fetch';
import { Telegraf } from 'telegraf';
const BOT_TOKEN = "6338152450:AAHvhTzoM4a5V-Ai7YzkjDYFqgAP0xolT3o"; // process.env.BOT_TOKEN; // or use dotenv to load it from a .env file
const bot = new Telegraf(BOT_TOKEN);

let api = `https://worldbins-bins-api.vercel.app/api/`;

bot.command("start", (ctx) => {
    ctx.reply(`Hey ${ctx.message.from.first_name} !!!
Use /bin xxxxxx to Check BIN 
Support: @NR_NayeeM_7X`);
    });

bot.command("bin", async (ctx) => {
    let bin = ctx.message.text.split(" ")[1];
    let username;
    ctx.message.from.username != undefined ? username = ctx.message.from.username : username = ctx.message.from.first_name;
    console.log(bin)
    if (!bin) return ctx.reply(`@${NR_NayeeM_7X} Please provide a bin`);
    try{
        let res = await fetch(`${api}${bin}`);
        let data = await res.json();
        if(!data.result){
           let msg = `❌ Inalid BIN\nBIN:${bin}\nChecked By:@${NR_NayeeM_7X}`
           ctx.reply(msg)
        }
        else{ let msg = `✅ Valid BIN\nBIN: ${data.bin}\nType:${data.type}\nLevel:${data.level}\nBrand:${data.brand}\nBank:${data.bank}\nCountry: ${data.country}\nChecked By:@${NR_NayeeM_7X}`
            ctx.reply(msg);
        }
       
    }
    catch(err){
        ctx.reply(err.message)
    }
   
    }
);

bot.launch();
