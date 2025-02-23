import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Metodo non consentito' });

    const { idUser, unique_code } = req.body;
    if (!idUser) return res.status(400).json({ error: 'User ID richiesto' });

    const { data, error } = await supabase
        .from('User_Trick')
        .select('unique_code')
        .eq('user_id', idUser)
        .eq('trick_id', 1)
        .single();

    if (error || !data) return res.status(404).json({ error: 'Codice non trovato' });

    if (String(data.unique_code) === String(unique_code))
    {
        return res.status(200).json({ valid: true });
    }

    return res.status(200).json({ valid:false });
}
