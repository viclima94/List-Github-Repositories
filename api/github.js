const axios = require('axios');

const fetchRepos = async user => {
    const { data } = await axios.get(`https://api.github.com/users/${user}/repos`);
    return data;
}

module.exports = fetchRepos;