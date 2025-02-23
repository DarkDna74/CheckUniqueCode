import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Metodo non consentito' });

    const { user_id, uniqueCode } = req.body;
    if (!user_id) return res.status(400).json({ error: 'User ID richiesto' });

    const { data, error } = await supabase
        .from('User_Trick')
        .select('unique_code')
        .eq('user_id', user_id)
        .in('unique_code', [uniqueCode, -1])
        .single();

    if (error || !data) return res.status(404).json({ error: 'Nessun codice valido trovato' });

    // Genera un nuovo unique_code se necessario
    const newUniqueCode = Math.floor(100000 + Math.random() * 900000);

    await supabase
        .from('User_Trick')
        .update({ unique_code: newUniqueCode })
        .eq('user_id', user_id);

    return res.status(200).json({ unique_code: newUniqueCode });
}
