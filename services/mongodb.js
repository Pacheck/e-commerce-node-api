const { MongoClient } = require('mongodb');

async function connectToMongoDB() {
  const { BD_LOGIN, BD_PASSWORD, BD_CLUSTER_URL } = process.env;
  const uri = `mongodb+srv://${BD_LOGIN}:${BD_PASSWORD}@${BD_CLUSTER_URL}/?retryWrites=true&w=majority`;
  
  const client = new MongoClient(uri);

  try {
    await client.connect();
  } catch(err) {
    console.log(err);
  } finally {
    await client.close();
  }
}

module.exports = {
  connectToMongoDB
}