import db from "../models/index.js";

//import bcrypt from 'bcryptjs';
import client from "./whatsap.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { startWhatsApp } from "./whatsap.js";


const generateToken = (id) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
  return jwt.sign({ id }, token, {
    expiresIn: "2h",
  });
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await db.user.findAll();
    console.log(users);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { Name, whattsap, email, password } = req.body;
    const existingUser = await db.user.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "el email ya esta registrado" });
    }
    const hashedPassword = await bcrypt.hash(password, 10); //hasheamos la contrasenha
    const newUser = await db.user.create({
      Name,
      password: hashedPassword,
      whattsap,
      email,
    });
    // Genero token
    const token = generateToken(newUser.id);
    //Establezco el token como cookie
    res.cookie("cookieToken", token, {
      maxAge: 3600000,
      httpOnly: true,
      sameSite: "strict",
    });

    // Excluir la contraseña de la respuesta
    const { password: _, ...userWithoutPassword } = newUser.dataValues;

    res.status(201).json({
      message: "Usuario creado exitosamente",
      user: userWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const startSession = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "Se necesita un usuario" });
  }

  try {
    console.log(`🚀 Iniciando sesión de WhatsApp para el usuario: ${userId}`);

    startWhatsApp(userId, async (qr) => {
      console.log(`📸 QR generado correctamente para el usuario ${userId}`);

      const [updatedRows] = await db.user.update(
        { qrCode: qr, status: "PENDING" },
        { where: { userId: userId } }
      );

      console.log("💾 Filas actualizadas en la base de datos:", updatedRows);
    });

    res.json({ success: true, message: "Sesión iniciada. Escanea el QR." });
  } catch (error) {
    console.error("❌ Error en startSession:", error);
    res.status(500).json({ error: "Error al iniciar sesión de WhatsApp." });
  }
}





export const getQr = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await db.user.findOne({ where: { id: userId } });

    if (!user || !user.qrCode) {
      return res.json({
        success: false,
        message: "QR no disponible o sesión ya conectada.",
      });
    }

    res.json({ success: true, qr: session.qrCode });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el QR." });
  }
};

export const sendWhatsap = async (req, res) => {
  try {
    const { mensaje, telefono } = req.body; // Extrae datos del request

    const response = await client.sendMessage(`57${telefono}@c.us`, mensaje); // Usa otro nombre para evitar conflicto

    console.log("Mensaje enviado:", response);

    res.json({ success: true, message: `Mensaje enviado a ${telefono}` }); // Respuesta correcta a Express
  } catch (error) {
    console.error("Error al enviar mensaje:", error);
    res.status(500).json({ error: "Error al enviar el mensaje" });
  }
};
