initRouter();

document
  .querySelector('#navTrigger')
  .addEventListener('click', () => {
    const activeClass = 'show-menu';
    const main = document.querySelector('.main');
    main.classList.toggle(activeClass);
  });
