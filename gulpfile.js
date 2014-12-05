var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var sourceFiles = [
    './src/js/namespaces.js',
    './src/js/core/fnc_object.js',
    './src/js/core/fnc_object_collection.js',
    './src/js/ui_controls/ui_element.js',
    './src/js/ui_controls/html5_control.js',
    './src/js/ui_controls/input_controls/radiobutton.js',
    './src/js/ui_controls/input_controls/textbox.js',
    './src/js/ui_controls/panels/panel.js',
    './src/js/ui_controls/panels/f_canvas.js',
    './src/js/ui_controls/panels/grid.js',
    './src/js/ui_controls/panels/stackpanel.js',
    './src/js/ui_controls/panels/wrappanel.js',
    './src/js/ui_controls/panels/dockpanel.js',
    './src/js/core/factory.js',
    './src/js/ui_controls/globals/root_visual.js',
    './src/js/main.js'];

gulp.task('concat', function() {
  gulp.src(sourceFiles)
    .pipe(concat('fnc.js'))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('minify', function () {
    gulp.src(sourceFiles)
    .pipe(concat('fnc.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'))
});

gulp.task('default', ['concat','minify']);
