import config from "./config";
import app from "./server";

app.listen(config.port, () =>
  console.log(`📡 server is running on port:${config.port}`)
);
