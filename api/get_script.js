import path from 'path';

import crypto from "crypto";

function calcolaHashData(data) {
    const dataStr = data.getFullYear() + '-' +
        ('0' + (data.getMonth() + 1)).slice(-2) + '-' +
        ('0' + data.getDate()).slice(-2) + ' ' +
        ('0' + data.getHours()).slice(-2) + ':' +
        ('0' + data.getMinutes()).slice(-2);

    let hash = crypto.createHash("sha256").update(dataStr).digest("hex");
    return hash.slice(0, 6);
}

function validaData(hashInput) {
    const now = new Date();

    for (let i = 1; i <= 30; i++) {
        const dataIncrementata = new Date(now.getTime() + i * 60000);
        const hashCalcolato = calcolaHashData(dataIncrementata);
        if (hashCalcolato === hashInput) {
            return true;
        }
    }

    return false;
}


export default function handler(req, res) {
    const { param } = req.query;
    let scriptPath;

    if (validaData(param)) {
        scriptPath = path.join(process.cwd(), 'scripts/good.js');
    } else {
        scriptPath = path.join(process.cwd(), 'scripts/bad.js');
    }

    res.sendFile(scriptPath);
}// JavaScript source code
