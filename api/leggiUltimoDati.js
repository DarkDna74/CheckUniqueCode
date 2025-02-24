// api/leggiUltimoDati.js

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id_session } = req.body;

    const { data, error } = await supabase
      .from('sessione')
      .select('card, number')
      .eq('session', id_session)
      .order('id', { ascending: false })
      .limit(1);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (data.length === 0) {
      return res.status(404).json({ error: 'Nessun dato trovato per la sessione ' + id_session });
    }

    res.status(200).json({ data: data[0] });
  } catch (err) {
    console.error('Errore durante la lettura:', err);
    res.status(500).json({ error: err.message });
  }
};
