fs = require('fs');
cheerio = require('cheerio');
Post = require('../models/models');
path = require('path');
path.join(__dirname, 'template.html')
Tutorial = require('../models/tutorial_model');

var show_editor = function(req, res, next) {
    let data = { doc: '' }
    res.render('editor', { data });
}

var return_entry = function(req, res, next) {
    var temp;
    Post.findById(req.params.id, function(err, doc1) {
        if (err) console.log(err);
        let data = { doc: doc1 };
        res.render('editor2', { data });
    });

}

var display_frame = function(req, res, next) {
    var temp='';
    Post.findById(req.params.id, function(err, doc) {
        if (err) return handleError(err);
        fs.readFile(path.join(__dirname, 'template.html'), 'utf8', function read(err, data) {
            if (err) {
                throw err;
            }

            const $ = cheerio.load(data);
            $('style').append(doc.css);
            $('body').prepend(doc.html);
            $('body > script').append(doc.js);
            doc.libs.forEach(function(x) {
                if(x.endsWith('.css')){
                temp= (`<link rel='stylesheet' href="${x}"></link>`);
                }
                else if (x.endsWith('.js')){
                 temp = (`<script src="${x}"><\/script>`);
                }
                $('head').append(temp);
            })


            res.status(200).send($.html());
        });
    });

}

var save_files = function(req, res, next) {
    var h = req.body.html;
    var c = req.body.css;
    var j = req.body.js;

    var l = req.body.libs;
    var t = req.body.title;
    var d = req.body.des;
    var p = req.body.publish;
    if (req.body.id === "") {
        let data = { html: h, css: c, js: j, libs: l, title: t, description: d, publish: p};
        doc = new Post(data);
        doc.save(function(err, p) {
            if (err) return console.error(err);
            res.json({ redirect: doc._id });
        });
    } else {
        let data = { html: h, css: c, js: j, libs: l};
        let options = { new: true, upsert: true };
        Post.findByIdAndUpdate(req.body.id, data, options, function(err, p) {
            if (err) return handleError(err);
            res.json({ redirect: req.body.id });
        });
    }
}


var generate_tutorial= function (req, res, next){
    res.render('generate_tutorial');
}


var save_tutorial = function (req,res,next){
        var data = req.body;
        doc = new Tutorial();
        doc.entry = data.entries;
        doc.tutorial_title= data.tutorial_title;
        console.log(doc);
        doc.save(function(err, p) {
            if (err) return console.error(err);
            res.json({ redirect: '/tutorial/' + p._id });
     });
    }

    
var update_tutorial = function(req,res,next){
}

var view_tutorial = function(req,res,next){
    console.log('------arun--' + req.params.id);
    Tutorial.findById(req.params.id, function(err, doc1) {
        if (err) console.log(err);
        console.log(doc1.entry);
        var items = doc1.entry;
        find_snippets(items).then((snippets) => {
        // res.json(codes);
     res.render('view_tutorial', {links:items,codes:snippets,title:doc1.tutorial_title});
        });
    });
}

function find_snippets(items){
    return Promise.all(
        items.map((item) => {
            return Post.findById(item.id);
        })
    );
}

module.exports = { show_editor,
    save_files,
    return_entry,
    display_frame,
    generate_tutorial,
    save_tutorial,
    update_tutorial,
    view_tutorial 
};