import { alteraFilme, alterarimagem, buscapornome, buscarporid, deletafilme, inserirFilme, listatodosfilmes} from "../repository/filmeRepository.js";

import multer from 'multer'

import { Router } from "express";
const server = Router();

const upload = multer({dest: 'storage/capasFilmes'})

server.post ('/filme',async (req,resp) => {
    try{
        const filmeI = req.body;

        const filme = await inserirFilme(filmeI);

        resp.send(filme);
    }

    catch (err){
        resp.status(401).send({
            erro: err.message
        })
    }

})

server.put ('/filme/:id/imagem', upload.single('capa') ,async (req,resp) => {
    try{

        const {id} = req.params;
        const imagem = req.file.path;

        const resposta = await alterarimagem(imagem, id);
        if(resposta != 1){
            throw new error ('a imagem nao pode ser salva')

        }
        resp.status(204).send();

    }

    catch (err){
        resp.status(401).send({
            erro: err.message
        })
    }

    
})


server.get ('/filme',async (req,resp) => {
    try{
        const resposta = await listatodosfilmes();
        resp.send(resposta);
    }

    catch (err){
        resp.status(401).send({
            erro: err.message
        })
    }

})



server.get ('/filme/busca',async (req,resp) => {
    try{
        const {nome} = req.query;
    
        const resposta = await buscapornome(nome);
        resp.send(resposta);
    }

    catch (err){
        resp.status(401).send({
            erro: err.message
        })
    }

})

server.get ('/filme/:id',async (req,resp) => {
    try{
        const id = Number(req.params.id);
        const resposta = await buscarporid(id);
        resp.send(resposta);
    }

    catch (err){
        resp.status(401).send({
            erro: err.message
        })
    }

})

server.delete ('/filme/:id',async (req,resp) => {
    try{

        const { id } = req.params;
    
        const resposta = await deletafilme(id);
        resp.send(resposta);

    }

    catch (err){
        resp.status(401).send({
            erro: err.message
        })
    }

})

server.put ('/filme/:id',async (req,resp) => {
    try{

        const { id } = req.params;
        const Filme = req.body;


        if(!Filme.nome)
        throw new Error('nome e obrigatorio');

        if(!Filme.sinopse)
        throw new Error('sinopse e obrigatorio');

        if(Filme.avaliacao)
        throw new Error('avaliacao do filme e obtigatorio');

        if(!Filme.lancamento)
        throw new Error('lançamento do filme e obrigatorio');

        if(Filme.disponivel == undefined)
        throw new Error('campo disponivel e obrigatorio');

        if(!Filme.usuario)
        throw new Error('usuario nao logado');

        const resposta = await alteraFilme(id, Filme);
        resp.send(resposta);

    }

    catch (err){
        resp.status(401).send({
            erro: err.message
        })
    }

})





export default server;