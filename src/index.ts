//key ID - fc8296728781f8bf44916216b2fe4f71
//secret key - d44cef15d6ca7a091ecad99bf9b7a9b17ec2428d8770784b243c0eb8d1812bb4
//endpoint - https://81575b281e66967f423e14f66e4d01c7.r2.cloudflarestorage.com

import express from 'express';
import cors from 'cors';
import simpleGit from 'simple-git';
import path from "path";
import { getAllFiles } from './file';

const app = express();

app.use(express.json());
app.use(cors());

//api endpoints
app.post("/deploy", async (req, res) => {
    const repoUrl = req.body.repoUrl; //github URL
    const id = generate();
    await simpleGit().clone(repoUrl, path.join(__dirname, `output/${id}`))

    const files = getAllFiles(path.join(__dirname, `output/${id}`));
    console.log(files);

    res.json({
        id: id,
    })
})

//create a random id for every project
function generate() {
	const subset = "123456789qwertyuiopasdfghjklzxcvbnm";
	const length = 5;
	let id = "";
	for (let i = 0; i < length; i++) {
		id += subset[Math.floor(Math.random() * subset.length)];
	}
	return id;
}

app.listen(3000);