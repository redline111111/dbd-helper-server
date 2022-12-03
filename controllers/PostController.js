import PostModel from "../models/Post.js"

export const getOne = async (req,res) =>{
    try {
        const postId = req.params.id; 

        PostModel.findOneAndUpdate({
            _id: postId,
        },{
            $inc: {viewsCount: 1},
        },{
            returnDocument: 'after',
        },
        (err,doc) =>{
            if(err){
                return res.status(500).json({
                    message: "Не удалось вернуть статью",
                })
            }
           if(!doc){
                return res.status(404).json({
                    message: "Не удалось найти пост",
                })
           } 
           res.json(doc);
        });
    } catch (error) {
        res.status(500).json({
            message: "Не удалось найти посты",
        })
    }

}
export const getAll = async (req,res) =>{
    try {
        const posts = await PostModel.find().populate('user').exec();
        
        res.json(posts);
    } catch (error) {
        res.status(500).json({
            message: "Не удалось найти посты",
        })
    }

}
export const remove = async (req,res) => {
    try {
        const postId = req.params.id; 

        PostModel.findOneAndDelete({
           _id: postId, 
        }, (err,doc) =>{
            if(err){
                return res.status(500).json({
                    message: "Не удалось удалить статью",
                })
            }
           if(!doc){
                return res.status(404).json({
                    message: "Не удалось найти пост",
                })
           } 
           res.json({
            success:true,
           });
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Нет доступа',
        })
    }
}
export const update = async (req,res) =>{
    try {
        const postId = req.params.id; 

        await PostModel.updateOne({
            _id: postId,
        }, {
            title: req.body.title,
            character: req.body.character,
            perks: req.body.perks,
            description: req.body.description,
            user: req.userId,
        })
        res.json({
            success:true,
        });
    } catch (error) {
        res.status(500).json({
            message: "Не удалось обновить пост",
        })
    }
}
export const create = async (req,res) =>{
    try {
        const doc = new PostModel({
            title: req.body.title,
            character: req.body.character,
            perks: req.body.perks,
            description: req.body.description,
            user: req.userId,
        });
        const post = await doc.save();

        res.json(post);
    } catch (error) {
        res.status(500).json({
            message: "Не удалось создать статью",
        })
    }
}