const ANIMATION_TIMING = 500;

function makeRoute(id) {
  const element = document.getElementById(id);
  return {
    element,
    transitionIn() {
      return new Promise(
        res => {
          element.style.display = 'block';
          element.style.opacity = '1';
          setTimeout(res, ANIMATION_TIMING);
        });
    },
    transitionOut() {
      return new Promise(
        res => {
          element.style.display = 'none';
          element.style.opacity = '0';
          setTimeout(res, ANIMATION_TIMING);
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
  const hash = window.location.hash.substr(1);
  if (hash) {
    mountRouteByHash(hash);
  } else {
    Router.routes[0].transitionIn();
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

function nextRoute() {
  const next = Router.current + 1;
  return next < Router.routes.length ? swapRoute(next) : Promise.resolve();
}

function prevRoute() {
  const prev = Router.current - 1;
  return prev >= 0 ? swapRoute(prev) : Promise.resolve();
}

function mountRouteByHash(hash) {
  const elementIndex = Router.routes.findIndex(
    route => route.element.id === hash);
  return ~elementIndex ? swapRoute(elementIndex) : Promise.resolve();
}

let __ANIMATING__ = false;

function animateRoute(asyncFunc) {
  __ANIMATING__ = true;
  window.requestAnimationFrame(() => {
    asyncFunc().then(() => {
      __ANIMATING__ = false;
    });
  });
}

window.addEventListener('keydown', function(event) {
  if (!__ANIMATING__) {
    switch (event.code) {
      case 'ArrowDown':
        animateRoute(nextRoute);
        break;
      case 'ArrowUp':
        animateRoute(prevRoute);
        break;
    }
  }
});

window.addEventListener('mousewheel', function(event) {
  if (!__ANIMATING__) {
    if (event.wheelDelta > 0) {
      animateRoute(prevRoute);
    } else {
      animateRoute(nextRoute);
    }
  }
});

window.addEventListener('hashchange', function() {
  animateRoute(mountRouteByHash.bind(null, window.location.hash.substr(1)));
});
