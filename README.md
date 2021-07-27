# node_sns

### npm i sequelize mysql2 sequelize-cli

### npx sequelize init

config, migrations, models, seeders 폴더 가 생성됩니다.
npx 를 하는 이유는 전역설치를 피하기 위함
템플릿 파일을 넣을 views 폴더, 라우터 를 넣을 routes 폴더, 정적 파일을 넣을 public 폴더 필요
passport 패키지를 넣을 passport 폴더 생성
설정파일을 넣을 .env 파일 생성

### npm i express cookie-parser express-session morgan multer dotenv nunjucks

### npm i -D nodemon

### npx sequelize db:create

데이터 베이스가 생성됩니다.

### 모델을 서버와 연결

app.js

```
const pageRouter = require("./routes/page");
const { sequelize } = require("./models");

const app = express();
app.set("port", process.env.PORT || 8001);
app.set("view engine", "html");

nunjucks.configure("views", {
  express: app,
  watch: true,
});

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터 베이스 연결 성공");
  })
  .catch(err => {
    console.log(err);
  });

app.use(morgan("dev"));
```

서버를 실행
시퀄라이즈는 테이블 생성 쿼리문에 IF NOT EXISTS 를 넣어주므로 테이블이 없을 때 테이블을 자동생성한다.

### 패스포트 모듈로 로그인 구현하기

### npm i passport passport-local passport-kakao bcrypt

app.js

```
const dotenv = require("dotenv");
const passport = require("passport");

dotenv.config();
const pageRouter = require("./routes/page");
const { sequelize } = require("./models");
const passportConfig = require("./passport");

const app = express();
passportConfig(); // 패스포트 설정
app.set("port", process.env.PORT || 8001);
app.set("view engine", "html");

nunjucks.configure("views", {
  express: app,
  watch: true,
});

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터 베이스 연결 성공");
  })
  .catch(err => {
    console.log(err);
  });

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: { httpOnly: true, secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", pageRouter);
```
