import Users from '../models/users';
import bcrypt from 'bcrypt';

exports.GetUsers = async (req, res) => {
    try {
        const info = await Users.find({});
        res.status(200).send({ message: 'success', contents: info });
    } catch (error) {
        res.status(403).send({ message: 'error', contents: [] });
    }
}

exports.GetUserById = async (req, res) => {
    const id = req.query.user_id;
    try {
        const info = await Users.findOne({ user_id: id });
        res.status(200).send({ message: 'success', contents: info });
    } catch (error) {
        res.status(403).send({ message: 'error', contents: [] });
    }
}

exports.CreateUser = async (req, res) => {
    const body = req.body;
    console.log(body)
    const user = new Users({
        // user_id: body.user_id,
        user_name: body.user_name,
        user_email: body.user_email,
        user_password: body.user_password,
        is_ntuim: body.is_ntuim
    });
    
    try {
        const exist = await Users.findOne
            ( { user_email: body.user_email } );
        if (exist !== null) {
            res.status(200).send({ message: '信箱已註冊', contents: [] });
        }else{
            const resp = await user.save();
            res.status(200).send({ message: '註冊成功', contents: resp });
        }
    }
    catch (error) {
        res.status(403).send({ message: 'error', contents: [] });
    }
}


// what can be updated? only name?
exports.UpdateUser = async (req, res) => {
    const body = req.body;
    try {
        const resp = await Users.findOneAndUpdate(
            { user_id: body.user_id },  // filter
            { user_name: body.user_name }, // update
            { new: true } // return updated doc
        );
        res.status(200).send({ message: 'success', contents: resp });
    } catch (error) {
        res.status(403).send({ message: 'error', contents: [] });
    }
}

exports.DeleteUser = async (req, res) => {
    const id = req.query.user_id;
    try {
        const resp = await Users.findOneAndDelete( {
            user_id: id
        } );
        res.status(200).send({ message: 'success', contents: resp });
    } catch (error) {
        res.status(403).send({ message: 'error', contents: [] });
    }
}

exports.Login = async (req, res) => {
    const body = req.body;
    try {
        const hashedPassword = await bcrypt.hash(body.user_password, 10);
        console.log(hashedPassword);
        const info = await Users.findOne
            ( { user_email: body.user_email } ).then (async function (user) {
                if (user === null) {
                    res.status(200).send({ message: '尚未註冊', contents: [] });
                }else {
                    bcrypt.compare(body.user_password, user.user_password, function (err, result) {
                        if (result === true) {
                            res.status(200).send({ message: 'success', contents: user });
                        }else {
                            res.status(200).send({ message: '密碼錯誤', contents: [] });
                        }
                    });
                }
            });
        } catch (error) {
            res.status(403).send({ message: 'error', contents: [] });
        }

    //     console.log(info);
    //     if (info === null) {
    //         const exist = await Users.findOne
    //             ( { user_email: body.user_email } );
    //         if (exist === null) {
    //             res.status(200).send({ message: '尚未註冊', contents: [] });
    //         }
    //         else {
    //             res.status(200).send({ message: '密碼錯誤', contents: [] });
    //         }
    //     }
    //     else {
    //         console.log("success");
    //         res.status(200).send({ message: 'success', contents: info });
    //     }
    // } catch (error) {
    //     res.status(403).send({ message: 'error', contents: [] });
    // }
}

// exports.CountPostsByUser = async (req, res) => {
//     const id = req.query.user_id;
//     try {
//         const info = await Posts.countDocuments({ author_id: id });
//         res.status(200).send({ message: 'success', contents: info });
//     } catch (error) {
//         res.status(403).send({ message: 'error', contents: [] });
//     }
// }

// exports.CountLikesByUser = async (req, res) => {
//     const id = req.query.user_id;
//     try {
//         const info = await Likes.countDocuments({ user_id: id });
//         res.status(200).send({ message: 'success', contents: info });
//     } catch (error) {
//         res.status(403).send({ message: 'error', contents: [] });
//     }