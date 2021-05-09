let mix = require('laravel-mix');

mix
  .postCss('css/style.css', 'style-dist.css', [
    require('postcss-import'),
    require('tailwindcss'),
    require('postcss-nested'),
    require('postcss-custom-properties'),
  ]);