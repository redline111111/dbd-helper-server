import userModel from "../models/User.js";
import postModel from "../models/Post.js"

export const data = async (req,res) => {
    try {
        
        const login = req.params.id; 
        const user = await userModel.findOne({login});
        let posts = await postModel.find().populate('user').exec();
        
        posts = posts.filter(post => post.user.login.toString() === login);
        posts = posts.map(post => {
            const {user, __v, updatedAt, ...postData} = post.toJSON();
            return postData;
        })

        if(!user){
            return res.status(404).json({
                message: 'Пользователь не найден',
            })
        }

        const {passwordHash,__v,updatedAt,_id, ...userData} = user.toJSON();
        const data = Object.assign({posts, userData});
        res.json(data);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Нет доступа 3',
        })
    }
}