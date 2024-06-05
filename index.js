import { execSync } from 'child_process';
import fs from 'fs';

export function setupTailwind() {
    console.log("Setting up Tailwind CSS...");

    try {
        // Install Tailwind CSS, PostCSS, and Autoprefixer
        execSync('npm install -D tailwindcss postcss autoprefixer', { stdio: 'inherit' });

        // Generate configuration files
        execSync('npx tailwindcss init -p', { stdio: 'inherit' });

        // Check if tailwind.config.js exists before reading
        if (!fs.existsSync('./tailwind.config.js')) {
            throw new Error('tailwind.config.js does not exist.');
        }

        // Configure tailwind.config.js
        let configFileContent = fs.readFileSync('./tailwind.config.js', 'utf8');
        configFileContent = `
        /** @type {import('tailwindcss').Config} */
        export default {
            content: [
            "./index.html",
            "./src/**/*.{js,ts,jsx,tsx}",
            ],
            theme: {
            extend: {},
            },
            plugins: [],
            }`;

        fs.writeFileSync('./tailwind.config.js', configFileContent);

        // Check if src/index.css exists before appending
        if (!fs.existsSync('./src/index.css')) {
            throw new Error('src/index.css does not exist.');
        }

        // Add Tailwind directives to CSS file
        fs.appendFileSync('./src/index.css', `
      @tailwind base;
      @tailwind components;
      @tailwind utilities;
    `, 'utf8');

        console.log("Setup completed!");
    } catch (error) {
        console.error(`An error occurred during setup: ${error.message}`);
    }
}

setupTailwind();
