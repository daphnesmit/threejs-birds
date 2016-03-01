[frontend-setup](https://bitbucket.org/tamtam-nl/tamtam-frontend-setup)
==============
This setup is based on [Gulp starter](https://github.com/vigetlabs/gulp-starter) and has been modified to an ideal usecase.

# Table of Contents
1. [Intro](#setup)
2. [Install](#install)
3. [Gulp](#gulp)
4. [Folder structure](#folder-structure)
    - [Source](#source)
        - [Assets](#assets)
        - [Data](#data)
        - [HTML](#html)
        - [Javascript](#javascript)
        - [SASS](#sass)
    - [Build and Dist](#build-and-dist)
6.  [HTML Templating](#html-templating-nunjucks)
7.  [Grid system](#grid-system)


# Setup #
Welcome to the readme of the TamTam frontend setup.

This is a basic setup for creating (static) html templates.
Filled with automated tasks and configuration options.
It enables you to quickly and easily setup your project and get in running in no time.
Many things are already predefined, added and sorted out for you to take away some hussle.
The pro users can dive into settings an tasks, but that's not required to work with it.


You're always welcome to change settings and reorder things around the project,
as long as you keep the folder strucute as is. 
This way other developers can get their head around your code and your folder won't become a maze.


The setup is always in progress so if you're having an idea or thought, please share it.
Send an email to simon@tamtam.nl and we'll take care of it.
When you're in to optimise code, add a feature or any code whatsoever, please do so and get a pullrequest.

We're in this together, as a group of frontend developers.
So let's make this setup as best as we can so every project is setup in no time !


**Team responsible for this setup:**

* Simon Colijn (simon@tamtam.nl)
* Adrian Klingen (adrian@tamtam.nl)
* Geert Fokke (geert@tamtam.nl)
* All frontend developers within TamTam (frontend@tamtam.nl)

------

# Install #
Some simple ordered steps to get your project running.

1. npm install
1. bower install
1. gulp

------

# Gulp #
We're using Gulp by default for our project setup.
All settings are stored in the **gulpfile.js** folder, where **config.js** contains the global Gulp config.
Pro-users could dive deeper into the Gulp setup, but it's not required.

> Please don't use Grunt, it's outdated, not as supported as Gulp and we do not support it at TamTam anymore.


**Some default Gulp tasks:**

* gulp 
> (default - will run gulp server)
* gulp bamboo 
> (build specific for Bamboo)
* gulp build 
> (default build for development)
* gulp dist 
> (build for distribution for backend)
* gulp server 
> (build including live server)

------

# Folder Structure #

## Source ##

### Assets ###
Contains fonts, images and SVG files.

These will be automaticly copied to the right folders.

### Data ###
JSON data which is available for your Nunjucks templating.
The files are sorted per page.

### HTML ###
Modular setup of the HTML files.

In the root of the folder, the pages are set.

Folders are used for **elements**, **layout** and **modules**.

The **_dev** folder is used for development / debug purpose and there's no real need to edit this. These files are not used in the real project, but during local development.


### Javascript ###
CommonJS setup with various sample images to explain how to use, export and reuse the modules.


### SASS ###
Folder which contains all SASS and related files, e.g. configs, mixins and extends.

The **_dev** folder is - again - just being used in local development. All other folders and files are split and sorted into elements, layout, modules and utils.

Files can be rearranges as wished, as long as the main folder structure stays intact.



## Build and Dist ##
Both folders will be created by the corresponding Gulp task and will include all final files.

------

# HTML Templating - Nunjucks #
[What is nunjucks?](https://mozilla.github.io/nunjucks/) Nunjucks is a powerful templating engine, using Javascript. It allows you to create sophisticated [macros](https://mozilla.github.io/nunjucks/templating.html#macro) to render clean and easy-to-read html.

[Read the Documentation here](https://mozilla.github.io/nunjucks/templating.html)

### Example ###

__Macro definition__
```
{% macro inputText(name, value='', type='text') %}
<div class="input__holder">
    <label for="{{ name }}"></label>
    <input class="input--{{ type }}" type="{{ type }}" name="{{ name }}" id="{{ name }}" placeholder="{{ value | escape }}" />
</div>
{% endmacro %}
```

__Usage__

```
{{ inputText('username', false, 'text') }}
```

__Result__
```
<div class="input__holder">
    <label for="username"></label>
    <input class="input--text" type="text" name="username" id="username" placeholder="" />
</div>
```

------


# HTML Templating - Nunjucks #
[What is nunjucks?](https://mozilla.github.io/nunjucks/) Nunjucks is a powerful templating engine, using Javascript. It allows you to create sophisticated [macros](https://mozilla.github.io/nunjucks/templating.html#macro) to render clean and easy-to-read html.

[Read the Documentation here](https://mozilla.github.io/nunjucks/templating.html)

### Example ###

__Macro definition__
```
{% macro inputText(name, value='', type='text') %}
<div class="input__holder">
    <label for="{{ name }}"></label>
    <input class="input--{{ type }}" type="{{ type }}" name="{{ name }}" id="{{ name }}" placeholder="{{ value | escape }}" />
</div>
{% endmacro %}
```

__Usage__

```
{{ inputText('username', false, 'text') }}
```

__Result__
```
<div class="input__holder">
    <label for="username"></label>
    <input class="input--text" type="text" name="username" id="username" placeholder="" />
</div>
```

------

# Grid system #

## Config ##

__Breakpoints__

The media query [config](src/develop/source/sass/_vars/_media.scss) can be found in the [_vars](src/develop/source/sass/_vars/) folder. Here you can configure the breakpoints to fit your needs.


__Grid__

The grid [config](src/develop/source/sass/_vars/_config.scss) can be found in the [_vars](src/develop/source/sass/_vars/) folder. Here you can configure the breakpoints, gutters and max-width for the container and grid.

You can also add extra breakpoints or change the prefix in the `$grid-breakpoints` var.


__Original__

```
$grid-breakpoints   : ( 'sm': $breakpoint-small,
                        'md': $breakpoint-medium );
```

__Added breakpoints__

This example will add a new breakpoint called large. By default the large breakpoint is `1024px`.

```
$grid-breakpoints   : ( 'sm': $breakpoint-small,
                        'md': $breakpoint-medium,
                        'lg': $breakpoint-large );
```

------