const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const DATA_FILE = path.join(__dirname, '..', 'data', 'blogPosts.json');
const ADMIN_FILE = path.join(__dirname, '..', 'data', 'admin.json');

//hjelpefunksjon for å lese blogginnlegg fra fil
function readBlogPosts() {
    return new Promise((resolve, reject) => {
        fs.readFile(DATA_FILE, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(JSON.parse(data));
        });
    });
}

//hjelpefunksjon for å skrive blogginnlegg til fil
function writeBlogPosts(posts) {
    return new Promise((resolve, reject) => {
        fs.writeFile(DATA_FILE, JSON.stringify(posts, null, 2), (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}

// GET /api/blogginnlegg - Henter alle blogginnlegg
router.get('/blogginnlegg', async (req, res) => {
    try {
        const posts = await readBlogPosts();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: 'Kunne ikke lese blogginnlegg.' });
    }
});

// POST /api/blogginnlegg - Oppretter et nytt blogginnlegg
router.post('/blogginnlegg', async (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ message: 'Tittel og innhold er påkrevd.' });
    }

    try {
        const posts = await readBlogPosts();
        const newPost = {
            id: posts.length + 1,
            title,
            content,
            dateCreated: new Date().toISOString(),
        };
        posts.push(newPost);
        await writeBlogPosts(posts);
        res.status(201).json(newPost);
    } catch (err) {
        res.status(500).json({ message: 'Kunne ikke opprette blogginnlegg.' });
    }
});

// POST /api/login - Validerer administratorpålogging
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    fs.readFile(ADMIN_FILE, (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Kunne ikke lese admin data.' });
        }
        const admin = JSON.parse(data);
        if (username === admin.username && password === admin.password) {
            res.json({ message: 'Pålogging vellykket' });
        } else {
            res.status(401).json({ message: 'Ugyldig brukernavn eller passord' });
        }
    });
});

module.exports = router;