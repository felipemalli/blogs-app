const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./src/routes/userRouter');
const loginRouter = require('./src/routes/loginRouter');
const categoryRouter = require('./src/routes/categoryRouter');
const blogPostRouter = require('./src/routes/blogPostRouter');
const errorMiddleware = require('./src/middlewares/error');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(bodyParser.json());

app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/categories', categoryRouter);
app.use('/post', blogPostRouter);

app.use(errorMiddleware);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

//  não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
