/*!
 * @license
 * Copyright 2016 Alfresco Software, Ltd.
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
import { WidgetComponent } from '@alfresco/adf-core';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'apw-json-viewer-stencil',
  templateUrl: './json-viewer-stencil.component.html',
  styleUrls: ['./json-viewer-stencil.component.scss']
})
export class JSONViewerStencilComponent extends WidgetComponent implements OnInit {

  expanded: false;
  jsonObject: any;
  constructor() {
    super();
  }
  ngOnInit() {
    this.expanded = this.field.params.customProperties.expanded;
    this.jsonObject = JSON.parse(this.field.params.customProperties.jsonObject.value);
  }

}
