require("dotenv-safe").config();

var jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const fetchRepos = require('./api/github');
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json())
app.use(cors())

function verifyJWT(req, res, next){
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      
      req.userId = decoded.id;
      next();
    });
}

app.post('/login', (req,res,next) =>{
    
    if(req.body.user === 'admin' || req.body.password === '12345'){
    //auth ok
    const id = 1; 
    var token = jwt.sign({ id }, process.env.SECRET, {
      expiresIn: 300 // expires in 5min
    });
    return res.json({ auth: true, token: token });
  }
  
  res.status(500).json({message: 'Login inválido!'});
});

app.get('/',verifyJWT, async  (req, res, next) => {
    try {
        const { user } = req.query;
        
        if (!user) {
            return res.status(400).json({
                message: 'You must inform and user on query string'
            });
        }
        
        const repos = await fetchRepos(user);
        if (repos.length) {
            const response = repos.map((repo) => {
                //return only what we want
                return { 
                    name: repo.name, 
                    description: repo.description, 
                    language: repo.language, 
                    owner: repo.owner.login, 
                    isPrivate: repo.private, 
                    fullName: repo.full_name, 
                    createdAt: repo.created_at, 
                    updatedAt: repo.updated_at 
                }
            });
            return res.status(200).json(response);
        }

    } catch ({ response }) {
        // Error if we don't find the repository
        if(response.status === 404) {
            return res.status(404).json({
                message: 'Repository not found'
            });
        }

        res.status(500).json({
            message: 'Internal server error'
        });
    };
})


app.listen(8080, () => console.log(`Running on port ${PORT}`));