import jff from 'jff';
import createLoading from 'dva-loading';
console.log(jff);
// 1. Initialize
const app = jff();
// 2. Plugins
// app.use({});
app.use(createLoading());
// 3. Model
// app.model(require('./models/example'));
// app.model(require("./models/users"));
// 4. Router
// app.router(require('./router'));

app.router(require('./router'));

// 5. Start
app.start('#root');

// alert('qqqqqzzzz');