// JavaScript CommonJS syntax
require('@babel/register');
const app = require('./app');
const { serverConfig } = require('./utils/constants');

// Start server
app.listen(serverConfig.PORT, () => {
  console.log(`Server listening on port: ${serverConfig.PORT}`);
});
