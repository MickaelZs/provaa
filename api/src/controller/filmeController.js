import { inserirFilme } from "../repository/filmeRepository.js";

import { Router } from "express";
const server = Router();

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



export default server;