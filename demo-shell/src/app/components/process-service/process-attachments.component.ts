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

import { Component, Input, OnChanges, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
    ProcessAttachmentListComponent,
    ProcessInstance,
    ProcessService,
    ProcessUploadService
} from '@alfresco/adf-process-services';
import { AlfrescoApiService, AppConfigService } from '@alfresco/adf-core';
import { DiscoveryApiService, UploadService } from '@alfresco/adf-content-services';
import { PreviewService } from '../../services/preview.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * Provide a factory for process upload service
 *
 * @param api api client
 * @param config config service
 * @param discoveryApiService discovery service
 * @returns factory function
 */
export function processUploadServiceFactory(api: AlfrescoApiService, config: AppConfigService, discoveryApiService: DiscoveryApiService) {
    return new ProcessUploadService(api, config, discoveryApiService);
}

@Component({
    selector: 'app-process-attachments',
    templateUrl: './process-attachments.component.html',
    styleUrls: ['./process-attachments.component.css'],
    providers: [
        {
            provide: UploadService,
            useFactory: (processUploadServiceFactory),
            deps: [AlfrescoApiService, AppConfigService, DiscoveryApiService]
        }
    ],
    encapsulation: ViewEncapsulation.None
})

export class ProcessAttachmentsComponent implements OnInit, OnChanges, OnDestroy {

    @ViewChild('processAttachList')
    processAttachList: ProcessAttachmentListComponent;

    @Input()
    processInstanceId: string;

    processInstance: ProcessInstance;

    private onDestroy$ = new Subject<boolean>();

    constructor(
        private uploadService: UploadService,
        private processService: ProcessService,
        private preview: PreviewService
    ) {}

    ngOnInit() {
        this.uploadService.fileUploadComplete
            .pipe(takeUntil(this.onDestroy$))
            .subscribe(value => this.onFileUploadComplete(value.data));
    }

    ngOnChanges() {
        if (this.processInstanceId) {
            this.processService.getProcess(this.processInstanceId)
                .subscribe((processInstance: ProcessInstance) => {
                this.processInstance = processInstance;
            });
        }
    }

    ngOnDestroy() {
        this.onDestroy$.next(true);
        this.onDestroy$.complete();
    }

    onFileUploadComplete(content: any) {
        this.processAttachList.add(content);
    }

    onAttachmentClick(content: any): void {
        this.preview.showBlob(content.name, content.contentBlob);
    }

    isCompletedProcess(): boolean {
        return this.processInstance?.ended != null;
    }

}
