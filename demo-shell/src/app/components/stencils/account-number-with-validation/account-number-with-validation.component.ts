import { Component, OnInit } from '@angular/core';
import { WidgetComponent } from '@alfresco/adf-core';
import { AccountNumberValidationService } from './account-number-with-validation.service';
@Component({
  selector: 'account-number-with-validation',
  templateUrl: './account-number-with-validation.component.html',
  styleUrls: ['./account-number-with-validation.component.css'],
  providers: [AccountNumberValidationService]
})
export class AccountNumberWithValidationComponent extends WidgetComponent implements OnInit {

  fieldValue: string;
  fieldLabel: string;
  fieldID: string;
  isValidated = false;

  constructor(private validationService: AccountNumberValidationService) {
    super();
  }

  ngOnInit() {
    console.dir(this.field);
    this.fieldValue = this.field.value;
    this.fieldLabel = this.field.name;
    this.fieldID = this.field.id;
  }

  validateText() {
    console.log("VALIDATION SERVICE Invoked by "+this.field.id+" >>> ", this.fieldValue);
    this.field.value = this.fieldValue;
    this.validationService.isValidAccount(this, this.fieldValue).subscribe(res=>{
      console.log("Response >> ", res);
    });
  }

  ngOnDestroy(){
    this.field.value = this.fieldValue;
  }

}
