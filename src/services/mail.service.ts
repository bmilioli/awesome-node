import config from '../../config/config';
import nodemailer from 'nodemailer';
import { promises as fsp } from 'fs';

const transportDataSimple =
  config.env === 'dev'
    ? config.mailerTransportData.dev
    : config.mailerTransportData.prod.simple;

const transportDataSmtp =
  config.env === 'dev'
    ? config.mailerTransportData.dev
    : config.mailerTransportData.prod.smtp;

export const sendConfirmationEmail = async (
  firstname: string,
  lastname: string,
  email: string,
  confirmCode: string,
) => {
  try {
    const transporter = nodemailer.createTransport(transportDataSimple);
    let htmlstream = await fsp.readFile(
      'src/template/confirm_account.html',
      'utf8',
    );

    htmlstream = htmlstream.replace(
      '${confirm_url}',
      config.frontUrl + `auth/active/${confirmCode}`,
    );

    htmlstream = htmlstream.replace('${name}', firstname + ' ' + lastname);
    htmlstream = htmlstream.replace('${confirmCode}', confirmCode);
    htmlstream = htmlstream.replace('${email}', email);

    await transporter.sendMail({
      from: `Filmlist.io <${transportDataSimple.auth.user}>`,
      to: email,
      subject: 'Account Confirmations',
      html: htmlstream,
    });
    return true;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const restPasswordEmail = async (email: string, code: string) => {
  try {
    const transporter = nodemailer.createTransport(transportDataSimple);
    let htmlstream = await fsp.readFile(
      'src/template/reset_password.html',
      'utf8',
    );

    htmlstream = htmlstream.replace('${code}', code);

    await transporter.sendMail({
      from: `Filmlist.io <${transportDataSimple.auth.user}>`,
      to: email,
      subject: 'Reset Password',
      html: htmlstream,
    });
    return true;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
