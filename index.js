index_js_code = """
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/download', async (req, res) => {
  const { url, platform } = req.query;

  if (!url || !platform) {
    return res.status(400).json({ error: 'URL dan platform wajib diisi.' });
  }

  try {
    let apiUrl;

    switch (platform) {
      case 'tiktok':
        apiUrl = `https://api.tikmate.app/api/lookup?url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        apiUrl = `https://api.fbvideodownload.com/parse?url=${encodeURIComponent(url)}`;
        break;
      case 'instagram':
        apiUrl = `https://saveig.app/api/ajaxSearch?url=${encodeURIComponent(url)}`;
        break;
      case 'youtube':
        apiUrl = `https://youtube-video-download-api.example.com/api?url=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        apiUrl = `https://twdown.net/download.php?url=${encodeURIComponent(url)}`;
        break;
      default:
        return res.status(400).json({ error: 'Platform tidak dikenali.' });
    }

    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error('Gagal mengambil data:', error.message);
    res.status(500).json({ error: 'Gagal mengunduh video. Periksa kembali URL.' });
  }
});

app.listen(PORT, () => {
  console.log(`API SosioGrab aktif di port ${PORT}`);
});
"""

with open(os.path.join(base_dir, "index.js"), "w") as f:
    f.write(index_js_code)
