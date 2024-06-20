#!/usr/bin/env node

const { parse } = require('markdown-wasm');
const { program } = require('commander');
const fs = require('fs');
const path = require('path');

program
  .version('1.0.0')
  .description('wmdc - wasm based markdown compiler')
  .usage('[options] <input>')

program
  .option('-f, --format <format>', 'Select output format (html|xhtml)', 'html')
  .option('-b, --bytes', 'Return result as a Uint8Array instead of a string')
  .option('--allow-js-links', 'Allow "javascript" in links')
  .option('--on-code-block <callback>', 'Callback for each code block')
  .option('--parse-flags <flags>', 'Customize parsing flags (comma-separated)')
  .option('-o, --output <output>', 'Set output file path');

program
  .arguments('<input>')
  .action((input) => {
    try {
      const options = program.opts();
      let parseOptions = {};

      if (options.format) {
        parseOptions.format = options.format;
      }
      if (options.bytes) {
        parseOptions.bytes = true;
      }
      if (options.allowJsLinks) {
        parseOptions.allowJSURIs = true;
      }
      if (options.onCodeBlock) {
        parseOptions.onCodeBlock = eval(options.onCodeBlock);
      }
      if (options.parseFlags) {
        const flags = options.parseFlags.split(',');
        parseOptions.parseFlags = flags.reduce((acc, flag) => {
          acc[flag] = true;
          return acc;
        }, {});
      }

      const filePath = input;
      let fileContent;

      try {
        fileContent = fs.readFileSync(filePath, 'utf8');
      } catch (error) {
        if (error.code === 'ENOENT') {
          console.error(`Error: File not found - ${input}`);
        } else if (error.code === 'EISDIR') {
          console.error(`Error: Input is a directory - ${input}`);
        } else if (error.code === 'EACCES') {
          console.error(`Error: Permission denied - ${input}`);
        } else {
          console.error(`Error: Unable to read file - ${input}`);
        }
        process.exit(1);
      }

      if (!fileContent.trim()) {
        console.error(`Error: File is empty - ${input}`);
        process.exit(1);
      }

      const result = parse(fileContent, parseOptions);

      let outputFilePath;
      if (options.output) {
        outputFilePath = options.output;
      } else {
        outputFilePath = path.join(path.dirname(filePath), path.parse(filePath).name + '.html');
      }

      try {
        fs.writeFileSync(outputFilePath, result);
      } catch (error) {
        console.error(`Error: Unable to write to output file - ${outputFilePath}`);
        process.exit(1);
      }

      console.log(`Markdown file '${filePath}' has been successfully converted to HTML and saved as '${outputFilePath}'`);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  });

program.parse(process.argv);