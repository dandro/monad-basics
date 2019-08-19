initRouter();

document
  .querySelector('#navTrigger')
  .addEventListener('click', () => {
    const activeClass = 'show-menu';
    const main = document.querySelector('.main');
    main.classList.toggle(activeClass);
  });

document
  .querySelector('#adjustFontSize')
  .addEventListener('change',
    e => {
      const nextFontSize = e.target.value;
      document
        .querySelectorAll('.paragraph')
        .forEach(
          element => {
            console.log(element);
            element.style.fontSize = `${nextFontSize}px`;
            console.log(nextFontSize);
          });
    });

document
  .querySelector('#adjustReadMode')
  .addEventListener('change', () => {
    document.body.classList.toggle('readMode');
  });
