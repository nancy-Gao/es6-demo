// promise.all
// 1.接收数组或是iterator对象
// 2.如果元素不是promise 通过promise.resolve转为promise
// 3.所有状态都为fulfilled才返回所有的结果数组，否则rejected
const promiseAl = (promises)=> {
    if(!promises[Symbol.iterator]) {
        return;
    }
    let resolvedCount = 0;
    let arrPromise = Array.from(promises);
    let promiseLen = arrPromise.length;
    let results = [];
    return new Promise((resolve, reject) => {
        arrPromise.forEach(item => {
            Promise.resolve(item).then(res=> {
                resolvedCount++;
                results.push(res);
                if(resolvedCount >= promiseLen) {
                    resolve(results)
                }
            }).catch(err=> {
                reject(err)
            })
        })
    })
}
// const promises = '';
// const promises = [1, 2, 3];
const promises = [Promise.resolve('1'), Promise.reject('ss'), 3];
promiseAl(promises).then(res=> {
    console.log(res, 'success')
}).catch(err=> {
    console.log(err, 'error')
});
