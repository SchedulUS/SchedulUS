/**
 * Donne la date d'aujourd'hui sous forme ISO.
 * @returns 
 */
export function TodayISO() : string {
    return DateInISO(new Date())
}
/**
 * Donne la date sous la forme ISO (ex.: 2018-11-01)
 * @param date 
 * @returns 
 */
export function DateInISO(date:Date) : string {
    //Adds a zero before the digit if the number is below 10
    const conv = function(num:number) {
      return (num < 10 ? '0' : '') + num;
    };
    return date.getFullYear() +
      '-' + conv(date.getMonth() + 1) +
      '-' + conv(date.getDate())
}
