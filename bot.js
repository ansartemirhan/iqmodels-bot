const https = require('https');

const TOKEN = '8933173748:AAG9UFColr6MEoTCdjDO0BU2AFEVewGJdgY';
const SITE_URL = 'https://iqmodels.netlify.app';
const KASPI_NUMBER = '+7 775 115 61 26';
const SUPPORT_EMAIL = 'ansarpro37@gmail.com';

function request(method, data) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(data);
    const options = {
      hostname: 'api.telegram.org',
      path: `/bot${TOKEN}/${method}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
      }
    };
    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function mainMenu() {
  return {
    inline_keyboard: [
      [{ text: '🚀 Открыть IQ Models', url: SITE_URL }],
      [{ text: '💎 Подписки и цены', callback_data: 'pricing' }],
      [{ text: 'ℹ️ О платформе', callback_data: 'about' }],
      [{ text: '🎧 Поддержка', callback_data: 'support' }]
    ]
  };
}

async function sendWelcome(chatId, name) {
  await request('sendMessage', {
    chat_id: chatId,
    text: `👋 Привет, ${name}!\n\n🤖 *IQ Models* — платформа ИИ инструментов:\n\n🩻 *ScanIQ* — анализ рентген, МРТ и КТ снимков\n💼 *BizIQ* — генератор бизнес планов\n\nВыбери действие ниже 👇`,
    parse_mode: 'Markdown',
    reply_markup: mainMenu()
  });
}

async function sendPricing(chatId) {
  await request('sendMessage', {
    chat_id: chatId,
    text: `💎 *Планы подписки IQ Models*\n\n🆓 *Бесплатный — 0 ₸*\n• 3 анализа в месяц\n• Рентген + МРТ + КТ\n• История анализов\n\n⭐ *Старт — 3 000 ₸/мес*\n• 30 анализов в месяц\n• Рентген + МРТ + КТ\n• История анализов\n• Поддержка по email\n\n💎 *Про — 5 000 ₸/мес*\n• 100 анализов в месяц\n• Рентген + МРТ + КТ\n• PDF отчёты\n• История без ограничений\n• Приоритетная поддержка\n\n👑 *Премиум — 10 000 ₸/мес*\n• Безлимитные анализы\n• Все функции\n• PDF отчёты\n• BizIQ — бизнес планы\n• Приоритетная поддержка\n\nДля оплаты нажми кнопку ниже 👇`,
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [
        [{ text: '💳 Оплатить через Kaspi', callback_data: 'pay' }],
        [{ text: '🔙 Назад', callback_data: 'back' }]
      ]
    }
  });
}

async function sendPayment(chatId) {
  await request('sendMessage', {
    chat_id: chatId,
    text: `💳 *Оплата через Kaspi*\n\nДля оформления подписки:\n\n1️⃣ Переведи нужную сумму на Kaspi:\n📱 \`${KASPI_NUMBER}\`\n\n2️⃣ Напиши нам на email с темой "IQ Models подписка":\n📧 \`${SUPPORT_EMAIL}\`\n\n3️⃣ Прикрепи скриншот оплаты\n\n4️⃣ Получи доступ в течение 24 часов ✅\n\n_Укажи в письме свой Google email которым входишь на сайт_`,
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [
        [{ text: '📧 Написать на email', url: `mailto:${SUPPORT_EMAIL}?subject=IQ Models подписка` }],
        [{ text: '🚀 Открыть сайт', url: SITE_URL }],
        [{ text: '🔙 Назад', callback_data: 'pricing' }]
      ]
    }
  });
}

async function sendAbout(chatId) {
  await request('sendMessage', {
    chat_id: chatId,
    text: `ℹ️ *О платформе IQ Models*\n\n🤖 IQ Models — казахстанская ИИ платформа с двумя продуктами:\n\n🩻 *ScanIQ*\nАнализ медицинских снимков через ИИ. Поддерживает рентген, МРТ и КТ. Результат за 30 секунд на русском языке.\n\n💼 *BizIQ*\nГенератор бизнес планов для казахстанского рынка. Вводишь идею — получаешь полный план с финансами и маркетингом.\n\n📄 *PDF отчёты*\nСкачивай результаты анализов и бизнес планы в PDF формате.\n\n🔒 *Безопасность*\nСнимки не сохраняются на серверах. Данные защищены.\n\n🇰🇿 Сделано в Казахстане`,
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [
        [{ text: '🚀 Открыть IQ Models', url: SITE_URL }],
        [{ text: '🔙 Назад', callback_data: 'back' }]
      ]
    }
  });
}

async function sendSupport(chatId) {
  await request('sendMessage', {
    chat_id: chatId,
    text: `🎧 *Поддержка IQ Models*\n\nЕсли у вас есть вопросы или проблемы:\n\n📧 Email: \`${SUPPORT_EMAIL}\`\n📱 Kaspi: \`${KASPI_NUMBER}\`\n\n⏱ Время ответа: до 24 часов\n\n*Частые вопросы:*\n\n❓ _Как оплатить подписку?_\nПереведи на Kaspi и напиши нам на email со скриншотом.\n\n❓ _Когда активируют подписку?_\nВ течение 24 часов после получения оплаты.\n\n❓ _Снимки безопасны?_\nДа, они не сохраняются на наших серверах.`,
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [
        [{ text: '📧 Написать в поддержку', url: `mailto:${SUPPORT_EMAIL}` }],
        [{ text: '🔙 Назад', callback_data: 'back' }]
      ]
    }
  });
}

async function getUpdates(offset = 0) {
  const res = await request('getUpdates', {
    offset,
    timeout: 30,
    allowed_updates: ['message', 'callback_query']
  });
  return res.result || [];
}

async function main() {
  console.log('🤖 IQ Models бот запущен...');

  await request('setMyCommands', {
    commands: [
      { command: 'start', description: 'Главное меню' },
      { command: 'pricing', description: 'Планы и цены' },
      { command: 'pay', description: 'Оплатить подписку' },
      { command: 'about', description: 'О платформе' },
      { command: 'support', description: 'Поддержка' }
    ]
  });

  let offset = 0;
  while (true) {
    try {
      const updates = await getUpdates(offset);
      for (const update of updates) {
        offset = update.update_id + 1;

        // Handle messages
        if (update.message) {
          const msg = update.message;
          const chatId = msg.chat.id;
          const text = msg.text || '';
          const name = msg.from?.first_name || 'пользователь';

          if (text.startsWith('/start')) await sendWelcome(chatId, name);
          else if (text === '/pricing') await sendPricing(chatId);
          else if (text === '/pay') await sendPayment(chatId);
          else if (text === '/about') await sendAbout(chatId);
          else if (text === '/support') await sendSupport(chatId);
          else await sendWelcome(chatId, name);
        }

        // Handle callback queries (button clicks)
        if (update.callback_query) {
          const cb = update.callback_query;
          const chatId = cb.message.chat.id;
          const data = cb.data;

          await request('answerCallbackQuery', { callback_query_id: cb.id });

          if (data === 'pricing') await sendPricing(chatId);
          else if (data === 'pay') await sendPayment(chatId);
          else if (data === 'about') await sendAbout(chatId);
          else if (data === 'support') await sendSupport(chatId);
          else if (data === 'back') await sendWelcome(chatId, cb.from?.first_name || 'пользователь');
        }
      }
    } catch (e) {
      console.error('Ошибка:', e.message);
      await new Promise(r => setTimeout(r, 3000));
    }
  }
}

main();
