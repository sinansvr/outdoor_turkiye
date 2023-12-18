require("dotenv").config();
const HOST = process.env?.HOST || "127.0.0.1";
const PORT = process.env?.PORT || 8000;

const swaggerAutogen = require("swagger-autogen")();
const packageJson = require("./package.json");

const document = {
  info: {
    version: packageJson.version,
    title: packageJson.title,
    description: packageJson.description,
    termsOfService: "https://github.com/sinansvr",
    contact: { name: packageJson.author, email: "svrsinan06@gmail.com" },
    license: { name: packageJson.license },
  },
  host: `${HOST}:${PORT}`,
  basePath: "/",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  securityDefinitions: {
		Token: {
			type: 'apiKey',
			in: 'header',
			name: 'Authorization',
			description: 'SimpleToken Auth * Example: <b>Token <i>...tokenKey...<i></b>'
		},
	},
	security: [{ Token: true }],
	definition: {
		// Models:
		"User": require('./src/models/user').schema.obj,
		"Category": require('./src/models/category').schema.obj,
		"Blog": require('./src/models/blog').schema.obj
		
	}

};

const routes = ['./index.js']
const outputFile = './src/configs/swagger.json'

//create json file
swaggerAutogen(outputFile, routes, document)