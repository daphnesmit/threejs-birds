/**
 * A function to instantiate all modules within the document
 * @param selector {string} the selector used to select a module
 * @param constructor {function} the function to create a new instance of the module
 * @param opt_arguments {=array} extra arguments to pass onto the module constructor, after the element.
 */
function ModuleInit(selector, constructor, opt_arguments) {

    // grab all the module elements
    const moduleElements = document.querySelectorAll(selector);
    const moduleInstances = [];

    // loop through all the elements and instantiate the module
    for (let i = 0, leni = moduleElements.length; i < leni; i++) {

        const element = moduleElements[i];
        element._initializedModules = element._initializedModules || [];

        // check if the module has not already been instantiated on this element
        if (element._initializedModules.indexOf(constructor.name) === -1) {

            element._initializedModules.push(constructor.name);


            if (!opt_arguments) {

                // create new module and save it into the Array
                moduleInstances.push(new constructor(element));

            } else {

                // if an Array with extra arguments have been given, push them into an arguments array
                // the first argument will the context for the function, can be null because the context will be reset by the new operator
                // the seconds argument is actually the first argument to be passed onto the constructor, so in this case the HTMLElement.
                const constructorArguments = [null, element];
                Array.prototype.push.apply(constructorArguments, opt_arguments);

                // create new module with the arguments and save it into the Array
                // @see: http://stackoverflow.com/questions/1606797/use-of-apply-with-new-operator-is-this-possible
                moduleInstances.push(new (constructor.bind.apply(constructor, constructorArguments))());

            }

        }

    }

    // Return all the instances that have been created
    return moduleInstances;

}

// IE polyfill for constructor.name
(function () {
    if (Function.prototype.name === undefined && Object.defineProperty !== undefined) {
        Object.defineProperty(Function.prototype, 'name', {
            get () {
                const funcNameRegex = /function\s([^(]{1,})\(/;
                const results = (funcNameRegex).exec((this).toString());
                return (results && results.length > 1) ? results[1].trim() : '';
            },
            set () {
                // Empty function to prevent set is not a function
            }
        });
    }
})();

// Export the module init function
export default ModuleInit;