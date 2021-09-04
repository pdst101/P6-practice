const Thing = require('../models/thing');
const fs = require('fs'); //file system

exports.createThing = (req, res, next) => {  //POST route
    req.body.thing = JSON.parse(req.body.thing);
    const url = req.protocol + '://' + req.get('host');  // host = localhost:3000
    const thing = new Thing({   //Creating new instance of thing
        title: req.body.thing.title,
        description: req.body.thing.description,
        imageUrl: url + '/images/' + req.file.filename,
        price: req.body.thing.price,
        userId: req.body.thing.userId,
    });
    thing.save().then(() => {  //Save Thing to the database and return promise / Then send back a response
        res.status(201).json({
            message: 'Post saved successfully!'
        });
    }).catch((error) => {  //Send back error response by Mongoose
        res.status(400).json({
            error: error
        });
    });
};

exports.getOneThing = (req, res, next) => {
    Thing.findOne({
        _id: req.params.id  //Search for 1 specific Thing
    }).then((thing) => {
        res.status(200).json(thing);
    }).catch((error) => {
        res.status(404).json({
            error: error
        });
    });
};

exports.modifyThing = (req, res, next) => {  //Enable editing Thing with PUT route
    let thing = new Thing({ _id: req.params._id });
    if (req.file) {
        req.body.thing = JSON.parse(req.body.thing);
        const url = req.protocol + '://' + req.get('host');  // host = localhost:3000
        thing = {   //Creating new instance of thing
            _id: req.params.id,
            title: req.body.thing.title,
            description: req.body.thing.description,
            imageUrl: url + '/images/' + req.file.filename,
            price: req.body.thing.price,
            userId: req.body.thing.userId,
        };
    } else {
        thing = {
                _id: req.params.id,   //To create the same ID for new Thing and enable multiple edits
                title: req.body.title,
                description: req.body.description,
                imageUrl: req.body.imageUrl,
                price: req.body.price,
                userId: req.body.userId
            };
    }
    Thing.updateOne({ _id: req.params.id }, thing)  //Update 1 specific Thing
        .then(() => {
            res.status(201).json({
                message: 'Thing updated successfully!'
            });
        }).catch((error) => {
            res.status(400).json({
                error: error
            });
        });
};

exports.deleteThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id }).then(
        (thing) => {
            const filename = thing.imageUrl.split('/images/')[1];
            fs.unlink('images/' + filename, () => {
                Thing.deleteOne({ _id: req.params.id }).then(() => {   //Delete 1 specific Thing /Once file is deleted
                    res.status(200).json({
                        message: 'Deleted!'
                    });
                }).catch((error) => {
                    res.status(400).json({
                        error: error
                    });
                });
            });  //First argument Path, second is callback once deletion completed
        });
};

exports.deleteThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id }).then(
        (thing) => {
            const filename = thing.imageUrl.split('/images/')[1];
            fs.unlink('images/' + filename, () => {
                Thing.deleteOne({ _id: req.params.id }).then(
                    () => {
                        res.status(200).json({
                            message: 'Deleted!'
                        });
                    }
                ).catch(
                    (error) => {
                        res.status(400).json({
                            error: error
                        });
                    }
                );
            });
        }
    );
};

exports.getAllStuff = (req, res, next) => {  //GET route get() only reacts to GET requests
    Thing.find().then((things) => {  //Find search for Thing nad returns promise with array
        res.status(200).json(things);  //Successful find cull send back things to frontend
    }).catch((error) => {
        res.status(400).json({
            error: error
        });
    });
};