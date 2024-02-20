import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
// import { FormRenderingService, FormFieldModel, NotificationService } from '@alfresco/adf-core';
import { FormRenderingService } from '@alfresco/adf-core';


import { JSONViewerStencilComponent } from '../stencils/json-viewer-stencil/json-viewer-stencil.component';
import { ImageWithHyperlinkStencilComponent } from '../stencils/image-with-hyperlink-stencil/image-with-hyperlink-stencil';
import { TextWithValidationComponent } from '../stencils/text-with-validation/text-with-validation.component';
import { AccountNumberWithValidationComponent } from '../stencils/account-number-with-validation/account-number-with-validation.component';
import { SignaturePadStencilComponent } from '../stencils/signature-pad-stencil/signature-pad-stencil.component';
import { SignatureViewerStencilComponent } from '../stencils/signature-viewer-stencil/signature-viewer-stencil.component';

@Component({
  selector: 'task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {


  taskId: string;

  constructor(private route: ActivatedRoute, 
              private router: Router, 
              private formRenderingService: FormRenderingService
              ) {

    this.formRenderingService.setComponentTypeResolver('json_viewer', () => JSONViewerStencilComponent, true);
    this.formRenderingService.setComponentTypeResolver('image_with_hyperlink', () => ImageWithHyperlinkStencilComponent, true);
    
    this.formRenderingService.setComponentTypeResolver('text_with_validation', () => TextWithValidationComponent, true);
    this.formRenderingService.setComponentTypeResolver('account_number_with_validation', () => AccountNumberWithValidationComponent, true);

    this.formRenderingService.setComponentTypeResolver('signature', () => SignaturePadStencilComponent, true);
    this.formRenderingService.setComponentTypeResolver('signatureviewer', () => SignatureViewerStencilComponent, true);

    
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.taskId = params['taskId'];
    });
  }


  // validateForm(event: any) {
  //   try {
  //     console.log('>>> *** >>> ****');
  //     console.dir(event.outcome);

  //     if (event.outcome) {
  //       const fields: FormFieldModel[] = event.outcome.form.getFormFields();
  //       const comments: string = TaskDetailsComponent.getField('comments', fields);
  //       if (comments == null || comments === '') {
  //         this.notificationService.openSnackMessage('(Sample Validation) Value for comments cannot be empty!');
  //         event.preventDefault();
  //       }
  //       else if (event.outcome.name == "Submit Request") {
  //         this.openDialog();
  //       }
  //       else if (event.outcome.name == "Register Products") {
  //         this.router.navigate(['/process-admin']);
  //       }
  //       else {
  //         // this.router.navigate(['/apps', this.appId || 0, 'tasks', taskId]);
  //         // this.router.navigate(['/process-admin']);
  //         this.router.navigate(['/lol-dashboard']);
  //       }

  //     }
  //   } catch (e) {
  //     // this.notificationService.openSnackMessage('ERROR');
  //     console.log(e);
  //     event.preventDefault();
  //   }
  // }


  validateForm(event: any) {
    console.log('>>> *** >>> ****');
    console.dir(event.outcome);
    
    this.routeToTaskList();
  }

  routeToTaskList() {
    setTimeout(() => {
      this.router.navigate(['/task-list']);
    }, 1000);
        
  }

}
