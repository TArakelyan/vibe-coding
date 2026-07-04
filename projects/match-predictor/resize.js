let lastHeight = null;

const resize = ({ force = false }) => {
  const currentHeight = document.body.scrollHeight;
  if (lastHeight !== null && !force && Math.abs(currentHeight - lastHeight) < 2) {
    return;
  }
  lastHeight = currentHeight;
  window?.top?.postMessage(
    JSON.stringify({
      for: "BASIC_TEST",
      action: "resizeIframe",
      selector: `iframe[src*="netlify.app"]`,
      sizes: { height: 2 * Math.floor(currentHeight / 2) + 10 },
    }),
    "*"
  );
};

const resizeObserver = new ResizeObserver(() => resize({}));
resizeObserver.observe(document.body);
resize({ force: true });
[1000, 2000, 3000, 5000, 7000].forEach((ms) =>
  setTimeout(() => resize({ force: true }), ms)
);
