import { Component, OnInit } from '@angular/core';
import { WidgetComponent } from '@alfresco/adf-core';
import { TextWithValidationService } from './text-with-validation.service';

@Component({
  selector: 'app-text-with-validation',
  templateUrl: './text-with-validation.component.html',
  styleUrls: ['./text-with-validation.component.scss'],
  providers: [TextWithValidationService]
})
export class TextWithValidationComponent extends WidgetComponent implements OnInit {

  textFieldDisplayValue: string;
  fieldLabel: string;
  fieldID: string;
  isValidated = false;

  constructor(private validationService: TextWithValidationService) {
    super();
  }

  ngOnInit() {
    console.dir(this.field);
    this.textFieldDisplayValue = this.field.params.customProperties.displayValue.value;
    this.fieldLabel = this.field.name;
    this.fieldID = this.field.id;
  }

  validateText_old() {
    // this.field.value = "_JIMMY";

    console.log("Invoked VALIDATION >>> ", this.textFieldDisplayValue);
    this.isValidated = true;
    // this.field.params.customProperties.displayValue.value = this.textFieldDisplayValue;
    // this.field.params.customProperties.displayValue.setProperty("value", this.textFieldDisplayValue);
    this.field.value = this.textFieldDisplayValue;
    // this.field.set("value", "JAMES");
    // this.field["value"] = "JAMES";
  }

  validateText() {
    console.log("VALIDATION SERVICE Invoked by "+this.field.id+" >>> ", this.textFieldDisplayValue);
    this.field.value = this.textFieldDisplayValue;
    this.isValidated = this.validationService.isSuccess(this, this.textFieldDisplayValue);
  }

  ngOnDestroy(){
    this.field.value = this.textFieldDisplayValue;
  }


}