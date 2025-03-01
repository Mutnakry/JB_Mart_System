require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const db = require("./db.js");
const { ChartJSNodeCanvas } = require("chartjs-node-canvas");
const fs = require("fs");

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });