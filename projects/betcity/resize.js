let lastHeight = null;

const resize = ({force = false}) => {
    const widget = document.querySelector('.bundes-predictor-container');
    if (!widget) return;
    
    // Получаем точную высоту виджета
    const rect = widget.getBoundingClientRect();
    const currentHeight = Math.ceil(rect.height) + 2; // +2px запас
    
    if (lastHeight !== null && !force && Math.abs(currentHeight - lastHeight) < 2) {
        return;
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

const container = document.querySelector('.bundes-predictor-container');
if (container) {
    resizeObserver.observe(container);
}

resize({force: true});

setTimeout(() => resize({force: true}), 100);
setTimeout(() => resize({force: true}), 300);
setTimeout(() => resize({force: true}), 500);
setTimeout(() => resize({force: true}), 1000);
