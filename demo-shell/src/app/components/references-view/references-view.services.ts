import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ReferencesViewService {

    httpURL = 'https://api.aspose.cloud/v4.0/words/online/get/bookmarks';
    // httpURL = 'https://api.aspose.cloud/v4.0/words/online/get/bookmarks?folder=WordsExample&name=Bookmark.docx';

    constructor(private http: HttpClient) { }

    ngOnInit() {
        const body = { title: 'Angular PUT Request Example' };
        this.http.put<any>(this.httpURL, body)
            .subscribe(data => this.postId = data.id);
    }

    
}

interface Bookmark {
    Name: string;   
    Text: string;
    Link: {
        Href: string;
        Rel: string;
    }
}