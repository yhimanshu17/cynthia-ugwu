const scroll = new LocomotiveScroll({
  el: document.querySelector('#main'),
  smooth: true,
})

var timeout

function circleskew() {
  var xscale = 1
  var yscale = 1

  var xprev = 0
  var yprev = 0

  window.addEventListener('mousemove', function (delts) {
    clearTimeout(timeout)
    xscale = gsap.utils.clamp(0.8, 1.2, delts.clientX - xprev)
    yscale = gsap.utils.clamp(0.8, 1.2, (delts.clientY = yprev))

    xprev = delts.clientX
    yprev = delts.clientY

    circlemousefollower(xscale, yscale)

    timeout = setTimeout(function () {
      document.querySelector(
        '#minicircle',
      ).style.transform = `translate(${delts.clientX}px, ${delts.clientY}px) scale(1,1)`
    }, 100)
  })
}

circleskew()

function circlemousefollower(xscale, yscale) {
  window.addEventListener('mousemove', function (delts) {
    document.querySelector(
      '#minicircle',
    ).style.transform = `translate(${delts.clientX}px, ${delts.clientY}px) scale(${xscale},${yscale})`
  })
}
function firstpageanim() {
  var t1 = gsap.timeline()

  t1.from('#nav', {
    y: '-10',
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  })
    .to('.boundingelem', {
      y: 0,
      ease: Expo.easeInOut,
      duration: 2,
      delay: -1,
      stagger: 0.2,
    })
    .from('#hfooter', {
      y: -10,
      opacity: 0,
      duration: 1.5,
      delay: -1,
      ease: Expo.easeInOut,
    })
}

circlemousefollower()
firstpageanim()

document.querySelectorAll('.elem').forEach(function (elem) {
  var rotate = 0
  var diffrot = 0

  elem.addEventListener('mouseleave', function (delts) {
    gsap.to(elem.querySelector('img'), {
      opacity: 0,
      ease: Power3,
      duration: 0.5,
    })
  })

  elem.addEventListener('mousemove', function (delts) {
    var diff = delts.clientY - elem.getBoundingClientRect().top
    diffrot = delts.clientX - rotate
    rotate = delts.clientX
    gsap.to(elem.querySelector('img'), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: delts.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 5),
    })
  })
})
