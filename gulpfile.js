const gulp = require('gulp'),
    del = require('del');

const melody = require('melody-gulp')({
    debug: true
});

melody.env('standard', {
    assetPath: 'src/',
    publicPath: 'dist/',
    revManifest: false,
    bowerPath: 'bower_components/',
    cssPath: 'css/',
    jsPath: 'js/'
});


melody.compose("styles", function (play) {
    play
        .env('standard')
        .bower('/bootstrap/dist/css/bootstrap.min.css')
        .bower('/fontawesome/css/font-awesome.min.css')
        .asset('/scss', 'scss')
        .record('style.css')
        .style()
});

melody.compose("scripts", function (play) {
    play
        .env('standard')
        .bower('/jquery/dist/jquery.js')
        .bower('/bootstrap/dist/bootstrap.js')
        .asset('/js/', 'js')
        .record('script.js')
        .script()
});

melody.compose("images", function (play) {
    play
        .env('standard')
        .asset('/img/*')
        .record(melody.envConfig('standard', 'publicPath') + '/img')
        .copy();
});

melody.compose("fonts", function (play) {
    play
        .env('standard')
        .bower('/font-awesome/fonts/*')
        .record(melody.envConfig('standard', 'publicPath') + '/fonts')
        .copy();
});

gulp.task('clean', function () {
    del.sync(melody.envConfig('standard', 'publicPath') + '/css/*');
    del.sync(melody.envConfig('standard', 'publicPath') + '/js/*');
    del.sync(melody.envConfig('standard', 'publicPath') + '/fonts/*');
    del.sync(melody.envConfig('standard', 'publicPath') + '/img/*');
});

melody.compose("build", ["clean", "styles", "scripts", "images", "fonts"]);