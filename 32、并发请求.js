function concurRequest(urls, maxNum) {
    return new Promise((resolve) => {
        if (urls.length === 0) {
            resolve([]);
        }
        const results = [];
        let indes = 0;
        let counts = 0;
        // 发送请求
        async function request() {
            if (indes === maxNum) {
                return;
            }
            const i = indes;
            const url = urls[indes];
            indes++;
            try {
                const resp = await fetch(url);
                results[i] = resp;
            } catch (error) {
                results[i] = error;
            } finally {
                counts++;
                if (counts === urls.length) {
                    console.log('over');
                    resolve(results);
                }
                request();
            }
        }

        const times = Math.max(maxNum, urls.length);
        for (let index = 0; index < times; index++) {
            request();
        }
    })
}