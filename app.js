#!/usr/bin/env node

// 1. დავწეროთ cli პროგრამა, რომელიც მიიღებს არგუმენტად ქალაქს,
// დაუძახებს weather api-ს და ტერმინალში გამოიტანს
// ამინდის პროგნოზს node-fetch ის დახმარებით.
// გამოვიყენოთ
// https://api.weatherapi.com/v1/current.json?key=6d210d800ff040bc960184527242301&q={city}
// api რომელსაც გადავცემთ ქალაქს და გვიბრუნებს მიმდინარე ამინდის პროგნოზს.

import fetch from "node-fetch";
import { Command } from "commander";
const program = new Command();

program
  .command("fetch")
  .description("Fetch data and display city weather temperature")
  .argument("<city>", "search city temperature")
  .option("--temperature", "display temperature")
  .action((city, options) => {
    fetch(
      `https://api.weatherapi.com/v1/current.json?key=6d210d800ff040bc960184527242301&q=${city}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Tbilisi temperature:", data.current.temp_c, "°C");
      });
  });

program.parse();

// 2. დავწეროთ budget app cli პროგრამა,
//  რომელიც დაამატებს, წაშლის ხარჯებს;
//  მონაცემების შენახვა უნდა მოხდეს ფაილურ
//  სისტემაში json ის დახმარებით.

import { Command } from "commander";
import fs from "fs/promises";

const weatherProgram = new Command();

weatherProgram
  .command("add <cost>")
  .description("Add expenses")
  .option("--temperature", "display temperature")
  .action((cost, options) => {
    const expense = {
      cost: cost,
    };

    fs.readFile("./cost.json", "utf-8")
      .then((data) => {
        let expenses = [];
        if (data) {
          expenses = JSON.parse(data);
        }
        expenses.push(expense);

        const jsonString = JSON.stringify(expenses, null, 2);
        fs.writeFile("./cost.json", jsonString);
      })
      .then(() => {
        console.log("Expense added:", expense);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

weatherProgram
  .command("remove")
  .description("Add expenses")
  .argument("<cost>", "cost")
  .option("--temperature", "display temperature")
  .action((cost, options) => {
    console.log("remove cost:", cost);
  });

weatherProgram.parse();
