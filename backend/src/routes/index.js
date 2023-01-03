import bookmarkPostRoute from './bookmark_post'
import postRoute from './posts'
import commentRoute from './comments'
import categoryRoute from './categories'
import userRoute from './users'
import tagRoute from './tags'
import statusRoute from './status'
import likePostRoute from './likes_posts'
import likeCommentRoute from './likes_comment'
import postTagRoute from './post_tag'


const wrap = fn => (...args) => fn(...args).catch(args[2])

function main(app) {


    //pending

    //Bookmark_post
    app.get('/api/getBookmarkPostsByUserIdPostId', wrap(bookmarkPostRoute.GetBookmarkPostByUserIdPostId))
    app.post('/api/createBookmarkPost', wrap(bookmarkPostRoute.CreateBookmarkPost))
    app.post('/api/deleteBookmarkPost', wrap(bookmarkPostRoute.DeleteBookmarkPost))
    app.get('/api/countBookmarkPostByUserId', wrap(bookmarkPostRoute.CountBookmarkPostByUserId))
    app.get('/api/countBookmarkByPostId', wrap(bookmarkPostRoute.CountBookmarkByPostId))
    app.get('/api/getBookmarkPostByUserId', wrap(bookmarkPostRoute.GetBookmarkPostByUserId))
    
    //Categories
    app.get('/api/getCategories', wrap(categoryRoute.GetCategories))
    app.post('/api/createCategory', wrap(categoryRoute.CreateCategory))

    //Comments
    app.get('/api/getCommentsByPostId', wrap(commentRoute.GetCommentsByPostId))
    app.post('/api/createComment', wrap(commentRoute.CreateComment))
    app.post('/api/updateComment', wrap(commentRoute.UpdateComment))
    app.post('/api/deleteComment', wrap(commentRoute.DeleteComment));

    //Likes (both comments and posts)
    app.get('/api/getLikesPostsByUserIdPostId', wrap(likePostRoute.GetLikesPostsByUserIdPostId))
    app.get('/api/getLikesByPostId', wrap(likePostRoute.GetLikesByPostId))
    app.get('/api/getLikesByCommentId', wrap(likeCommentRoute.GetLikesByCommentId))
    app.post('/api/likePost', wrap(likePostRoute.LikePost))
    app.post('/api/unlikePost', wrap(likePostRoute.UnlikePost))
    app.post('/api/likeComment', wrap(likeCommentRoute.LikeComment))
    app.post('/api/unlikeComment', wrap(likeCommentRoute.UnlikeComment))
    app.get('/api/countLikesByUserId', wrap(likePostRoute.CountLikesByUserId))
    app.get('/api/countLikesByPostId', wrap(likePostRoute.CountLikesByPostId))
    app.get('/api/countLikesByCommentId', wrap(likeCommentRoute.CountLikesByCommentId))


    //Post_tags
    app.get('/api/getPostTagsByPostId', wrap(postTagRoute.GetPostTagsByPostId))
    app.post('/api/createPostTag', wrap(postTagRoute.CreatePostTag))
    app.post('/api/deletePostTag', wrap(postTagRoute.DeletePostTag))

    //Posts
    app.get('/api/searchPosts', wrap(postRoute.SearchPosts))
    app.get('/api/getPosts', wrap(postRoute.GetPosts))
    app.get('/api/getPostById', wrap(postRoute.GetPostById))
    app.get('/api/getPostsByName', wrap(postRoute.GetPostsByName))
    app.get('/api/getPostsByContent', wrap(postRoute.GetPostsByContent))
    app.get('/api/getPostsByAuthorId', wrap(postRoute.GetPostsByAuthorId))
    app.get('/api/getPostsByCategoryId', wrap(postRoute.GetPostsByCategoryId))
    app.get('/api/getPostsByStatus', wrap(postRoute.GetPostsByStatus))
    app.get('/api/getPostsBySemester', wrap(postRoute.GetPostsBySemester))
    app.get('/api/getPostsByTagId', wrap(postRoute.GetPostsByTagId))
    app.get('/api/countPostsByAuthorId', wrap(postRoute.CountPostsByAuthorId))
    
    app.post('/api/createPost', wrap(postRoute.CreatePost))
    app.post('/api/updatePost', wrap(postRoute.UpdatePost));
    app.post('/api/deletePost', wrap(postRoute.DeletePost));

    //Tags
    app.get('/api/getTags', wrap(tagRoute.GetTags))
    app.post('/api/createTag', wrap(tagRoute.CreateTag))
    app.post('/api/updateTag', wrap(tagRoute.UpdateTag))
    app.post('/api/deleteTag', wrap(tagRoute.DeleteTag))

    //Users
    app.get('/api/getUsers', wrap(userRoute.GetUsers))
    app.get('/api/getUserById', wrap(userRoute.GetUserById))
    app.post('/api/createUser', wrap(userRoute.CreateUser))
    app.post('/api/updateUser', wrap(userRoute.UpdateUser))
    app.post('/api/deleteUser', wrap(userRoute.DeleteUser))
    app.post('/api/login', wrap(userRoute.Login))

}

export default main
