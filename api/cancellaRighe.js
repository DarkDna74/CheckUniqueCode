// api/cancellaRighe.js

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
      .delete()
      .eq('session', id_session);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ data });
  } catch (err) {
    console.error('Errore nella cancellazione delle righe:', err);
    res.status(500).json({ error: err.message });
  }
};
