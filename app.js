#!/usr/bin/env node

// 1. დავწეროთ cli პროგრამა, რომელიც მიიღებს არგუმენტად ქალაქს,
// დაუძახებს weather api-ს და ტერმინალში გამოიტანს
// ამინდის პროგნოზს node-fetch ის დახმარებით.
// გამოვიყენოთ
// https://api.weatherapi.com/v1/current.json?key=6d210d800ff040bc960184527242301&q={city}
// api რომელსაც გადავცემთ ქალაქს და გვიბრუნებს მიმდინარე ამინდის პროგნოზს.

// import fetch from "node-fetch";
// import { Command } from "commander";
// const weatherProgram = new Command();

// weatherProgram
//   .command("fetch")
//   .description("Fetch data and display city weather temperature")
//   .argument("<city>", "search city temperature")
//   .option("--temperature", "display temperature")
//   .action((city, options) => {
//     fetch(
//       `https://api.weatherapi.com/v1/current.json?key=6d210d800ff040bc960184527242301&q=${city}`
//     )
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(
//           `${data.location.name} temperature:`,
//           data.current.temp_c,
//           "°C"
//         );
//       });
//   });

// weatherProgram.parse();

// 2. დავწეროთ budget app cli პროგრამა,
//  რომელიც დაამატებს, წაშლის ხარჯებს;
//  მონაცემების შენახვა უნდა მოხდეს ფაილურ
//  სისტემაში json ის დახმარებით.

import { Command } from "commander";
import fs from "fs/promises";

const program = new Command();

program
  .command("add <cost>")
  .description("Add expenses")
  .action((cost, options) => {
    fs.readFile("./cost.json", "utf-8")
      .then((data) => {
        let expenses = [];
        if (data) {
          expenses = JSON.parse(data);
        }
        const expense = {
          cost: cost,
          id: expenses.length + 1,
        };
        expenses.push(expense);

        const jsonString = JSON.stringify(expenses, null, 2);
        fs.writeFile("./cost.json", jsonString);
        console.log("Expense added:", expense);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

program
  .command("delete")
  .description("Add expenses")
  .argument("<id>", "delete cost")
  .action((id, options) => {
    fs.readFile("./cost.json", "utf-8")
      .then((data) => {
        let expenses = [];
        if (data) {
          expenses = JSON.parse(data);
        }
        const expense = expenses.find((expense) => expense.id === parseInt(id));
        if (expense) {
          expenses = expenses.filter((expense) => expense.id !== parseInt(id));
          const jsonString = JSON.stringify(expenses, null, 2);
          fs.writeFile("./cost.json", jsonString);
          console.log("Expense deleted:", expense);
        } else {
          console.log("Expense not found:", id);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

program.parse();
