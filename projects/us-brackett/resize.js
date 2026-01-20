// Resize script for US Open Draws Clone
let lastHeight = null;
let resizeTimeout;

const resize = ({force = false}) => {
    const currentHeight = document.body.scrollHeight;
    
    // Проверяем изменения только если это не первый вызов
    if (lastHeight !== null && !force && Math.abs(currentHeight - lastHeight) < 2) {
        return; // Игнорируем незначительные изменения
    }
    
    lastHeight = currentHeight;
    
    const dataUTILS = {
        for: 'BASIC_TEST',
        action: 'resizeIframe',
        selector: `iframe[src*="netlify.app"]`,
        sizes: {
            height: 2 * Math.floor(currentHeight / 2) + 10,
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

