
let gulp = require('gulp');
let ts = require('gulp-typescript');
let tsp = ts.createProject('tsconfig.json'); //使用tsconfig.json文件配置tsc
let exec = require('child_process').exec;

let child;
//目录常量
const PATHS = {
    scripts:['./src/**/*.ts'],
    output:'./dist',
};
//编译ts文件
function build() {
  return gulp.src(PATHS.scripts)
        .pipe(tsp())
        .pipe(gulp.dest(PATHS.output));
}

//监视ts文件变化
function watch() {
  return gulp.watch(PATHS.scripts, build);
}

//自动重启服务器

function restart(params) {
  child = exec('supervisor -w dist ./dist/app.js',(error,stdout,stderr)=>{
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
    if (error !== null) {
        console.log(`exec error: ${error}`);
    }
});
}
//开发任务

const dev = gulp.series(build, restart, watch);


exports.dev = dev;
exports.default = dev;