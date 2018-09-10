fs = require('fs');
cheerio = require('cheerio');
Post = require('../models/models');
path = require('path');
path.join(__dirname, 'template.html')

var show_editor = function(req, res, next) {
    doc = { _id: '' };
    res.render('editor', { doc });
}

var return_entry = function(req, res, next) {
    console.log('-----entry------');
    console.log(req.params.id);
    Post.findById(req.params.id, function(err, doc) {
        if (err) console.log(err);
        console.log(doc);
        res.render('editor2', { doc });
    });

}

var display_frame = function(req, res, next) {
    Post.findById(req.params.id, function(err, doc) {
        if (err) return handleError(err);
        console.log(doc.libs);
        fs.readFile(path.join(__dirname, 'template.html'), 'utf8', function read(err, data) {
            if (err) {
                throw err;
            }

            const $ = cheerio.load(data);
            $('style').append(doc.css);
            $('body').prepend(doc.html);
            $('body > script').append(doc.js);
            doc.libs.forEach(function(x){
              var temp = (`<script src="${x}"><\/script>`);
            $('head').append(temp);
            })


            res.status(200).send($.html());
        });
    });

}

var save_files = function(req, res, next) {
    console.log('----body-----');
    console.log(req.body)
    var h = req.body.html;
    var c = req.body.css;
    var j = req.body.js;

    var l = req.body.libs;
    var t = req.body.title;
    var d = req.body.des;
    var p = req.body.publish

    if (req.body.id === "") {
        doc = new Post({ html: h, css: c, js: j, libs: l, title: t, description: d, publish: p });
        doc.save(function(err, p) {
            if (err) return console.error(err);
            res.send(doc._id);
        });
    } else {
        Post.findByIdAndUpdate(req.body.id, { html: h, css: c, js: j, libs: l }, { new: true, upsert: true }, function(err, p) {
            if (err) return handleError(err);
            res.end();
        });
    }
}


module.exports = { show_editor, save_files, return_entry, display_frame };