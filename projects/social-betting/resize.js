let lastHeight = null; // null означает что это первый вызов
let resizeTimeout;

const resize = ({force = false}) => {
      const currentHeight = document.body.scrollHeight;
      
      // Отладка: показываем высоту в консоли
      console.log('Resize triggered:', {
        currentHeight,
        lastHeight,
        force,
        timestamp: new Date().toISOString()
      });
      
      // Проверяем изменения только если это не первый вызов
      if (lastHeight !== null && !force && Math.abs(currentHeight - lastHeight) < 2) {
        console.log('Resize skipped: minimal change');
        return; // Игнорируем незначительные изменения
      }
      
      lastHeight = currentHeight;
      
      // Принудительно устанавливаем минимальную высоту
      const finalHeight = Math.max(currentHeight, 1200);
      
      const dataUTILS = {
        for: 'BASIC_TEST',
        action: 'resizeIframe',
        selector: `iframe[src*="netlify.app"]`,
        sizes: {
          height: 2 * Math.floor(finalHeight / 2) + 10,
        },
      };

      console.log('Sending resize message:', dataUTILS);
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
}, 10000);

setTimeout(() => {
  resize({force: true});
}, 15000);

setTimeout(() => {
  resize({force: true});
}, 22000);