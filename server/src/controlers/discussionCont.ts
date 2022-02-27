import {MessageSchema} from "../models/db/DiscussionModel";
const mongoose = require('mongoose');

const Message = mongoose.model('message', MessageSchema);

export async function getDiscussion(req: any, res: any): Promise<void> {
    try {
        const result = await Message.find({
            parentType: 'question',
            parentId: req.body.qid,
        });

        res.send({ result, ok: true });
    } catch (error: any) {
        res.send({ error: error.message });
    }
}

