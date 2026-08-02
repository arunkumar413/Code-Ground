const fs = require('fs').promises;
cheerio = require('cheerio');
Post = require('../models/models');
path = require('path');
path.join(__dirname, 'template.html')
Tutorial = require('../models/tutorial_model');

var show_editor = function (req, res, next) {
    let data = { doc: '' }
    res.render('editor', { data });
}

var return_entry = async function (req, res, next) {
    var temp;
    try {
        const doc1 = await Post.findById(req.params.id);
        let data = { doc: doc1 };
        res.render('editor2', { data });

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

var display_frame = async function (req, res, next) {
    try {
        const doc = await Post.findById(req.params.id);
        if (!doc) {
            return res.status(404).send('Not Found');
        }

        const data = await fs.readFile(path.join(__dirname, 'template.html'), 'utf8');
        const $ = cheerio.load(data);

        $('style').append(doc.css);
        $('body').prepend(doc.html);
        $('body > script').append(doc.js);

        if (Array.isArray(doc.libs)) {
            doc.libs.forEach(function (x) {
                let temp = '';
                if (x.endsWith('.css')) {
                    temp = `<link rel='stylesheet' href="${x}"></link>`;
                } else if (x.endsWith('.js')) {
                    temp = `<script src="${x}"></script>`;
                }
                $('head').append(temp);
            });
        }

        res.status(200).send($.html());
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

var save_files = async function (req, res, next) {
    try {
        const h = req.body.html;
        const c = req.body.css;
        const j = req.body.js;

        const l = req.body.libs;
        const t = req.body.title;
        const d = req.body.des;
        const p = req.body.publish;

        if (!req.body.id) {
            const data = { html: h, css: c, js: j, libs: l, title: t, description: d, publish: p };
            const doc = new Post(data);
            await doc.save();
            return res.json({ redirect: doc._id });
        }

        const data = { html: h, css: c, js: j, libs: l };
        const options = { new: true, upsert: true, runValidators: true };
        await Post.findByIdAndUpdate(req.body.id, data, options);
        res.json({ redirect: req.body.id });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}


var generate_tutorial = function (req, res, next) {
    res.render('generate_tutorial');
}


var save_tutorial = function (req, res, next) {
    var data = req.body;
    doc = new Tutorial();
    doc.entry = data.entries;
    doc.tutorial_title = data.tutorial_title;
    console.log(doc);
    doc.save(function (err, p) {
        if (err) return console.error(err);
        res.json({ redirect: '/tutorial/' + p._id });
    });
}


var update_tutorial = function (req, res, next) {
}

var view_tutorial = function (req, res, next) {
    console.log('------arun--' + req.params.id);
    Tutorial.findById(req.params.id, function (err, doc1) {
        if (err) console.log(err);
        console.log(doc1.entry);
        var items = doc1.entry;
        find_snippets(items).then((snippets) => {
            // res.json(codes);
            res.render('view_tutorial', { links: items, codes: snippets, title: doc1.tutorial_title });
        });
    });
}

function find_snippets(items) {
    return Promise.all(
        items.map((item) => {
            return Post.findById(item.id);
        })
    );
}


const search_cdnjs = async function (req, res, next) {
    const searchTerm = req.query.search;
    const id = req.params.id;
    if (!searchTerm) {
        return res.status(400).send('Search term is required');
    }

    try {
        const response = await fetch(`https://api.cdnjs.com/libraries?search=${encodeURIComponent(searchTerm)}`);
        const data = await response.json();
        const json = data.results.map(lib => ({
            name: lib.name,
            version: lib.version,
            description: lib.description,
            latest: lib.latest
        }));


        const html = json.map(lib => `
      <div class="cdnjs-result" hx-post= "/add-library/${id}" hx-vals='{"library": "${lib.latest}", "name": "${lib.name}"}' hx-target="#library-container" hx-swap="innerHTML">
        <strong>${lib.name}</strong>
        <div>${lib.description || ''}</div>
        <div>${lib.latest || ''}</div>
      </div>
    `).join('');


        res.send(html);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data from cdnjs API');
    }
};


async function add_library(req, res, next) {
    const library = req.body.library;
    const name = req.body.name;
    const id = req.params.id;

    if (!library || !name) {
        return res.status(400).send('Library and name are required');
    }

    try {
        const doc = await Post.findById(id);
        if (!doc) {
            return res.status(404).send('Document not found');
        }

        if (!doc.libs) {
            doc.libs = [];
        }

        if (!doc.libs.includes(library)) {
            doc.libs.push(library);
            await doc.save();
        }

        const html = doc.libs.map(lib => `
            <div class="lib_link">
                <span>${lib}</span>
                <button class="rem" hx-delete="/remove-library/${id}" hx-vals='${JSON.stringify({ library: lib })}' hx-swap="none">Remove</button>
            </div>
        `).join('');

        res.send(html);

    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding library');
    }
}

async function remove_library(req, res, next) {
    const library = req.query.library;
    const id = req.params.id;


    console.log("###### Removing Librry ################")
    console.log(req.body);
    console.log(id);
    console.log("###### Removing Librry ################")

    if (!library) {
        return res.status(400).send('Library is required');
    }

    try {
        const doc = await Post.findById(id);
        if (!doc) {
            return res.status(404).send('Document not found');
        }

        if (doc.libs && doc.libs.includes(library)) {
            doc.libs = doc.libs.filter(lib => lib !== library);
            await doc.save();
        }

        const html = doc.libs.map(lib => `
            <div class="lib_link">
                <span>${lib}</span>
                <button class="rem" hx-delete="/remove-library/${id}" hx-vals='${JSON.stringify({ library: lib })}' hx-swap="none">Remove</button>
            </div>
        `).join('');

        res.send(html);

    } catch (error) {
        console.error(error);
        res.status(500).send('Error removing library');
    }
}

module.exports = {
    show_editor,
    save_files,
    return_entry,
    display_frame,
    generate_tutorial,
    save_tutorial,
    update_tutorial,
    view_tutorial,
    search_cdnjs,
    add_library,
    remove_library
};