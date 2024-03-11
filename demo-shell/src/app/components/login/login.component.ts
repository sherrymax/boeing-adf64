/*!
 * @license
 * Copyright © 2005-2023 Hyland Software, Inc. and its affiliates. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, ViewEncapsulation } from '@angular/core';
import { StorageService } from '@alfresco/adf-core';
import { StyleManager } from './style-manager';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LoginComponent {

    constructor(
        private router: Router,
        private storageService: StorageService,
        private styleManager: StyleManager
        ) {
    }

    setDefaultTheme(){
        var theme = '{"primary":"#2196f3","accent":"#ff9800","name":"ECM Blue Orange","href":"adf-blue-orange.css","isDark":false}';
        this.storageService.setItem("docs-theme-storage-current", theme);
        this.styleManager.setStyle('theme',JSON.parse(theme).href);

        console.log('*** THEME SET ***');
    }

    onLogin() {
        // this.getUserRoles();
        // this.router.navigate(['/home']);
        this.router.navigate(['/boeing-network']);
        this.setDefaultTheme();
        // this.router.navigate(['/files']);
        console.dir(this);
    }
}
