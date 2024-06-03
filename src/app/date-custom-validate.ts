import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateRangeValidator(publishDateKey: string, closingDateKey: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const publishDate = control.get(publishDateKey)?.value;
    const closingDate = control.get(closingDateKey)?.value;

    if (publishDate && closingDate && new Date(closingDate) > new Date(publishDate)) {
      return { dateRangeInvalid: true };
    }

    return null;
  };
}