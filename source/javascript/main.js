'use strict'

/*------------------------------------*\
 * JS Main entry file
 \*------------------------------------*/
import './config'
import '@utilities/detect-touch'
import '@utilities/detect-keyboard-focus'

import Events from '@utilities/events'
import moduleInit from '@utilities/module-init'
// import Example from '@components/example' // Sync
// moduleInit.sync('[js-hook-module-example]', Example) // Sync

moduleInit.async('[js-hook-threejs]', () => import('@components/threejs')) // Async
moduleInit.async('[js-hook-modal]', () => import('@components/modal')) // Async
moduleInit.async('[js-hook-mega-menu]', () => import('@components/mega-menu')) // Async

Events.$trigger('flyout::init')
