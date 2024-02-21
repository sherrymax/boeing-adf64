import { Component, OnInit, Input } from '@angular/core';
// import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';


@Component({
  selector: 'references-view',
  templateUrl: './references-view.component.html',
  styleUrls: ['./references-view.component.css']
})
export class ReferencesViewComponent implements OnInit {

  @Input()
  requiredFileType: string;

  fileName = '';
  uploadProgress: number;
  uploadSub: Subscription;

  httpURL = 'https://api.aspose.cloud/v4.0/words/online/get/bookmarks';
  errorMessage;
  postId;

  // httpURL = 'https://api.aspose.cloud/v4.0/words/online/get/bookmarks?folder=WordsExample&name=Bookmark.docx';

  constructor(private http: HttpClient) { }

  ngOnInit() {

    const headers = { 'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE3MDg0NTgxMTcsImV4cCI6MTcwODQ2MTcxNywiaXNzIjoiaHR0cHM6Ly9hcGkuYXNwb3NlLmNsb3VkIiwiYXVkIjpbImh0dHBzOi8vYXBpLmFzcG9zZS5jbG91ZC9yZXNvdXJjZXMiLCJhcGkuYmlsbGluZyIsImFwaS5pZGVudGl0eSIsImFwaS5wcm9kdWN0cyIsImFwaS5zdG9yYWdlIl0sImNsaWVudF9pZCI6IjAxODNhMDYyLWEwMjktNGVlZC1hNDU5LTYwMmRiNDYwZjljNyIsImNsaWVudF9kZWZhdWx0X3N0b3JhZ2UiOiJkODM3OTM2Ny1hZDA1LTQ1NTUtYWM5Mi00YzRmOTIxNjRjNGIiLCJjbGllbnRfaWRlbnRpdHlfdXNlcl9pZCI6Ijk5MDcxNCIsInNjb3BlIjpbImFwaS5iaWxsaW5nIiwiYXBpLmlkZW50aXR5IiwiYXBpLnByb2R1Y3RzIiwiYXBpLnN0b3JhZ2UiXX0.Wvo3-GQq2CUXazanM7YBwM-0eKCI3lC0lnB3YBDyY2ZiHnSYpa2YBsgAUQSiQM5mhPIgeBcXxpK8ukdToxqx0LVQvyzoKtxTUJse20SPGR8gAqeHue4SmmvOuCk8z4pUiYQVSCqq_JXyfqWra8KAM5NFKCUkAMikJRdpBSqZEJZNqmL5OQaTwce3TSTgD9qYsiO4AHM3hjNYB6piN1vmtjDt8wPrRIy0ete3OVseYYdwAHSy3P2Ljd7LzhwaHwclaDDIESsMqLn_BYBduPDUfTgrYcfBHLqRBeg4eWKLapyyAHijcXUHuyz5uoWFu6O8PgvmNYzb1z7bGrBlbMiHSg' };
    const body = { title: 'Angular PUT Request Example' };



    this.http.put<any>(this.httpURL, body, { headers })
      .subscribe({
        next: data => {
          this.postId = data.id;
        },
        error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
        }
      });
  }

  onFileSelected(event) {

    const file: File = event.target.files[0];
    const headers = { 'Content-Type': 'multipart/form-data', 'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE3MDg0NjQxNzcsImV4cCI6MTcwODQ2Nzc3NywiaXNzIjoiaHR0cHM6Ly9hcGkuYXNwb3NlLmNsb3VkIiwiYXVkIjpbImh0dHBzOi8vYXBpLmFzcG9zZS5jbG91ZC9yZXNvdXJjZXMiLCJhcGkuYmlsbGluZyIsImFwaS5pZGVudGl0eSIsImFwaS5wcm9kdWN0cyIsImFwaS5zdG9yYWdlIl0sImNsaWVudF9pZCI6IjAxODNhMDYyLWEwMjktNGVlZC1hNDU5LTYwMmRiNDYwZjljNyIsImNsaWVudF9kZWZhdWx0X3N0b3JhZ2UiOiJkODM3OTM2Ny1hZDA1LTQ1NTUtYWM5Mi00YzRmOTIxNjRjNGIiLCJjbGllbnRfaWRlbnRpdHlfdXNlcl9pZCI6Ijk5MDcxNCIsInNjb3BlIjpbImFwaS5iaWxsaW5nIiwiYXBpLmlkZW50aXR5IiwiYXBpLnByb2R1Y3RzIiwiYXBpLnN0b3JhZ2UiXX0.K0t6WhzuPdL6TApT35nWvuZCsFFo685IVNwyZw_LCE1CrWpcrTWDcng7cmxvk2um_UbQDP3ppq29BxN0ILjgolbZdePNQlo7HoqlWdViYbbF9Sbt5V5yAI7v23EVm6LpFPIC_GhFMjZiyINKbUiT7wgeoFU2z3EEHeXrufeGhMgFOXaBC_b8rwOkrAJAP2WbufwtoGrBz--cfULD7KF1VBm-PhQUC1b7TRpNoysCSi8yu3qMyZA04k16lvLs6B-0x9Cw7vAMmOm2OkHi8UVsjLlD9ZWuxh1fKNvKdNOvaKAs2GqSl0wiDbYPs2-eQrT-2posyjExhslnNTEqZM-5kQ' };
    // const body = { title: 'Angular PUT Request Example' };


    if (file) {

      this.fileName = file.name;

      const formData = new FormData();

      formData.append("Document", file);

      // const upload$ = this.http.post("/api/thumbnail-upload", formData);

      console.log(">>> HEADER <<<");
      console.dir(headers);

      const upload$ = this.http.put<any>(this.httpURL, formData, { headers });

      upload$.subscribe({
        next: data => {
          this.postId = data.id;
        },
        error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
        }
      });
    }
  }

  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = null;
    this.uploadSub = null;
  }

}

// interface BookmarkObject {
//   Name: string;
//   Text: string;
//   Link: {
//     Href: string;
//     Rel: string;
//   }
// }
