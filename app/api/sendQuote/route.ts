
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, phone, company, message, product, material, budget } = body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Cotizaciones Web" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: "Nueva solicitud de cotización",
      html: `
        <h2>Solicitud de Cotización</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
        <p><strong>Empresa:</strong> ${company || "No especificada"}</p>
        <p><strong>Producto:</strong> ${product || "No especificado"}</p>
        <p><strong>Material:</strong> ${material || "No especificado"}</p>
        <p><strong>Presupuesto:</strong> ${budget || "No especificado"}</p>
        <p><strong>Mensaje:</strong> ${message}</p>
      `,
    });

    return NextResponse.json({ message: "Correo enviado correctamente" });
  } catch (error) {
    console.error("Error enviando correo:", error);
    return NextResponse.json({ message: "Error al enviar el correo" }, { status: 500 });
  }
}