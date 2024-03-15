export const truncateMiddle = (str: string, maxLength: number) => {
    if (str.length <= maxLength) {
        return str;
    }

    const startLength = Math.ceil((maxLength - 3) / 2);
    const endLength = Math.floor((maxLength - 3) / 2);
    return (
        str.substring(0, startLength) + "..." + str.substring(str.length - endLength)
    );
}
