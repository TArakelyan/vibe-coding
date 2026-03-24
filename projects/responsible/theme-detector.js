// Виджет всегда в светлой палитре из CSS. Системная тёмная тема не должна
// задавать color/background на body — иначе светлый текст наследуется на блоках #f4f4f4.
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
