import gulp from 'gulp';
import gulpMocha from 'gulp-mocha';
import path from 'path';
import cssHook from 'css-modules-require-hook';
import preprocessCss from '../src/test/helpers/babel-sass-preprocessor';

// Allow scss modules to be parsed by babel.
cssHook({
  extensions: ['.css', '.scss'],
  preprocessCss
});

gulp.task('test', async () => {
  const defaultFiles = [
    path.resolve(__dirname, '..', 'src/test/components/form/*.test.js'),
    path.resolve(__dirname, '..', 'src/test/components/form/**/*.test.js'),
    path.resolve(__dirname, '..', 'src/test/components/form/**/**/*.test.js')
  ];
  const files = process.env.FILES ?
    process.env.FILES.split(',') : defaultFiles;

  // Ensure client tests are run with DOM available.
  const injectDomPath = path.resolve(__dirname, '..', 'src/test/helpers/inject-dom.js');
  files.splice(0, 0, injectDomPath);

  // Ensure global variables avialable.
  const globalsPath = path.resolve(__dirname, '..', 'src/test/helpers/globals.js');
  files.splice(0, 0, globalsPath);

  gulp.src(files, { read: false })
    .pipe(gulpMocha())
    .once('end', ()=>{
      process.exit();
    });
});
