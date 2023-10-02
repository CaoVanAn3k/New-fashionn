const waiting = async (time: number) => {
    return await new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
};
export default waiting;
