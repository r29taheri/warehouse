import { FormControl } from '@angular/forms';

export function quantityChecker(control: FormControl) {
    if(/^[0-9]*$/.test(control.value)) {
        return null;
    }
    return {
        error: 'Number is not valid'
    };
}

