(function (window) {
  window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;



  const FRAME_RATE = 50;
  const PARTICLE_NUM = 10000; // Increased particle count for denser effect
  const RADIUS = Math.PI * 2;
  const CANVASWIDTH = 1500;
  const CANVASHEIGHT = 400;
  const CANVASID = 'canvas';

  let texts = ['KLIK DI MANA AJA :)','PAKAI LANDSCAPE MODE YA', 'HEHE :)', 'HALO REVI', 'TIDAK TERASA YA', 'TAHUN INI', 'UDAH HAMPIR BERAKHIR', 'DI AKHIR TAHUN INI', 'AKU ADA SESUATU UNTUKMU', 'AKU TAHU KAMU PASTI KESAL', 'AKU BENER BENER MINTA MAAF','BTW, TERIMA KASIH VI', 'UDAH PERNAH MAU BERBAGI PENGALAMAN', 'AKU BERSYUKUR BISA KENAL KAMU', 'BISA PERNAH DEKAT SAMA KAMU', 'TAPI, SEPERTINYA', 'BELUM SAATNYA', 'EHH...>','BTW, SEMANGAT YAA :)', 'AKU TAHU KOK', 'KAMU PASTI BISA VI', 'TAHUN DEPAN', 'BERJUANG SAMA-SAMA', 'HARAPANKU 2025', 'KITA BISA BERBINCANG SEPERTI DULU', 'DENGAN ALMAMATER MASING-MASING', 'I', 'HOPE', 'YOU', 'DO YOUR BEST', 'AND ALLAH BE WITH YOU','AKU RASA CUKUP SEKIAN', 'MAAFIN AKU YA', 'PERNAH BUAT KAMU NDAK NYAMAN', 'APABILA KESEMPATAN', 'MEMPERTEMUKAN KITA LAGI', 'AKU TIDAK AKAN LAGI', 'MENYIA-NYIAKAN ITU', 'CLICK TO TEXT ME'];

  let canvas,
    ctx,
    particles = [],
    quiver = true,
    text = texts[0],
    textIndex = 0,
    textSize = 50;

  function draw() {
    ctx.clearRect(0, 0, CANVASWIDTH, CANVASHEIGHT);
    ctx.fillStyle = 'rgb(255, 255, 255)';
    ctx.textBaseline = 'middle';
    ctx.fontWeight = 'bold';
    ctx.font = textSize + 'px \'SimHei\', \'Avenir\', \'Helvetica Neue\', \'Arial\', \'sans-serif\'';
    ctx.fillText(text, (CANVASWIDTH - ctx.measureText(text).width) * 0.51, CANVASHEIGHT * 0.25);

    let imgData = ctx.getImageData(0, 0, CANVASWIDTH, CANVASHEIGHT);

    ctx.clearRect(0, 0, CANVASWIDTH, CANVASHEIGHT);

    for (let i = 0, l = particles.length; i < l; i++) {
      let p = particles[i];
      p.inText = false;
    }
    particleText(imgData);

    window.requestAnimationFrame(draw);
  }

  function particleText(imgData) {
    var pxls = [];
    for (var w = CANVASWIDTH; w > 0; w -= 2) { // Adjusted for tighter arc
      for (var h = 0; h < CANVASHEIGHT; h += 2) { // Adjusted for tighter arc
        var index = (w + h * (CANVASWIDTH)) * 4;
        if (imgData.data[index] > 1) {
          pxls.push([w, h]);
        }
      }
    }

    var count = pxls.length;
    var j = parseInt((particles.length - pxls.length) / 2, 10);
    j = j < 0 ? 0 : j;

    for (var i = 0; i < pxls.length && j < particles.length; i++, j++) {
      try {
        var p = particles[j],
          X,
          Y;

        if (quiver) {
          X = (pxls[i - 1][0]) - (p.px + Math.random() * 10);
          Y = (pxls[i - 1][1]) - (p.py + Math.random() * 10);
        } else {
          X = (pxls[i - 1][0]) - p.px;
          Y = (pxls[i - 1][1]) - p.py;
        }
        var T = Math.sqrt(X * X + Y * Y);
        var A = Math.atan2(Y, X);
        var C = Math.cos(A);
        var S = Math.sin(A);
        p.x = p.px + C * T * p.delta;
        p.y = p.py + S * T * p.delta;
        p.px = p.x;
        p.py = p.y;
        p.inText = true;
        p.fadeIn();
        p.draw(ctx);
      } catch (e) {}
    }
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      if (!p.inText) {
        p.fadeOut();

        var X = p.mx - p.px;
        var Y = p.my - p.py;
        var T = Math.sqrt(X * X + Y * Y);
        var A = Math.atan2(Y, X);
        var C = Math.cos(A);
        var S = Math.sin(A);

        p.x = p.px + C * T * p.delta / 2;
        p.y = p.py + S * T * p.delta / 2;
        p.px = p.x;
        p.py = p.y;

        p.draw(ctx);
      }
    }
  }

  function setDimensions() {
    // Centering the canvas
    canvas.width = CANVASWIDTH;
    canvas.height = CANVASHEIGHT;
    canvas.style.position = 'absolute';
    canvas.style.left = '50%';
    canvas.style.top = '50%';
    canvas.style.transform = 'translate(-50%, -50%)'; // Centers the canvas
    canvas.style.zIndex = '10';
  }

  function event() {
    document.addEventListener('click', function (e) {
      document.querySelector('.song').play();
      textIndex++;
      if (textIndex >= texts.length) {
        textIndex--;
        return;
      }
      text = texts[textIndex];
      if (textIndex === texts.length - 1) {
        showSweetAlert(); // Show SweetAlert when final text is displayed
      }
      console.log(textIndex);
    }, false);

    document.addEventListener('touchstart', function (e) {
      textIndex++;
      if (textIndex >= texts.length) {
        textIndex--;
        return;
      }
      text = texts[textIndex];
      if (textIndex === texts.length - 1) {
        showSweetAlert(); // Show SweetAlert when final text is displayed
      }
      console.log(textIndex);
    }, false);
  }

  function showSweetAlert() {
    Swal.fire({
      html: `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 25px; background-color: #fff; border-radius: 15px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); width: 100%; max-width: 400px; font-family: 'Roboto', sans-serif; font-size: 16px;">
          <p style="font-size: 20px; font-weight: bold; color: #333; margin-bottom: 20px; text-align: center; font-family: 'Roboto', sans-serif;">KIRIM PESAN</p>
          <textarea id="message" rows="4" style="width: 100%; padding: 12px; font-size: 14px; font-weight: normal; border: 1px solid #ccc; border-radius: 8px; resize: none; box-sizing: border-box; font-family: 'Roboto', sans-serif; margin-bottom: 15px;"></textarea>
          <button id="sendToWhatsApp" style="padding: 12px 18px; font-size: 14px; font-weight: bold; color: white; background-color: rgb(0, 140, 255); border: none; border-radius: 50px; cursor: pointer; width: 100%; max-width: 150px; font-family: 'Roboto', sans-serif; margin-top: 10px; transition: background-color 0.3s ease; text-transform: uppercase;">
            Send
          </button>
        </div>
      `,
      showConfirmButton: false,
      allowOutsideClick: false,  // Disable clicking outside the alert to close it
      background: 'rgba(0, 0, 0, 0.1)',
      customClass: {
        popup: 'swal2-elegant',
      },
      didOpen: () => {
        const button = document.getElementById('sendToWhatsApp');
        button.addEventListener('click', () => {
          // Change button color to grey when clicked
          button.style.backgroundColor = '#808080';
    
          const message = document.getElementById('message').value.trim();
          if (message) {
            const whatsappURL = `https://wa.me/6285608107170?text=${encodeURIComponent(message)}`;
            window.open(whatsappURL, '_blank');
          } else {
            Swal.fire({
              title: 'Pesan Kosong!',
              text: 'Mohon isi pesan sebelum mengirim.',
              icon: 'warning',
              confirmButtonText: 'OK',
              background: '#f9f9f9',
              width: '500px',  // Increased width for landscape style
              padding: '20px', // Adjust padding for landscape appearance
              customClass: {
                popup: 'swal2-landscape', // Custom class for landscape style
              },
            }).then(() => {
              // Reopen the initial SweetAlert
              showSweetAlert();
            });
          }
        });
      },
    });
  }
  
  
  
  
  
  
  

  function init() {
    canvas = document.getElementById(CANVASID);
    if (canvas === null || !canvas.getContext) {
      return;
    }
    ctx = canvas.getContext('2d');
    setDimensions();
    event();

    for (var i = 0; i < PARTICLE_NUM; i++) {
      particles[i] = new Particle(canvas);
    }

    draw();
  }

  class Particle {
    constructor(canvas) {
      let spread = canvas.height;
      let size = Math.random() * 1.2;

      this.delta = 0.06;

      this.x = 0;
      this.y = 0;

      this.px = Math.random() * canvas.width;
      this.py = (canvas.height * 0.5) + ((Math.random() - 0.5) * spread);

      this.mx = this.px;
      this.my = this.py;

      this.size = size;

      this.inText = false;

      this.opacity = 0;
      this.fadeInRate = 0.005;
      this.fadeOutRate = 0.03;
      this.opacityTresh = 0.98;
      this.fadingOut = true;
      this.fadingIn = true;
    }

    fadeIn() {
      this.fadingIn = this.opacity > this.opacityTresh ? false : true;
      if (this.fadingIn) {
        this.opacity += this.fadeInRate;
      } else {
        this.opacity = 1;
      }
    }

    fadeOut() {
      this.fadingOut = this.opacity < 0 ? false : true;
      if (this.fadingOut) {
        this.opacity -= this.fadeOutRate;
        if (this.opacity < 0) {
          this.opacity = 0;
        }
      } else {
        this.opacity = 0;
      }
    }

    draw(ctx) {
      ctx.fillStyle = 'rgba(226,225,142, ' + this.opacity + ')';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, RADIUS, true);
      ctx.closePath();
      ctx.fill();
    }
  }

  var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  if (!isChrome) {
    $('#iframeAudio').remove();
  }

  init();
})(window);
(function() {
  // Disable Right Click
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
  });

  // Disable F12 and other Developer Tools shortcuts (Ctrl+Shift+I, F12, etc.)
  document.onkeydown = function(e) {
    if (e.keyCode == 123 || (e.ctrlKey && e.shiftKey && e.keyCode == 73)) {
      return false;
    }
  };

  // Prevent console access
  (function() {
    var noop = function() {};
    Object.defineProperty(window, 'console', {
      value: {
        log: noop,
        warn: noop,
        error: noop,
        info: noop,
        debug: noop,
        assert: noop,
        clear: noop,
        count: noop,
        dir: noop,
        dirxml: noop,
        group: noop,
        groupCollapsed: noop,
        groupEnd: noop,
        time: noop,
        timeEnd: noop,
        trace: noop,
        table: noop
      }
    });
  })();

  // Check if Developer Tools are open (by checking window dimensions)
  setInterval(function() {
    if (window.outerWidth - window.innerWidth > 100 || window.outerHeight - window.innerHeight > 100) {
      location.reload();
    }
  }, 1000);

})();