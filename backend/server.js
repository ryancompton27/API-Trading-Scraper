const express = require('express')
const cors = require('cors') 
const db = require('better-sqlite3')('../backend/scraper.db')

const app = express()

db.prepare(`
CREATE TABLE IF NOT EXISTS analysis (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    summary TEXT,
    recommendation TEXT
)
`).run()

// db.prepare(`
// INSERT INTO analysis (summary, recommendation)
// VALUES ('This is a test summary', 'This is a test recommendation')
// `).run()

app.use(cors()) 

app.get('/analysis', (req, res) => {
    const rows = db.prepare(`SELECT * FROM analysis`).all()
    console.log("DATA:", rows) 
    res.json(rows)
})

app.listen(3001, () => console.log('Server running on port 3001'))