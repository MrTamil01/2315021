const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

async function Log(stack, level, package_name, message) {
  await axios.post(
    'http://4.224.186.213/evaluation-service/logs',
    {
      stack,
      level,
      package: package_name,
      message,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
    }
  );
}

module.exports = Log;
