// The playground is where people create and play with mojulo equations

(function() {
  // Error reporting functions (not a very nice mechanism, but I
  // Can't think of a nice way to do it right now without restructuring the code.
  function displayError(e) {
    document.getElementById('error-display').textContent = e.message;
  }

  function clearError(e) {
    document.getElementById('error-display').textContent = '';
  }

  // Capture uncaught errors and display them too
  window.onerror = function(error) {
    console.error(error);
    document.getElementById('error-display').textContent = error;
    return true;
  };

  function Equation(field) {
    this.field = field;
    this.update(this.readHash());
  }

  Equation.prototype = {
    update: function(value) {
      console.log(value);
      // Write the location hash
      location.hash = '#' + btoa(value);
      this.field.value = value;
      this.value = value;

      if (this.onUpdate) this.onUpdate(value);
    },

    readHash: function() {
      if (location.hash) {
        return atob(location.hash.substring(1));
      } else {
        return 'x * y * time';
      }
    }
  };

  var form = document.getElementById('equation-form');
  var equationField = form.querySelector('input[type=text]');

  var equation = new Equation(equationField);
  var mojulo = new Mojulo('0', document.getElementById('playground-display'));

  // Detect updates, and update the Mojulo instance
  equation.onUpdate = function(value) {
    try {
      mojulo.equation = mathparser.parse(value);
    } catch(e) {
      displayError(e);
      mojulo.equation = function() { return 0; };
      return;
    }
    mojulo.frame = 1;
  };

  // Update when the submit button is pressed
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    equation.update(equationField.value);
  });

  equation.update(equationField.value);

  mojulo.run();
})();
