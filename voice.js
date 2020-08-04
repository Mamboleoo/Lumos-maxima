const websites = [
  {
    host: 'cassie.codes',
    nox: () => {
      const _switch = document.querySelector('.js-night-checkbox');
      if (!_switch.checked) _switch.click();
    },
    lumos: () => {
      const _switch = document.querySelector('.js-night-checkbox');
      if (_switch.checked) _switch.click();
    }
  }, {
    host: 'canistop.net',
    nox: () => {
      if (document.documentElement.classList.contains('basic-white')) {
        document.documentElement.classList.add('basic-black');
        document.documentElement.classList.remove('basic-white');
      }
    },
    lumos: () => {
      if (document.documentElement.classList.contains('basic-black')) {
        document.documentElement.classList.add('basic-white');
        document.documentElement.classList.remove('basic-black');
      }
    }
  }, {
    host: 'jhey.dev',
    nox: () => {
      const _switch = document.querySelector('.theme-toggle__input');
      if (!_switch.checked) _switch.click();
    },
    lumos: () => {
      const _switch = document.querySelector('.theme-toggle__input');
      if (_switch.checked) _switch.click();
    }
  }, {
    host: 'docker.com',
    nox: () => {
      const _switch = document.querySelector('#switch-style');
      if (!_switch.checked) _switch.click();
    },
    lumos: () => {
      const _switch = document.querySelector('#switch-style');
      if (_switch.checked) _switch.click();
    }
  }, {
    host: 'henry.codes',
    nox: () => {
      const _switch = document.querySelector('.nav__list-dark-mode');
      console.log(_switch)
      console.log(document.documentElement.getAttribute('dark') === null)
      if (document.documentElement.getAttribute('dark') === null) _switch.click();
    },
    lumos: () => {
      const _switch = document.querySelector('.nav__list-dark-mode');
      if (document.documentElement.getAttribute('dark') === '') _switch.click();
    }
  }
];

if (!recognition) {
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition

  var recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = function(event) {
    let result = event.results[event.results.length - 1][0].transcript;
    result = result.toLowerCase();
    console.log(result);
    if (result.indexOf('lumos maxima') > -1) {
      toggle('lumos');
      toggle('maxima');
    } else if (result.indexOf('lumos') > -1) {
      toggle('lumos');
    } else if (result.indexOf('nox') > -1 || result.indexOf('knox') > -1) {
      toggle('nox');
    }
  }

  recognition.onaudiostart = function() {
    console.log('Audio Start');
  };
  recognition.onspeechstart = function() {
    console.log('Speech Start');
  };
  recognition.onspeechend = function() {
    console.log('Speech End');
  }

  let lastStart = Date.now();
  recognition.onstart = function() {
    console.log('Start');
    lastStart = Date.now();
  }
  recognition.onend = function(e) {
    console.log('End');

    // Force continuous
    if (Date.now() - (lastStart + 1000) > 0) {
      recognition.start();
    }
  }

  recognition.onnomatch = function(event) {
    console.log('No Match');
  }

  recognition.onerror = function(event) {
    console.log('Error')
  }

  function toggle(type) {
    if (type === 'maxima') {
      document.body.style.transition = '0.5s ease-out filter';
      document.body.style.filter = 'brightness(2.5)';
    } else {
      websites.forEach(website => {
        if (window.location.host.indexOf(website.host) > -1) {
          if (website[type]) {
            document.body.style.filter = '';
            website[type]();
          }
        }
      });
    }
  }

  websites.forEach(website => {
    if (window.location.host.indexOf(website.host) > -1) {
      recognition.start();
    }
  });
}