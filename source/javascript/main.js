'use strict';

/*------------------------------------*\
 * JS Main entry file
 \*------------------------------------*/
import './config';

// Import utilities.
import moduleInit from '@utilities/module-init';

// Import Singletons
import '@utilities/detect-touch';

// Import modules.
import ExampleModule from '@components/example';

// Initialize modules.
moduleInit( '[js-hook-module-example]', ExampleModule );
