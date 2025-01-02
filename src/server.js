require('@babel/register');
const app = require('./app');

const port = process.env.PORT || 5010;

// Start server
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
