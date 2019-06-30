import { FormControl } from '@angular/forms';

export function codeChecker(control: FormControl) {
    if(control.value) {
        const code = control.value.toUpperCase();
        if(/^[A-Z]{2,4}\s[0-9]{4,6}$/.test(code)) {
            return null;
        }
        return {
            error: 'Code is not valid'
        };
    }
}