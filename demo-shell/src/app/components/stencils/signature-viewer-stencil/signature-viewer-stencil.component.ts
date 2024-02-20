import { Component } from '@angular/core';
import { WidgetComponent } from '@alfresco/adf-core';

@Component({
  selector: 'signature-viewer-stencil',
  templateUrl: './signature-viewer-stencil.component.html',
  styleUrls: ['./signature-viewer-stencil.component.css']
})
export class SignatureViewerStencilComponent extends WidgetComponent {

  constructor() { super();}

  ngOnInit(): void {
  }

}
