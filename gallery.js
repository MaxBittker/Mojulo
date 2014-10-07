(function() {
  // Get all of the examples
  // List of HTML entities for escaping.
  var htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;'
  };

  // Regex containing the keys listed immediately above.
  var htmlEscaper = /[&<>"'\/]/g;

  // Escape a string for HTML interpolation.
  function escapeHTML(string) {
    return ('' + string).replace(htmlEscaper, function(match) {
      return htmlEscapes[match];
    });
  };

  var examples = document.querySelectorAll('div[data-formula]');
  [].slice.apply(examples).forEach(function(example) {
    var formula = example.getAttribute('data-formula');

    var link = document.createElement('a');
    link.setAttribute('href', '.#' + btoa(formula));

    var canvas = document.createElement('canvas');
    canvas.setAttribute('width', 100);
    canvas.setAttribute('height', 100);

    var label = document.createElement('span');
    label.setAttribute('class', 'example-label');
    var labelText = document.createTextNode(formula);
    label.appendChild(labelText);

    link.appendChild(canvas);
    link.appendChild(label);

    example.appendChild(link);

    var mojulo = new Mojulo(formula, canvas);
    mojulo.frame = 20;
    mojulo.drawFrame();

    link.addEventListener('mouseover', function() {
      mojulo.frame = 1;
      mojulo.play();
    });

    link.addEventListener('mouseout', function() {
     // mojulo.frame = 20;
      mojulo.pause();
      mojulo.drawFrame();
    });
  });
})();
