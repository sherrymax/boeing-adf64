import { Injectable,  } from '@angular/core';

import { AsposeWordsCloud } from 'asposewordscloud';

@Injectable({
    providedIn: 'root'
})
export class AsposeWordsRestApiService {

    constructor(private client: AsposeWordsCloud) { }

    // ...

    // Get a list of all documents.
    getDocuments(): Observable<Document[]> {
        this.client.getBookmarks();
        return this.client.getDocuments();
    }

    // Get a document by its ID.
    getDocument(id: string): Observable<Document> {
        return this.client.getDocument(id);
    }

    // Create a new document.
    createDocument(document: Document): Observable<Document> {
        return this.client.createDocument(document);
    }

    // Update a document.
    updateDocument(id: string, document: Document): Observable<Document> {
        return this.client.updateDocument(id, document);
    }

    // Delete a document.
    deleteDocument(id: string): Observable<void> {
        return this.client.deleteDocument(id);
    }

}