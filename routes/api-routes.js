var db = require("../models");

module.exports = function(app) {
    app.get("/api/items", function(req, res) {
        db.Item.findAll({}).then(function(dbItem) {
          res.json(dbItem);
        });
      });

    app.post("/api/items", function(req,res) {
        db.Item.create({
            text: req.body.text,
            complete: req.body.complete
        }).then(function(dbItem) {
            res.json(dbItem);
        });
    });

    app.delete("/api/items/:id", function(req, res) {
        db.Item.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbItem) {
            res.json(dbItem);
        });
    });

    app.put("/api/items", function(req,res) {
        db.Item.update({
            text: req.body.text,
            complete: req.body.complete
        }, {
            where: {
                id: req.body.id
            }
        }).then(function(dbItem) {
            res.json(dbItem);
        });
    });
};