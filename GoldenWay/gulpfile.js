var  gulp = require("gulp"),
     sass = require("gulp-sass"),
     autoprefixer = require("gulp-autoprefixer"),
     browserSync = require("browser-sync").create(),
     cssbeautify = require("gulp-cssbeautify"),
     cleanCSS = require("gulp-clean-css"),
     uglify = require("gulp-uglify"),
     pipeline = require('readable-stream').pipeline,
     imagemin = require("gulp-imagemin");

var options = {
    scssFile: "./src/scss/*.scss",
    cssFolder: "./build/css/",
    cssFiles: "./build/css/*.css",
    indexHtml: "./*.html"
}

gulp.task("compile-css", function() {
     gulp.src(options.scssFile)
        .pipe(sass().on("error", sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 3 versions'],
            cascade: false 
        }))
        .pipe(cssbeautify({
            indent: ' ',
            openbrace: "separate-line",
            autosemicolon: true
        }))
        .pipe(gulp.dest(options.cssFolder))
        .pipe(browserSync.stream());
});

gulp.task('minify-css', () => {
    return gulp.src("./build/css/*.css")
      .pipe(cleanCSS({ level: 2 }))
      .pipe(gulp.dest('./build/css/min/'));
});


gulp.task('uglify', function () {
    return pipeline(
        gulp.src('./src/js/**/*.js'),
        uglify(),
        gulp.dest('./build/js')
    );
});

gulp.task('imgcompres', () => {
    return gulp.src("./src/img/**")
    .pipe(imagemin({
        progresive: true
    }))
    .pipe(gulp.dest("./build/img/"))
});

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch(options.scssFile).on('change', gulp.series('compile-css'))
    gulp.watch(options.indexHtml).on('change', browserSync.reload)
    gulp.watch(options.cssFiles).on('change', gulp.series('minify-css'))
    gulp.watch("./src/js/main.js").on('change', gulp.series('uglify'))
    gulp.watch("./src/img/**").on('all', gulp.series('imgcompres'));
});

gulp.task('default', gulp.series('serve'));