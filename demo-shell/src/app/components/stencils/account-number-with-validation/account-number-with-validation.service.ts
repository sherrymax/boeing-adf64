import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { AppConfigService } from '@alfresco/adf-core';

@Injectable()
export class AccountNumberValidationService {
    appConfValues: any = {};
    currentCustomer: string = "";

    // Resolve HTTP using the constructor
    constructor(private http: HttpClient, private appConfig: AppConfigService) {
        this.currentCustomer = this.appConfig.get<string>('currentCustomer');
        this.appConfValues = this.appConfig.get<Map<string, any>>(this.currentCustomer);
    }

    isValidAccount(_this, accountNumber: string): Observable<any> {
        var queryUrl = this.appConfValues['ACCOUNTS_VALIDATOR_URL'] + '?number=' + accountNumber;
        return this.http.get(queryUrl)
            .pipe(map((res: any) => {
                if(res && res[0]){
                    res = res[0]['isValid'];
                    console.log('Response within service', res);
                    _this.isValidated = res;
                }else{
                    _this.isValidated = false;
                }
            }));

    }
}
