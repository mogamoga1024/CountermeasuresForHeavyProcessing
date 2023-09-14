
onmessage = function(e) {
    const max = e.data;
    let sum = 0;
    let prevProgressRate = -1;

    for (let i = 1; i <= max; i++) {
        sum += i;

        const progressRate = Math.floor(i / max * 100);
        if (progressRate > prevProgressRate) {
            prevProgressRate = progressRate;
            postMessage({progressRate, sum});
        }
    }
};
