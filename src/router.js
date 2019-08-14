const ANIMATION_TIMING = 150;

function makeRoute(id) {
  const element = document.getElementById(id);
  return {
    element,
    transitionIn() {
      return new Promise(
        res => {
          element.classList.remove('fadeOut');
          element.classList.add('fadeIn');
          setTimeout(() => {
            element.style.display = 'flex';
            res();
          }, ANIMATION_TIMING);
        });
    },
    transitionOut() {
      return new Promise(
        res => {
          document.querySelector('main').classList.remove('show-menu');

          element.classList.remove('fadeIn');
          element.classList.add('fadeOut');
          setTimeout(() => {
            element.style.display = 'none';
            res();
          }, ANIMATION_TIMING);
        });
    },
  };
}

const Router = {
  current: 0,
  routes: [
    makeRoute('home'),
    makeRoute('semigroup'),
    makeRoute('monoid'),
    makeRoute('functor'),
    makeRoute('applicative'),
    makeRoute('monad')
  ]
};

function initRouter() {
  const hash = window.location.hash;
  if (hash) {
    mountRouteByHash(hash.substr(1)).then(updateActiveLink.bind(null, hash));
  } else {
    Router.routes[0].transitionIn();
    updateActiveLink(Router.routes[0].element.getAttribute('href'));
  }
}

function swapRoute(index) {
  return Router.routes[Router.current]
    .transitionOut()
    .then(() => {
      Router.current = index;
    })
    .then(() => Router.routes[index].transitionIn());
}

function mountRouteByHash(hash) {
  const elementIndex = Router.routes.findIndex(
    route => route.element.id === hash);
  return ~elementIndex ? swapRoute(elementIndex) : Promise.resolve();
}

function nextRoute() {
  const next = Router.current + 1;
  return next < Router.routes.length
    ? Promise.resolve(Router.routes[next].element.id)
    : Promise.reject(new Error('Last route allowed.'));
}

function prevRoute() {
  const prev = Router.current - 1;
  return prev >= 0
    ? Promise.resolve(Router.routes[prev].element.id)
    : Promise.reject(new Error('Last route allowed.'));
}

let __ANIMATING__ = false;

function animateRoute(asyncFunc) {
  __ANIMATING__ = true;
  return new Promise(
    res => {
      window.requestAnimationFrame(() => {
        res(asyncFunc().then(() => {
          __ANIMATING__ = false;
        }));
      });
    });
}

window.addEventListener('keydown', function(event) {
  if (!__ANIMATING__) {
    switch (event.code) {
      case 'ArrowRight':
        nextRoute().then(
          hash => {
            window.location.hash = hash;
          }).catch(
          e => console.log(e.message));
        break;
      case 'ArrowLeft':
        prevRoute().then(
          hash => {
            window.location.hash = hash;
          }).catch(
          e => console.log(e.message));
        break;
    }
  }
});

// window.addEventListener('mousewheel', function(event) {
//   if (!__ANIMATING__) {
//     if (event.wheelDelta > 0) {
//       prevRoute().then(
//         hash => {
//           window.location.hash = hash;
//         }).catch(
//         e => console.log(e.message));
//     } else {
//       nextRoute().then(
//         hash => {
//           window.location.hash = hash;
//         }).catch(
//         e => console.log(e.message));
//     }
//   }
// });

function updateActiveLink(hash) {
  document
    .querySelectorAll('.nav__link')
    .forEach(
      link => {
        link.classList.remove('nav__link--active');
        if (link.getAttribute('href') === hash) {
          link.classList.add('nav__link--active');
        }
      });
}

window.addEventListener('hashchange', function() {
  const hash = window.location.hash;
  animateRoute(mountRouteByHash.bind(null, hash.substr(1)))
    .then(updateActiveLink.bind(null, hash));
});
