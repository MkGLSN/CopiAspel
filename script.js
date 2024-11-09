(function(d) {
  var config = {
    kitId: "klp1kwm",
    scriptTimeout: 3000,
    async: true
  },
    h = d.documentElement,
    t = setTimeout(function() {
      h.className = h.className.replace(/\bwf-loading\b/g, "") + " wf-inactive";
    }, config.scriptTimeout),
    tk = d.createElement("script"),
    f = false,
    s = d.getElementsByTagName("script")[0],
    a;
  h.className += " wf-loading";
  tk.src = "https://use.typekit.net/" + config.kitId + ".js";
  tk.async = true;
  tk.onload = tk.onreadystatechange = function() {
    a = this.readyState;
    if (f || (a && a != "complete" && a != "loaded")) return;
    f = true;
    clearTimeout(t);
    try {
      Typekit.load(config);
    } catch (e) {}
  };
  s.parentNode.insertBefore(tk, s);
})(document);

var forEach = function(array, callback, scope) {
  for (var i = 0; i < array.length; i++) {
    callback.call(scope, i, array[i]); // passes back stuff we need
  }
};

document
  .getElementById("hamburgerContainer")
  .addEventListener("click", function() {
    document.getElementById("hamburger").classList.toggle("is-active");
  });

var controller = new ScrollMagic.Controller();

////////////
// Header //
////////////
var headerXlScene = new ScrollMagic.Scene({
  // triggerElement: ".features",
  duration: 200,
  offset: 10
});
var headerXlTimeline = new TimelineMax();
var headerXlTween1 = TweenMax.to("header", 1, {
  paddingTop: "10px",
  borderBottom: "solid rgba(255,255,255,.2) 1px",
  paddingBottom: "0"
});
var headerXlTween2 = TweenMax.to(".logo", 1, {
  height: 109 * 0.4 + "px",
  width: 329 * 0.4 + "px",
  marginBottom: "10px",
  marginTop: "4px"
});
var headerXlTween3 = TweenMax.to(".menu", 1, {
  marginTop: "13px"
});
headerXlTimeline.add(headerXlTween1).add(headerXlTween2).add(headerXlTween3);
headerXlScene
  .setTween(headerXlTimeline)
  .addIndicators({ name: "header (duration: 300)" })
  .addTo(controller);

//////////////////
// Header Color //
//////////////////
var headerColorScene = new ScrollMagic.Scene({
  triggerElement: ".interface-list",
  duration: 0
});
var headerColorTimeline = new TimelineMax();
var headerColorTween1 = TweenMax.to("header", 0.01, {
  className: "+=header-past-products",
  borderBottom: "solid rgba(0,0,0,0.1) 1px"
});
var headerColorTween2 = TweenMax.to(".escritorio", 0.01, {
  boxShadow: "none"
});
var headerColorTween3 = TweenMax.to(".hamburger .line", 0.01, {
  backgroundColor: "rgba(0,0,0,.6)"
});
headerColorTimeline
  .add(headerColorTween3)
  .add(headerColorTween1)
  .add(headerColorTween2);
headerColorScene
  .setTween(headerColorTimeline)
  .addIndicators({ name: "headerColor (duration: 0)" })
  .addTo(controller);

//////////////
// Products //
//////////////

function productScenes(arr) {
  let pos = 0;
  for (let obj of arr) {
    pos += 1;
    let currentScene = new ScrollMagic.Scene({
      triggerElement: "#trigger1",
      offset: window.innerHeight * (pos - 1) - window.innerHeight * 0.35,
      duration: "70%"
    })
      .setTween("body", {
        backgroundColor: obj.color
      })
      .addIndicators({ name: obj.name + " (duration: 70%)" })
      .addTo(controller);
    document.querySelector("." + obj.name + "-interface").onclick = function() {
      let objClass = "." + obj.name;
      controller.scrollTo(objClass);
      // TweenMax.to(window, 0.5, {scrollTo: {objClass}});
    };
  }
}
productScenes([
  {
    name: "sae",
    color: "rgba(147,42,48,1)"
  },
  {
    name: "coi",
    color: "rgba(58,140,155,1)"
  },
  {
    name: "noi",
    color: "rgbea(189,90,41,1)"
  },
  {
    name: "banco",
    color: "rgbea(84,121,39,1)"
  },
  {
    name: "espacio",
    color: "rgbea(102,185,225,1)"
  },
  {
    name: "caja",
    color: "rgbea(234,158,43,1)"
  },
  {
    name: "facture",
    color: "rgbea(99,56,41,1)"
  },
  {
    name: "prod",
    color: "rgbea(67,104,128,1)"
  }
]);

////////////////
// Parallaxes //
////////////////

function createParallaxScene(a, t, n) {
  return new ScrollMagic.Scene({
    triggerElement: t,
    triggerHook: "onEnter",
    offset: 0.5 * t.clientHeight,
    duration: function() {
      return 1 * t.clientHeight;
    }
  })
    .addTo(a)
    .on("progress", function(job) {
      window.requestAnimationFrame(function() {
        TweenMax.to(".parallax-element-" + n, 1, {
          y: 100 * -job.progress,
          overwrite: "all",
          ease: Power2.easeOut
        });
      });
    });
}

createParallaxScene(controller, document.querySelector(".sae"), "sae-1");
createParallaxScene(controller, document.querySelector(".sae"), "sae-2");
createParallaxScene(controller, document.querySelector(".sae"), "sae-3");
createParallaxScene(controller, document.querySelector(".sae"), "sae-4");