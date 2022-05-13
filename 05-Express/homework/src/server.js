// const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());
//importante si vamos a trabajar req.body , es decir vamos a recibir informacion
//por body, no nos podemos olvidar de activar el middleware de expresss.json() 
const PATH = '/posts'
let id = 1;
server.post(PATH, (req, res) => {
    const {author, title , contents} = req.body;
    console.log(author, title, contents)
    //let author = req.body.author
    if(!author || !title || !contents){
        return res
            .status(STATUS_USER_ERROR)
            .json({
                error: "No se recibieron los parametros necesarios para crear el Post"
            })
    }

    const post = {
        author, title, contents, id: id++
    }
    posts.push(post)
    res.status(200).json(post)
});

server.post(`${PATH}/author/:author`, (req, res) => {
    //let author = req.params.author
    let {author} = req.params
    let {title, contents} = req.body;
    //let title = req.body.title
    //let contents = req.body.contents
    if(!author || !title || !contents){
        return res 
            .status(STATUS_USER_ERROR)
            .json({
                error: "No se recibieron los parametros para crear el Post"
            })
    }
    const post ={
        author, title, contents, id:id++
    }
    posts.push(post);
    res.status(200).json(post);
})
server.get(PATH, (req, res) =>{
    let {term} = req.query;
    console.log(term)
    if(term){
        const term_posts = posts.filter(
            (p) => p.title.includes(term) || p.contents.includes(term)
        )
        console.log(term_posts);
        return res.json(term_posts);
    }
    res.json(posts)
})

server.get(`${PATH}/:author`, (req, res) => {
    let {author} = req.params;
    const posts_author = posts.filter((p) => p.author === author);
    if(posts_author.length > 0){
        res.json(posts_author)
    }else{
        return res
            .status(STATUS_USER_ERROR)
            .json({error: "No existe ningun post del autor indicado"})
    }
})
//query -> /posts?key=value&key2=value2
server.get(`${PATH}/:author/:title`, (req, res) => {
    let {author, title} = req.params;
    if(author && title){
        const new_posts = posts.filter((p) => p.author === author && p.title === title)
        if(new_posts.length > 0){
            res.json(new_posts);
        }else{
            return res
            .status(STATUS_USER_ERROR)
            .json({error: "No existe ningun post con dicho titulo y autor indicado"})
        }}
    else{
        return res
        .status(STATUS_USER_ERROR)
        .json({error: "No existe ningun post con dicho titulo y autor indicado"})
    }
})

server.put(PATH, (req, res) => {
    let{id, title, contents} = req.body;
    if(id && title && contents){
        //find devuelve el primer elemento que concida como el id es unico encuentra uno
        let post = posts.find(p => p.id === parseInt(id));
        if(post){
            post.title = title;
            post.contents = contents;
            res.json(post)
        }else{
            return res
            .status(STATUS_USER_ERROR)
            .json({error: "No existe ningun post con dicho id"})
        }
    }else{
        return res
            .status(STATUS_USER_ERROR)
            .json({error:"No se recibieron los parámetros necesarios para modificar el Post"})
    }
})

server.delete('/posts', (req, res) => {
    let { id } = req.body;
    //verifico que mi id existe dentro del arreglo despues si hago el filter
    const post = posts.find((p) => p.id === parseInt(id));
    if(!id || !post){
        return res.status(STATUS_USER_ERROR).json({ error: "Mensaje de error" });
    }
    console.log(posts.splice(posts.findIndex((auxpost) => auxpost.id === id),1));
    res.json({ success: true })
})
// server.delete('/author', (req, res) => {
//     const{author} = req.body;
//     const author_found = posts.find(p => p.author === author);
//     if(!author || !author_found){
//         return res.status(STATUS_USER_ERROR).json({error: "No existe el autor indicado"})
//     }
//     let delete_authors = [];

//     posts = posts.filter(p =>{
//        if(p.author !== author){
//            return true;
//        }else{
//            delete_authors.push(p)
//        }
//     })
//     return res.json(delete_authors)
// })
server.delete('/author', (req, res) => {
    let {author} = req.body;
    const author_found = posts.find( p=> p.author === author);
    if (!author || !author_found) {
        return res.status(STATUS_USER_ERROR).json({ error: "No existe el autor indicado" });
      }
    let delete_authors = [];
    delete_authors = posts.filter( p=> p.author === author);
    posts = posts.filter(p => p.author !== author);  
    return res.json(delete_authors);
});

// TODO: your code to handle requests


module.exports = { posts, server };
