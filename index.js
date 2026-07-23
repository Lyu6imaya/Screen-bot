const { chromium } = require("playwright");
const axios = require("axios");
const fs = require("fs");

const URL = "https://department.diamondrp.ir/";

async function takeScreenshot() {
  const browser = await chromium.launch({
    headless: true
  });

  const page = await browser.newPage({
    viewport: { width: 1280, height: 900 }
  });

  await page.goto(URL, {
    waitUntil: "networkidle"
  });

  const now = new Date();
  const hour = now.getHours();

  let label = "گزارش عادی";
  let color = "#555";

  if (hour === 0) {
    label = "گزارش ویژه ۰۰:۰۰";
    color = "#ff0000";
  } else if (hour === 5) {
    label = "گزارش ویژه ۰۵:۰۰";
    color = "#0066ff";
  } else if (hour === 10) {
    label = "گزارش ویژه ۱۰:۰۰";
    color = "#00aa00";
  } else if (hour === 15) {
    label = "گزارش ویژه ۱۵:۰۰";
    color = "#ff9900";
  } else if (hour === 19) {
    label = "گزارش ویژه ۱۹:۰۰";
    color = "#9900ff";
  }

  await page.evaluate(({label,color}) => {
    const div = document.createElement("div");
    div.innerText = label;

    div.style.position = "fixed";
    div.style.top = "10px";
    div.style.left = "10px";
    div.style.zIndex = "999999";
    div.style.background = color;
    div.style.color = "white";
    div.style.padding = "12px 25px";
    div.style.fontSize = "24px";
    div.style.fontWeight = "bold";
    div.style.borderRadius = "10px";

    document.body.appendChild(div);
  }, {label,color});}