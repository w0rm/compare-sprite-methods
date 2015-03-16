// https://developers.google.com/web/fundamentals/performance/critical-rendering-path/measure-crp?hl=en
window.onload = function () {
    var performance = window.performance || window.webkitPerformance || window.msPerformance || window.mozPerformance;
    var stats = document.createElement('div');
    document.body.appendChild(stats);
    var t = performance && performance.timing;
    if (!t) {
        stats.textContent = 'Your browser doesn\'t support navigation timing api';
        return;
    }
    var interactive = t.domInteractive - t.domLoading;
    var dcl = t.domContentLoadedEventStart - t.domLoading;
    var complete = t.domComplete - t.domLoading;
    stats.textContent = 'interactive: ' + interactive + 'ms, ' +
                        'dcl: ' + dcl + 'ms, ' +
                        'complete: ' + complete + 'ms';
};
