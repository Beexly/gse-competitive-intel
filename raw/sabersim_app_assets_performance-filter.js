(function () {
  /**
   * Intercept performance.measure to avoid third-party libraries polluting Firebase Performance.
   * This filter blocks automatic traces from GTM, Stripe, PostHog, Zone.js, and more.
   */
  var originalMeasure = window.performance.measure;

  if (typeof originalMeasure !== 'function') return;

  window.performance.measure = function (name) {
    if (typeof name !== 'string') return originalMeasure.apply(this, arguments);

    var prefixes = [
      'GTM-',
      'gtag.',
      'stripe.js',
      'measure',
      'invoke',
      'inline',
      'browser',
      'Zone',
      'Wappalyzer',
      'page_/',
    ];

    var exactMatches = ['ANALYZE_FRAME', 'DOM-SCAN'];
    var regexPattern = /^\d+-\d+-\d+$/;

    var shouldFilter =
      prefixes.some(function (p) {
        return name.indexOf(p) === 0;
      }) ||
      exactMatches.indexOf(name) !== -1 ||
      regexPattern.test(name);

    if (shouldFilter) {
      // Trace blocked to keep Firebase Performance console clean
      return;
    }

    return originalMeasure.apply(this, arguments);
  };
})();
