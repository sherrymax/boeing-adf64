import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { NewLineStencilComponent } from './new-line-stencil/new-line-stencil.component';
// import { IframeStencilComponent } from './iframe-stencil/iframe-stencil.component';
import { JSONViewerStencilComponent } from './json-viewer-stencil/json-viewer-stencil.component';
// import { AddressLokupStencilComponent } from './address-lookup-stencil/address-lookup-stencil.component';
// import { DocumentViewerStencilComponent } from './document-viewer-stencil/document-viewer-stencil.component';
// import { DocumentViewAndSignStencilComponent } from './document-view-and-sign-stencil/document-view-and-sign-stencil.component';
// import { CaseCommentsHistoryStencilComponent } from './case-comments-history-stencil/case-comments-history-stencil.component';
// import { WarningStencilComponent } from './warning-stencil/warning-stencil.component';
// import { RichtextEditorStencilComponent } from './richtext-editor-stencil/richtext-editor-stencil.component';
// import { TinyEditorComponent } from './richtext-editor-stencil/tiny-editor.component';
import { ImageWithHyperlinkStencilComponent } from './image-with-hyperlink-stencil/image-with-hyperlink-stencil';
// import { ChartStencilComponent } from './chart-stencil/chart-stencil.component';
// import { ChartStencilDialogComponent } from './chart-stencil/chart-stencil-dialog.component';
// import { AdvancedGridStencilComponent } from './advanced-grid-stencil/advanced-grid-stencil.component';
// import { EmailStencilComponent } from './email-stencil/email-stencil.component';
// import { EmailStencilDialogComponent } from './email-stencil/email-stencil-dialog.component';
// import { ScannerComponent } from './scanner-stencil/scanner.component';
// import { ButtonStencilComponent } from './button-stencil/button-stencil.component';
import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';
// import {
//     MatTableModule, MatPaginatorModule, MatSortModule,
//     MatFormFieldModule, MatInputModule, MatIconModule,
//     MatDialogModule, MatButtonModule
// } from '@angular/material';
// import { ChartsModule } from 'ng2-charts';
// import { DataTableModule } from '@alfresco/adf-core';
// import { FlexLayoutModule } from '@angular/flex-layout';
// import { NgxJsonViewerModule } from 'ngx-json-viewer';
// import { DocumentListModule } from '@alfresco/adf-content-services';
// import { ViewerModule, CoreModule } from '@alfresco/adf-core';
// import { DataColumnModule } from '@alfresco/adf-core';
// import { UploadModule } from '@alfresco/adf-content-services';
// import { ContentModule } from '@alfresco/adf-content-services';
// import { SignaturePadModule } from 'angular2-signaturepad';
// import { AEVStencilComponent } from './file-view-aev/alfresco-enterprise-viewer.component';
// import { CustomStencilDialogComponent } from './custom-stencil-dialog/custom-stencil-dialog.component';
import { TextWithValidationComponent } from './text-with-validation/text-with-validation.component';

import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { SignaturePadStencilComponent } from './signature-pad-stencil/signature-pad-stencil.component';
import { SignatureViewerStencilComponent } from './signature-viewer-stencil/signature-viewer-stencil.component';
import { AccountNumberWithValidationComponent } from './account-number-with-validation/account-number-with-validation.component';

@NgModule({
    declarations: [
        // NewLineStencilComponent,
        // IframeStencilComponent,
        JSONViewerStencilComponent,
        // AddressLokupStencilComponent,
        // DocumentViewerStencilComponent,
        // DocumentViewAndSignStencilComponent,
        // CaseCommentsHistoryStencilComponent,
        // AEVStencilComponent,
        // CustomStencilDialogComponent,
        TextWithValidationComponent,
        // WarningStencilComponent,
        // TinyEditorComponent,
        // RichtextEditorStencilComponent,
        ImageWithHyperlinkStencilComponent,
        SignaturePadStencilComponent,
        SignatureViewerStencilComponent,
        AccountNumberWithValidationComponent,
        // ChartStencilComponent,
        // ChartStencilDialogComponent,
        // AdvancedGridStencilComponent,
        // EmailStencilComponent,
        // EmailStencilDialogComponent,
        // ScannerComponent,
        // ButtonStencilComponent
    ],
    exports: [
        // NewLineStencilComponent,
        // IframeStencilComponent,
        JSONViewerStencilComponent,
        // AddressLokupStencilComponent,
        // DocumentViewerStencilComponent,
        // DocumentViewAndSignStencilComponent,
        // CaseCommentsHistoryStencilComponent,
        TextWithValidationComponent,
        // WarningStencilComponent
        // TinyEditorComponent,
        // RichtextEditorStencilComponent,
        ImageWithHyperlinkStencilComponent,
        // ChartStencilComponent,
        // ChartStencilDialogComponent,
        // AdvancedGridStencilComponent,
        // EmailStencilComponent,
        // EmailStencilDialogComponent,
        // ScannerComponent,
        // ButtonStencilComponent
    ],
    imports: [
        // MatTableModule,
        // MatPaginatorModule,
        // MatSortModule,
        // MatFormFieldModule,
        // MatInputModule,
        CommonModule,
        // MatIconModule,
        // MatDialogModule,
        // MatButtonModule,
        FormsModule,
        // ChartsModule,
        // DataTableModule,
        // FlexLayoutModule,
        // RouterModule,
        // NgxJsonViewerModule,
        // DocumentListModule,
        // ViewerModule,
        // DataColumnModule,
        // UploadModule,
        // ContentModule,
        // CoreModule,
        // SignaturePadModule,
        NgxJsonViewerModule
    ],
    entryComponents: [
        // NewLineStencilComponent,
        // IframeStencilComponent,
        JSONViewerStencilComponent,
        // AddressLokupStencilComponent,
        // DocumentViewerStencilComponent,
        // DocumentViewAndSignStencilComponent,
        // CaseCommentsHistoryStencilComponent,
        // CustomStencilDialogComponent,
        TextWithValidationComponent,
        // WarningStencilComponent
        // TinyEditorComponent,
        // RichtextEditorStencilComponent,
        ImageWithHyperlinkStencilComponent,
        // ChartStencilComponent,
        // ChartStencilDialogComponent,
        // AdvancedGridStencilComponent,
        // EmailStencilComponent,
        // EmailStencilDialogComponent,
        // ScannerComponent,
        // ButtonStencilComponent
    ]
})

export class StencilModule { }
