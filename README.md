# wmdc

> A wasm based markdown compiler to convert markdown text into html

![Based on](https://img.shields.io/badge/based-wasm-blue) 
![Benchmark speed](https://img.shields.io/badge/speed-3x_faster-brightgreen) 
![Build passing](https://img.shields.io/badge/build-passing-green)
![License MIT](https://img.shields.io/badge/license-MIT-blue) 

It is a command-line interface for parsing Markdown files to HTML using wasm based markdown compiler. The benchmark shows that it is at least three times faster than its nearest competitor.

## Installation

This application requires Node.js to be installed on your system. You can install it using npm by running the following command:

	npm install -g wmdc

## Usage

Options:

* `-f, --format <format>`: Select output format (html|xhtml) (default: html)
* `-b, --bytes`: Return result as a Uint8Array instead of a string
* `--allow-jsuris`: Allow "javascript:" in links
* `--on-code-block <callback>`: Callback for each code block
* `--parse-flags <flags>`: Customize parsing flags (comma-separated)
* `-o, --output <output>`: Set output file path

Example:

	wmdc -f html -o output.html input.md

This will parse the `input.md` file and save the output to `output.html` in HTML format.

## Description

This application uses the `markdown-wasm` library to parse Markdown files to HTML. It provides a simple command-line interface for converting Markdown files to HTML.

## Error Handling

The application handles the following errors:

* File not found
* Input is a directory
* Permission denied
* File is empty
* Unable to read file
* Unable to write to output file

If an error occurs, the application will exit with a non-zero exit code and display an error message.

## License

This application is licensed under the MIT License.

## Author

Abhishek Kumar