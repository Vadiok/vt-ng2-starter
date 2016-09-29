# vtNg2Starter

## Основано на [vt-gulp-task-templates](https://github.com/Vadiok/vt-gulp-task-templates)

### Запуск

* ``npm i``
* ``bower i``
* ``npm run typings i``
* ``gulp ts`` или ``gulp ts:watch`` для компилияции с минификацией (долго)
* ``gulp ts:unc`` или ``gulp ts:unc:watch`` для компилияции без минификации (использовать во время разработки, при этом ``srcript.min.js`` также создается, но не минифицируется)
* ``pug ts`` или ``pug ts:watch``

### Требуемые пакеты

Для работы ``gulp``:
* ``del``
* ``gulp``
* ``gulp-if``
* ``gulp-pug`` (только для компиляции *Pug* в *HTML*)
* ``gulp-rename``
* ``gulp-sourcemaps``
* ``gulp-tsc``
* ``gulp-uglify``
* ``ts-loader``
* ``typescript``
* ``typings``
* ``webpack-stream``

Для компиляции Angular приложения:
* ``@angular/common``
* ``@angular/compiler``
* ``@angular/core``
* ``@angular/platform-browser``
* ``@angular/platform-browser-dynamic``
* ``rxjs``
* ``symbol-observable``

Для работы скрипта приложения
* ``core.js``
* ``reflect-metadata``
* ``zone.js`` из [angular/zone.js](https://github.com/angular/zone.js)
