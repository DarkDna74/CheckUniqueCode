import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Metodo non consentito' });

    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email richiesta' });

    const { data, error } = await supabase
        .from('"User"')
        .select('user_id')
        .eq('email', email)
        .single();

    if (error || !data) return res.status(404).json({ error: 'Utente non autorizzato' });

    res.status(200).json({ user_id: data.user_id });
}
