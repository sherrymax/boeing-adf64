import { Component, ElementRef, ViewChild } from '@angular/core';
import { WidgetComponent } from '@alfresco/adf-core';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-signature-pad',
  templateUrl: './signature-pad-stencil.component.html',
  styleUrls: ['./signature-pad-stencil.component.scss']
})
export class SignaturePadStencilComponent extends WidgetComponent {
  signatureNeeded!: boolean;
  signaturePad!: SignaturePad;
  @ViewChild('canvas') canvasEl!: ElementRef;
  signatureImg!: string;

  constructor() { super(); }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
  }

  startDrawing(event: Event) {
    // works in device not in browser
    console.dir(event);
  }

  moved(event: Event) {
    // works in device not in browser
    console.dir(event);
  }

  clearPad() {
    this.signaturePad.clear();
  }

  savePad() {
    const base64Data = this.signaturePad.toDataURL();
    this.signatureImg = base64Data;
    this.signatureNeeded = this.signaturePad.isEmpty();
    if (!this.signatureNeeded) {
      this.signatureNeeded = false;
    }
    this.field.value = this.signatureImg;
  }
}