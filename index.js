const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'bkacl9amc.pixelforge.gg', // Sunucu adresi
    port: 26383,                    // Port
    username: 'AFK_Bot_724',         // Oyundaki ad
    version: false
  });

  bot.on('spawn', () => {
    console.log('Bot oyuna başarıyla katıldı!');
    // AFK atılmayı önlemek için her 30 saniyede bir zıplar
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 30000);
  });

  bot.on('end', () => {
    console.log('Bağlantı koptu, 10 saniye sonra tekrar bağlanılıyor...');
    setTimeout(createBot, 10000);
  });

  bot.on('error', (err) => console.log('Hata:', err));
}

createBot();
