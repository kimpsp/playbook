from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes

async def start(update: Update, context):
    web_app_url = "https://your-webapp-url.com "  # <-- Твоя ссылка
    keyboard = InlineKeyboardButton(text="Открыть WebApp", web_app=WebAppInfo(url=web_app_url))
    reply_markup = InlineKeyboardMarkup([[keyboard]])
    await update.message.reply_text("Нажми на кнопку ниже:", reply_markup=reply_markup)

app = ApplicationBuilder().token("ТОКЕН_БОТА").build()
app.add_handler(CommandHandler("start", start))
app.run_polling()
