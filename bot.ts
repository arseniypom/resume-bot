import 'dotenv/config';

// import mongoose from 'mongoose';
import { Bot, GrammyError, HttpError } from 'grammy';

const BOT_API_KEY = process.env.BOT_API_KEY;

if (!BOT_API_KEY) {
  throw new Error('BOT_API_KEY is not defined');
}

const bot = new Bot(BOT_API_KEY);

// Callback queries

// User commands
bot.command('start', async(ctx) => {
  await ctx.api.setChatMenuButton({
    chat_id: ctx.chat?.id,
    menu_button: {
      type: 'web_app',
      text: 'Открыть',
      web_app: {
        url: 'https://resume-snap-tan.vercel.app',
      },
    },
  });

  await ctx.reply('Добро пожаловать!', {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Открыть приложение',
            web_app: {
              url: 'https://resume-snap-tan.vercel.app',
            },
          },
        ],
      ],
    },
  });
});


// Keyboard handlers
bot.hears('Hello', (ctx) => {
  ctx.reply('Hello to you too!');
});

// Text message handler
bot.on('message:text', async (ctx) => {
  await ctx.reply(ctx.message.text);
});

// Updated catch handler
bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof GrammyError) {
    console.error("Error in request:", e.description);
  } else if (e instanceof HttpError) {
    console.error("Could not contact Telegram:", e);
  } else {
    console.error("Unknown error:", e);
  }
});

async function startBot() {
  try {
    // const mongoDbUri = process.env.MONGO_DB_URI;
    // if (!mongoDbUri) {
    //   throw new Error('MONGO_DB_URI is not defined');
    // }
    // const mongooseResponse = await mongoose.connect(mongoDbUri);
    // if (!mongooseResponse.connection.readyState) {
    //   throw new Error('Mongoose connection error');
    // }
    void bot.start();
    console.log('Mongoose connected & bot started');
  } catch (error) {
    const err = error as Error;
    console.log(err);
  }
}

void startBot();

export default bot;
