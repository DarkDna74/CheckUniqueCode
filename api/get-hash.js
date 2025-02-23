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
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Metodo non consentito" });
    }

    const { method, param } = req.body;

    if (!method) {
        return res.status(400).json({ error: "Metodo mancante" });
    }

    if (method === 'get_hash') {
        const now = new Date();
        const dataIncrementata = new Date(now.getTime() + 29 * 60000);
        const hash_val = calcolaHashData(dataIncrementata);
        return res.status(200).json({ hash: hash_val });
    }

    if (method === 'validate_hash') {
        if (!param) {
            return res.status(400).json({ error: "Param mancante" });
        }
        let ret_val = validaData(param);
        return res.status(200).json({ valid: ret_val });
    }

    return res.status(400).json({ error: "Metodo non valido" });
}
