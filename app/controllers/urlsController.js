const Url = require('../models/url')

// get urls
module.exports.list = (req, res) => {
    Url.find()
        .then((urls) => {
            console.log(req.useragent)
            res.json(urls)
        })
        .catch((err) => {
            res.json(err)
        })
}

// post
module.exports.create = (req, res) => {
    const body = req.body
    const url = new Url(body)
    url.save()
        .then((url) => {
            res.json(url)
        })
        .catch((err) => {
            res.json(err)
        })
}

// show by Id
module.exports.show = (req, res) => {
    const id = req.params.id
    Url.findById(id)
        .then((Url) => {
            if(Url) {
                res.json(Url)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

// update by id
module.exports.update = (req, res) => {
    const id = req.params.id
    const body = req.body
    Url.findByIdAndUpdate(id, body, {new: true, runValidators: true})
        .then((Url) => {
            res.json(Url)
        })
        .catch((err) => {
            res.json(err)
        })
}

// delete by id
module.exports.destroy = (req, res) => {
    const id = req.params.id
    Url.findByIdAndDelete(id)
        .then((Url) => {
            res.json(Url)
        })
        .catch((err) => {
            res.json(err)
        })
}

// redirect shortUrl to originalUrl
module.exports.redirect = (req, res) => {
    const hash = req.params.hash
    const clientData = req.useragent
    const ip = req.clientIp
    const click = {
        ipAddress : ip,
        browser : clientData.browser,
        platform : clientData.platform,
        device : clientData.Mobile ? 'Mobile' : 'Desktop'
    }
    // push() method
    Url.findOneAndUpdate({hashedUrl: hash},
        {$push: {clicks : click}},
        {new: true, runValidators: true})
        .then((url) => {
            console.log(url)
        })
        .catch((err) => {
            res.json(err)
        })
        
        console.log(ip)

    Url.findOne({hashedUrl: hash})
        .then((Url) => {
            res.redirect(url.originalUrl)
        })
        .catch((err) => {
            res.json(err)
        })
}