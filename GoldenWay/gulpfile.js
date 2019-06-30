var  gulp = require("gulp"),
     sass = require("gulp-sass"),
     autoprefixer = require("gulp-autoprefixer"),
     browserSync = require("browser-sync").create(),
     cssbeautify = require("gulp-cssbeautify"),
     cleanCSS = require("gulp-clean-css");

var options = {
    scssFile: "./src/scss/*.scss",
    cssFolder: "./build/css/",
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
})

gulp.task('minify-css', () => {
    return gulp.src("./build/css/*.css")
      .pipe(cleanCSS({ level: 2 }))
      .pipe(gulp.dest('./build/css/min/'));
})

gulp.task('serve', function() {
    browserSync.init({
        server: './'
    });
    gulp.watch(options.scssFile).on('change', gulp.series('compile-css', 'minify-css'));
    gulp.watch(options.indexHtml).on('change', browserSync.reload);
    gulp.watch("./build/css/*.css").on('change', gulp.series('minify-css'));
})

gulp.task('default', gulp.series('serve'));
