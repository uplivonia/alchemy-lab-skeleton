import 'dotenv/config'
import fetch from 'node-fetch'
import { Telegraf, Markup } from 'telegraf'

const BOT_TOKEN = process.env.BOT_TOKEN
const BACKEND_URL = process.env.BACKEND_URL || 'https://xerothermic-karen-alchemylab-c9014717.koyeb.app'
const WEBAPP_URL = process.env.WEBAPP_URL || 'https://alchemy-lab-skeleton.vercel.app'
const BOT_USERNAME = process.env.BOT_USERNAME || 'Alchemyc_bot' 

if (!BOT_TOKEN) {
    console.error('BOT_TOKEN is not set in .env')
    process.exit(1)
}

const bot = new Telegraf(BOT_TOKEN)

// /start с обработкой реферального payload
bot.start(async (ctx) => {
    const userId = String(ctx.from.id)
    const payload = ctx.startPayload // например: "ref_123456789"

    console.log('User', userId, 'started with payload:', payload)

    if (payload && payload.startsWith('ref_')) {
        const referrerId = payload.slice(4)
        if (referrerId !== userId) {
            try {
                await fetch(`${BACKEND_URL}/api/referrals`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        referrerId,
                        invitedUserId: userId
                    })
                })
            } catch (err) {
                console.error('Failed to send referral to backend:', err)
            }
        }
    }

    return ctx.reply('Welcome to the Alchemy Lab! 🧪', {
        reply_markup: {
            keyboard: [
                [
                    {
                        text: 'Open Alchemy Lab',
                        web_app: { url: WEBAPP_URL }
                    }
                ]
            ],
            resize_keyboard: true
        }
    })
})

// Команда /ref – даём человеку его реферальную ссылку
bot.command('ref', (ctx) => {
    const userId = String(ctx.from.id)
    const link = `https://t.me/${BOT_USERNAME}?start=ref_${userId}`

    return ctx.reply(
        [
            'Your referral link:',
            link,
            '',
            'Invite friends and get extra rewards in the Alchemy Lab 🔮'
        ].join('\n')
    )
})

// Простая /help
bot.help((ctx) =>
    ctx.reply('/start – open the game\n/ref – get your referral link')
)

bot.launch().then(() => {
    console.log('Alchemy Lab bot started')
})

// Корректно завершаем при Ctrl+C
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
