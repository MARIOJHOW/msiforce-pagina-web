const fs = require('fs');
const readline = require('readline');

async function extract() {
    const fileStream = fs.createReadStream('C:\\Users\\JHOW\\.gemini\\antigravity-ide\\brain\\38dfdb88-8b10-49e5-8483-f1c265c4653e\\.system_generated\\logs\\transcript.jsonl');
    const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

    for await (const line of rl) {
        if (line.includes('"type":"USER_INPUT"') && line.includes('quero subir essa outra página que irei te passar o html')) {
            const step = JSON.parse(line);
            let text = step.content;
            
            // Extract HTML part
            const htmlStart = text.indexOf('<!DOCTYPE html>');
            if(htmlStart !== -1) {
                let html = text.substring(htmlStart);
                // Remove the </USER_REQUEST> wrapper if present
                const reqEnd = html.indexOf('</USER_REQUEST>');
                if(reqEnd !== -1) html = html.substring(0, reqEnd).trim();
                
                fs.writeFileSync('d:\\Users\\jhowu\\Documents\\doc empresa\\site-msiforce\\atendente\\extracted.html', html, 'utf8');
                console.log('HTML extracted! Length:', html.length);
                return;
            }
        }
    }
    console.log('Not found');
}
extract();
