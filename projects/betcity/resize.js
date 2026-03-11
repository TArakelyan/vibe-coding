let lastHeight = null;

const resize = ({force = false}) => {
    const widget = document.querySelector('.bundes-predictor-container');
    const currentHeight = widget ? widget.offsetHeight + 10 : 150;
    
    // Проверяем изменения только если это не первый вызов
    if (lastHeight !== null && !force && Math.abs(currentHeight - lastHeight) < 2) {
      return; // Игнорируем незначительные изменения
    }
    
    lastHeight = currentHeight;
    
    const dataUTILS = {
      for: 'BASIC_TEST',
      action: 'resizeIframe',
      selector: `iframe[src*="dumpster.cdn.sports.ru"]`,
      sizes: {
        height: currentHeight,
      },
    };

    window?.top?.postMessage(JSON.stringify(dataUTILS), '*');
  }

const resizeObserver = new ResizeObserver(() => {
  resize({});
});
resizeObserver.observe(document.body);
resize({force: true});

setTimeout(() => {
  resize({force: true});
}, 1000);

setTimeout(() => {
  resize({force: true});
}, 2000);

setTimeout(() => {
  resize({force: true});
}, 3000);

setTimeout(() => {
  resize({force: true});
}, 5000);

setTimeout(() => {
  resize({force: true});
}, 7000);
