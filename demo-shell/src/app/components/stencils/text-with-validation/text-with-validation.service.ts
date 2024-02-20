import { Injectable } from '@angular/core';

@Injectable()
export class TextWithValidationService {

    constructor() {
    }

    isSuccess(_this, fieldValue: string){
        return this.validationRule(fieldValue);
    }

    validationRule(fieldValue: string){
        return (fieldValue != "");
    }
}
