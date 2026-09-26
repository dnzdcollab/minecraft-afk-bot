const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'bkacl9amc.pixelforge.gg',
    port: 26383,
    username: 'AFK_Bot_724',
    version: '1.20.4' // Bağlantının kopmaması için sabit sürüm
  });

  bot.on('spawn', () => {
    console.log('Bot oyuna sabitlendi ve katıldı!');
    
    // AFK atılmamak için 30 saniyede bir zıplama
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 30000);
  });

  bot.on('end', () => {
    console.log('Koptu, 10 saniye sonra tekrar deneniyor...');
    setTimeout(createBot, 10000);
  });

  bot.on('error', (err) => console.log('Hata:', err.message));
}

createBot();
