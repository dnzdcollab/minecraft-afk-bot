const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'bkacl9amc.pixelforge.gg',
    port: 26383,
    username: 'AFK_Bot_724',
    version: '26.1.2', // Bağlantı kopmalarını engellemek için kararlı sürüm
    checkTimeoutInterval: 60000 // Zaman aşımı süresini artır
  });

  bot.on('spawn', () => {
    console.log('Bot bağlandı ve pasif modda duruyor.');
    
    // Sürekli zıplamak yerine sadece hafifçe kafasını çevirir
    // Böylece sunucunun AFK algılayıcısını engeller ve chat'i meşgul etmez
    setInterval(() => {
      if (bot.entity) {
        const yaw = bot.entity.yaw + 0.1;
        bot.look(yaw, bot.entity.pitch, true);
      }
    }, 60000); // 60 saniyede bir hafif hareket
  });

  bot.on('end', (reason) => {
    console.log(`Bağlantı kesildi (${reason}), 30 saniye sonra tekrar bağlanacak...`);
    setTimeout(createBot, 30000); // Sürekli gir-çık yapmaması için bekleme süresi 30sn
  });

  bot.on('error', (err) => {
    // Hata mesajlarını konsola boğmamak için basitleştirildi
  });
}

createBot();
