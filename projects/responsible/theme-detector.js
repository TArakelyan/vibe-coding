// Страница всегда в Camp-палитре из styles.css.
// Системная тема не должна перебивать background/color на body.
(function () {
    function clearBodyOverrides() {
        document.body.style.removeProperty('background');
        document.body.style.removeProperty('color');
    }

    clearBodyOverrides();

    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', clearBodyOverrides);
    }
})();
