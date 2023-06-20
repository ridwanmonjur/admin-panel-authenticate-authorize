export function roundOff(a){
    return a.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 });

}