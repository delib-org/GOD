import { MessageModel } from "../models/DiscussionModel";
import  UserModel  from "../models/UserModel";

const mongoose = require("mongoose");

export async function getDiscussion(req: any, res: any): Promise<void> {
  try {
    const result = await MessageModel.find({
      parentType: "question",
      parentId: req.body.qid,
    });

    res.send({ result, ok: true });
  } catch (error: any) {
    console.error(error);
    res.send({ error: error.message });
  }
}

export async function addMessage(
  msgObj: any
): Promise<any> {
  try {
     
      
    const user = await UserModel.findOne({ id: msgObj.creatorId });

    if (user) {
      const inMessage = {
        text: msgObj.text,
        parentId: msgObj.parentId,
        parentType: msgObj.parentType,
        date: new Date(),
        roles: {
          creator: user,
        },
      };

      const message = new MessageModel(inMessage);
      const res = await message.save();
      return res;
    }else {
        throw new Error(`No user with id ${msgObj.parentId} was found in DB`)
    }
    
  } catch (err) {
    console.error(err);
    return false;
  }
}
