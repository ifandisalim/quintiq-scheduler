import {Injectable} from '@angular/core';

@Injectable()
export class UtilityService {

    constructor() {
    }

    /**
     * Check if item is inside array
     * @param item to check
     * @param array to check in
     * @returns boolean whether item is inside array
     */
    itemInArray(item, array): boolean {
        if (!array || array.length < 1) {
            return false;
        }

        const itemIndex = array.indexOf(item);
        return (itemIndex !== -1);
    }

    /**
     * Search an item inside array of objects by id
     * @param id of item
     * @param array to check in
     * @returns the index of item inside the array
     */
    getIndexOfItemById(id, array): number {
        if (!array || array.length < 1) {
            return null;
        }

        for (let i = 0; i < array.length; i++) {
            if (array[i].id === id) {
                return i;
            }
        }
    }
}
