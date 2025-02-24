import qrcode from 'qrcode-terminal'
import pkg from "whatsapp-web.js";
const { Client, LocalAuth } = pkg;



const clients ={};

export const startWhatsApp = (userId, callback) => {
  if (clients[userId]) {
    console.log(`🔄 Sesión ya activa para el usuario: ${userId}`);
    return clients[userId];
  }

  console.log(`⚡ Creando nuevo cliente de WhatsApp para el usuario ${userId}`);

  // ⚠️ Definir `client` dentro de la función, no fuera
  const client = new Client({
    authStrategy: new LocalAuth({ clientId: userId }), // Usa un ID único por usuario
  });

  client.on("qr", (qr) => {
    console.log(`📸 QR generado para el usuario ${userId}:`, qr);
    callback(qr);
  });

  client.on("ready", () => {
    console.log(`✅ Cliente de WhatsApp conectado para ${userId}`);
  });

  client.on("auth_failure", (msg) => {
    console.error(`❌ Error de autenticación para ${userId}:`, msg);
  });

  client.on("disconnected", (reason) => {
    console.log(`❌ Cliente de WhatsApp desconectado para ${userId}:`, reason);
    delete clients[userId]; // Eliminar la sesión de la memoria
  });

  client.initialize();
  clients[userId] = client;
};

export default clients;