let lastHeight = null;

const resize = ({force = false}) => {
    const widget = document.querySelector('.bundes-predictor-container');
    if (!widget) return;
    
    const currentHeight = Math.ceil(widget.getBoundingClientRect().height);
    
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
resizeObserver.observe(document.body);

resize({force: true});

setTimeout(() => resize({force: true}), 100);
setTimeout(() => resize({force: true}), 500);
setTimeout(() => resize({force: true}), 1000);
setTimeout(() => resize({force: true}), 2000);
