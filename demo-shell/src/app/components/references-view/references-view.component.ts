import { Component, OnInit, Input } from '@angular/core';
// import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';
// import { AsposeWordsCloud } from 'asposewordscloud';


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

  file: File = null;


  // httpURL = 'https://api.aspose.cloud/v4.0/words/online/get/bookmarks?folder=WordsExample&name=Bookmark.docx';

  constructor(private http: HttpClient) { }

  ngOnInit() {

    // const headers = { 'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE3MDg1NDE2NTgsImV4cCI6MTcwODU0NTI1OCwiaXNzIjoiaHR0cHM6Ly9hcGkuYXNwb3NlLmNsb3VkIiwiYXVkIjpbImh0dHBzOi8vYXBpLmFzcG9zZS5jbG91ZC9yZXNvdXJjZXMiLCJhcGkuYmlsbGluZyIsImFwaS5pZGVudGl0eSIsImFwaS5wcm9kdWN0cyIsImFwaS5zdG9yYWdlIl0sImNsaWVudF9pZCI6IjAxODNhMDYyLWEwMjktNGVlZC1hNDU5LTYwMmRiNDYwZjljNyIsImNsaWVudF9kZWZhdWx0X3N0b3JhZ2UiOiJkODM3OTM2Ny1hZDA1LTQ1NTUtYWM5Mi00YzRmOTIxNjRjNGIiLCJjbGllbnRfaWRlbnRpdHlfdXNlcl9pZCI6Ijk5MDcxNCIsInNjb3BlIjpbImFwaS5iaWxsaW5nIiwiYXBpLmlkZW50aXR5IiwiYXBpLnByb2R1Y3RzIiwiYXBpLnN0b3JhZ2UiXX0.p5GDQILUEYxU0h-r3aAmnFSER-0h3eOeuNKMdrWj2dt0jmtGIKB97pEc9uLLIfTtVGhlhDNsXxLh8site6aHcOYYBRw228k6-I4nulIN98AjtMYQ4bv3xa5gssRYoRXFvfwEZwUqMBAkPqXdRr6yg2tFxcO6HQgSLjCMRH3CYmXf9BfuomOTaXkG2LSPncINMrPXOwmk1tU58XuK1ONYp5RIm9cneuienzhzE0pXJDba-moxI1mMbbYh1Zq6A5LiPYf4xJWFX5vx-lBCqrV5hwYMT3l3c-7ujfvBBwOhVDuiJjLDrzSepJfgUyL3ULq_WZmVbgVXn23BKNs8RSH7QQ' };
    // const body = { title: 'Angular PUT Request Example' };



    // this.http.put<any>(this.httpURL, body, { headers })
    //   .subscribe({
    //     next: data => {
    //       this.postId = data.id;
    //     },
    //     error: error => {
    //       this.errorMessage = error.message;
    //       console.error('There was an error!', error);
    //     }
    //   });
  }

  onFilechange(event: any) {
    console.log(event.target.files[0])
    this.file = event.target.files[0]
  }

  upload() {

    var authToken = "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE3MDg1NDcwNTgsImV4cCI6MTcwODU1MDY1OCwiaXNzIjoiaHR0cHM6Ly9hcGkuYXNwb3NlLmNsb3VkIiwiYXVkIjpbImh0dHBzOi8vYXBpLmFzcG9zZS5jbG91ZC9yZXNvdXJjZXMiLCJhcGkuYmlsbGluZyIsImFwaS5pZGVudGl0eSIsImFwaS5wcm9kdWN0cyIsImFwaS5zdG9yYWdlIl0sImNsaWVudF9pZCI6IjAxODNhMDYyLWEwMjktNGVlZC1hNDU5LTYwMmRiNDYwZjljNyIsImNsaWVudF9kZWZhdWx0X3N0b3JhZ2UiOiJkODM3OTM2Ny1hZDA1LTQ1NTUtYWM5Mi00YzRmOTIxNjRjNGIiLCJjbGllbnRfaWRlbnRpdHlfdXNlcl9pZCI6Ijk5MDcxNCIsInNjb3BlIjpbImFwaS5iaWxsaW5nIiwiYXBpLmlkZW50aXR5IiwiYXBpLnByb2R1Y3RzIiwiYXBpLnN0b3JhZ2UiXX0.OGt4s_oeN4aTa4QutP1r9hHRUjPYQFXhh3DkF_h1w2om39jAADaHnLzLYPxG0nLtoiLXypIbRLzHhXi9gsNX71KtLKvONkv-wDz55LYhBMnIfdNmkNqs7Wc0vCGYOKNHl8_7K5GLscOOaY6WikdsQpkwtWBR_P8ioXNgm6leB920zbtvUx-MtDh6C4gZZW2eySiEEuNMKux43D9jOYiqClPStM0-zcM-HMGA1vfqLsz_nhHzJTBfv_aq5VINhBWmcyngOL3ZxcvFC5WWoH03oZoSSL_ujZSdrlGBmHmKMLmMlQGcfXYfT5dhZFzPZr0zuU5gjDlSvxBhxLjmnBsytg";
    // var headers_object = new HttpHeaders();
    // headers_object.append('Content-Type', '*/*');
    // headers_object.append("Authorization", authToken);
    // headers_object.append('withCredentials', 'true');

    const httpOptions = {
      // headers: new HttpHeaders({"Content-Disposition": "form-data; name='Document'; filename='" + this.file.name+"'", 'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'Authorization': authToken, 'Accept':'*/*'})
      // headers: new HttpHeaders({'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'Authorization': authToken, 'Accept':'*/*'})

      headers: new HttpHeaders({'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'Authorization': authToken, 'Accept':'*/*'})
    };
    
    // var httpOptions = new HttpParamsOptions();
    // httpOptions.headers = headers_object;

    // const httpOptions = {
    //   headers: headers_object
    // };

    console.dir(httpOptions);

    // const headers = { 'Content-Type': this.file.type, 'Authorization': authToken };
    // const body = { title: 'Angular PUT Request Example' };
    // const options = {withCredentials: true, 'access-control-allow-origin': "http://localhost:4200/", 'Content-Type': 'application/json'}


    if (this.file) {


      console.log('File Name >>> '+this.file.name);
      console.dir(this.file);

      this.fileName = this.file.name;


      const formParams = new FormData();

      // formParams.append("file", this.file);
      console.log(">>> FORM PARAMS <<<");

      formParams.append("Document", this.file); 
      console.log(formParams.get("Document"));
      console.dir(formParams);
      console.dir(JSON.stringify(formParams));

      // const upload$ = this.http.post("/api/thumbnail-upload", formData);

      console.log(">>> HEADER <<<");
      console.dir(httpOptions.headers);

      // const upload$ = this.http.put<any>(this.httpURL, formData, { headers });
      // const upload$ = this.http.put<any>(this.httpURL, JSON.stringify(formParams.get("Document")), httpOptions);
      const upload$ = this.http.put<any>(this.httpURL, formParams, httpOptions);

      upload$.subscribe(resp => {
        alert("Uploaded");
        console.dir(resp);
      })

      // upload$.subscribe({
      //   next: data => {
      //     this.postId = data.id;
      //   },
      //   error: error => {
      //     this.errorMessage = error.message;
      //     console.error('There was an error!', error);
      //   }
      // });
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
