const newsModel = require('../model/News');

const getAllNews = async (req, res) => {
    try {
        let data = await newsModel.getByPubDate({})
        if(!data) {
            return res.status(200).send("Нема вести")
        }
        return res.status(200).send( data )
    } catch (error) {
        console.log(error)
        return res.status(500).send('Internal Server Error');
    }
};

const save = async (req, res) => {
    const { title, category, tags, content, image } = req.body

    let news = {
                title,
                category,
                tags,
                content,
                image,
                created: new Date,
                _deleted: false 
            }

            try {
                await newsModel.save(news)
            } catch (error) {
                console.log(error)
                return res.status(400).send("Neuspesno dodavanje na vest")
            }
        
            return res.status(200).json({ news })
};

const getByCategory = async (req, res) => {
    try {
        let data = await newsModel.getByCategory(req.params.cat)
        return res.status(200).send(data);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

const getOne = async (req, res) => {
    try {
        let data = await newsModel.getOne( req.params.nid );
        return res.status(200).send(data);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};  

const getByTag = async (req, res) => {
    try {
        let data = await newsModel.getByTags(req.body.tag)
        return res.status(200).send(data);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    getAllNews,
    save,
    getByCategory,
    getOne,
    getByTag
}
