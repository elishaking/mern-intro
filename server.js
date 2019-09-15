const express = require('express');

const server = express();
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

server.use(express.json());

server.get('/', (req, res) => {
  res.send("Hello");
});
