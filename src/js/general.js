const generalFn = function () {
    const height = window.innerHeight;
    const $headerNav = document.getElementById('headerNav');
    let menuHeight = 0;
    if ($headerNav) {
        menuHeight = $headerNav.offsetHeight;
    }

    document.querySelectorAll('.mHeight100').forEach(function (el) {
        el.style.minHeight = `${height - menuHeight}px`;
    });
};
export default generalFn;
