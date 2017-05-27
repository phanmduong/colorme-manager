/**
 * Created by phanmduong on 5/27/17.
 */

export function dotNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}