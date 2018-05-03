const vars = require('./gulp/vars'),
	gulp = require('gulp'),
	sequence = require('run-sequence');

require('./gulp/process-styles');
require('./gulp/process-scripts');
require('./gulp/process-data');
require('./gulp/prepare-libs');
require('./gulp/process-html');
require('./gulp/process-clean');
require('./gulp/deployment');

gulp.task('watch', function() {
	gulp.watch(vars.paths.styles.watch, ['process-styles']);
	gulp.watch(vars.paths.scripts.watch, ['process-scripts']);
	gulp.watch(vars.paths.data.images.src, ['process-images']);
	gulp.watch(vars.paths.data.fonts.src, ['process-fonts']);
	gulp.watch(vars.paths.data.json.watch, ['process-handlebars', 'process-json']);
	gulp.watch(vars.paths.handlebars.watch, ['process-handlebars']);
});

gulp.task('clean-sheet', function(done) {
	sequence('clean', ['prepare-libs', 'prepare-data'], done);
});

gulp.task('default', function(done) {
	sequence(
		['clean-sheet'],
		['process-handlebars'],
		'process-styles', 'process-scripts',
		['localServer','watch'],
		done);
});

gulp.task('build', function (done) {
	sequence(
		['clean-sheet'],
		['process-handlebars'],
		['process-styles-prod', 'process-scripts-prod'],
		done);
});

