var gulp = require("gulp");
var uncss = require("gulp-uncss");
var concat = require("gulp-concat");
var minifyCss = require("gulp-minify-css");
var imagemin = require("gulp-imagemin");
var uglify = require("gulp-uglify");
var pngquant = require("imagemin-pngquant");
var htmlmin = require("gulp-htmlmin");
var gzip = require("gulp-gzip");
var inline = require("gulp-inline");

var awsUpload = require("gulp-s3-upload")({useIAM:true});

//
// Pre-process, then minify and inline everything to HTML
//

gulp.task("default", [
    "optimize-css",
    "copy-fonts",
    "copy-scripts",
    "optimize-scripts"
], function() {
    
    return gulp.src(["source/**/*.html"]).
        pipe(inline({
          base: "dist/",
          disabledTypes: ["svg", "img"]
        })).
        pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        })).
        pipe(gulp.dest("dist/"));
});

//
// Pre-processing
//

gulp.task("optimize-css", function() {
   
    return gulp.src(["source/styles/*.css"]).
        pipe(uncss({
            html: ["source/*.html"]
        })).
        pipe(concat("lenhoksin.css")).
        pipe(minifyCss()).
        pipe(gulp.dest("dist/styles"));
    
});


gulp.task("optimize-images", function() {
   
    return gulp.src(["source/images/*"]).
        pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        })).
        pipe(gulp.dest("dist/images"));
    
});

gulp.task("copy-fonts", function() {
   
    return gulp.src(["source/fonts/**/*"]).
        pipe(gulp.dest("dist/fonts"));
        
});

gulp.task("copy-scripts", function() {
   
    return gulp.src(["source/script-lib/**/*"]).
        pipe(gulp.dest("dist/scripts"));
        
});

gulp.task("optimize-scripts", function() {
   
    return gulp.src(["source/scripts/**/*"]).
        pipe(uglify({
            preserveComments: false
        })).
        pipe(gulp.dest("dist/scripts"));
        
});

//
// Deployment
//

gulp.task("deploy", function() {
   
    return gulp.src(["dist/**/*"]).
        pipe(awsUpload({
            Bucket: "www.gotolenhoksin.org",
            ACL:    "public-read"
        }));
    
});

