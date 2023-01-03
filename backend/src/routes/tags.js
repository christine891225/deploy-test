import Tag from '../models/tags'


// returns all tags
exports.GetTags = async (req, res) => {
    try {
        const info = await Tag.find();
        res.status(200).send({ message: 'success', contents: info });
    } catch (error) {
        res.status(403).send({ message: 'error', contents: [] });
    }
}

exports.CreateTag = async (req, res) => {
    const body = req.body;

    const tag = new Tag({
        name: body.name
    });

    try {
        const resp = await tag.save();
        res.status(200).send({ message: 'success', contents: resp });
    } catch (error) {
        res.status(403).send({ message: 'error', contents: [] });
    }
}

exports.UpdateTag = async (req, res) => {
    const body = req.body;

    try {
        const resp = await Tag.findOneAndUpdate(
            { tag_id: body.tag_id },  // filter
            { tag_name: body.tag_name }, // update
            { new: true } // return updated doc
        );
        res.status(200).send({ message: 'success', contents: resp });
    } catch (error) {
        res.status(403).send({ message: 'error', contents: [] });
    }
}

exports.DeleteTag = async (req, res) => {
    const id = req.query.tag_id;

    try {
        const resp = await Tag.findOneAndDelete( { tag_id: id } );
        res.status(200).send({ message: 'success', contents: resp });
    } catch (error) {
        res.status(403).send({ message: 'error', contents: [] });
    }
}