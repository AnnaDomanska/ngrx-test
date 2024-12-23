import { Directive } from "@angular/core";
import { AbstractControl, ValidationErrors, Validator } from "@angular/forms";

@Directive({
    selector: 'passwordValidator'
})
export class PasswordValidator implements Validator {
    validate(control: AbstractControl): ValidationErrors | null {
        throw new Error("Method not implemented.");
    }
    registerOnValidatorChange?(fn: () => void): void {
        throw new Error("Method not implemented.");
    }

}