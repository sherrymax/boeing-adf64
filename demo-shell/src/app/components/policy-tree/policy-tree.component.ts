import {
    Component,
    ViewChild,
    ViewChildren,
    QueryList,
    ChangeDetectorRef
} from '@angular/core';
import {
    animate,
    state,
    style,
    transition,
    trigger
} from '@angular/animations';
import {
    MatSort
} from '@angular/material/sort';
import {
    MatTableDataSource,
    MatTable
} from '@angular/material/table';

/**
* @title Table with expandable rows
*/
@Component({
    selector: 'policy-tree',
    styleUrls: ['policy-tree.component.css'],
    templateUrl: 'policy-tree.component.html',
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({
                height: '0px',
                minHeight: '0'
            })),
            state('expanded', style({
                height: '*'
            })),
            transition(
                'expanded <=> collapsed',
                animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
            )
        ])
    ]
})
export class PolicyTreeComponent {
    @ViewChild('outerSort', {
        static: true
    }) sort: MatSort;
    @ViewChildren('innerSort') innerSort: QueryList<MatSort>;
    @ViewChildren('innerTables') innerTables: QueryList<MatTable<ProcedureWriting>>;
    @ViewChildren('bpiTables') bpiTables: QueryList<MatTable<BPIWriting>>;


    dataSource: MatTableDataSource<PolicyWriting>;
    policiesData: PolicyWriting[] = [];

    columnsToDisplay = ['action', 'writingNumber', 'title', 'authorityReference', 'authorityTitle', 'tier'];
    innerDisplayedColumns = ['action', 'writingNumber', 'title', 'authorityReference', 'authorityTitle', 'tier'];
    displayedCommentColumns = ['writingNumber', 'title', 'authorityReference', 'authorityTitle', 'tier'];

    expandedElement: PolicyWriting | null;
    expandedElement2: PolicyWriting | null;
    expandedElements: any[] = [];
    innerExpandedElements: any[] = [];

    constructor(private cd: ChangeDetectorRef) { }

    ngOnInit() {
        WRITINGS.forEach(policy => {
            if (
                policy.procedures &&
                Array.isArray(policy.procedures) &&
                policy.procedures.length
            ) {
                this.policiesData = [
                    ...this.policiesData,
                    {
                        ...policy,
                        procedures: new MatTableDataSource(policy.procedures)
                    }
                ];
            } else {
                this.policiesData = [...this.policiesData, policy];
            }
        });
        this.dataSource = new MatTableDataSource(this.policiesData);
        this.dataSource.sort = this.sort;
    }

    applyFilter(filterValue: string) {
        this.innerTables.forEach(
            (table, index) => {
                (table.dataSource as MatTableDataSource<PolicyWriting>).filter = filterValue.trim().toLowerCase();
                console.log(index);
            }
        );
        this.bpiTables.forEach(
            (table, index) => {
                (table.dataSource as MatTableDataSource<BPIWriting>).filter = filterValue.trim().toLowerCase();
                console.log(index);
            }
        );

        // this.dataSource.filterPredicate = filterFunction;

    }

    filterFunction(data, searchTerm) {
        const result = data.filter(row => {
            return row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                row.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                row.weight.toLowerCase().includes(searchTerm.toLowerCase());
        });
        return result;
    }


    toggleRow(element: PolicyWriting) {
        element.procedures &&
            (element.procedures as MatTableDataSource<ProcedureWriting>).data.length ?
            this.toggleElement(element) :
            null;
        this.cd.detectChanges();
        this.innerTables.forEach(
            (table, index) =>
                ((table.dataSource as MatTableDataSource<ProcedureWriting>).sort = this.innerSort.toArray()[index])
        );
    }

    toggleAddress(procedure) {
        const index = this.innerExpandedElements.findIndex(x => x === procedure);
        if (index === -1) {
            this.innerExpandedElements.push(procedure);
        } else {
            this.innerExpandedElements.splice(index, 1);
        }
    }

    isExpanded(row: PolicyWriting): string {
        const index = this.expandedElements.findIndex(x => x.writingNumber == row.writingNumber);
        if (index !== -1) {
            return 'expanded';
        }
        return 'collapsed';
    }

    toggleElement(row: PolicyWriting) {
        const index = this.expandedElements.findIndex(x => x.writingNumber == row.writingNumber);
        if (index === -1) {
            this.expandedElements.push(row);
        } else {
            this.expandedElements.splice(index, 1);
        }

        //console.log(this.expandedElements);
    }

    getColumnLabel(id) {

        switch (id) {
            case "writingNumber": return "Writing Number";
            case "title": return "Title";
            case "authorityReference": return "Authority Reference";
            case "authorityTitle": return "Authority Title";
            case "tier": return "Tier";
            default: return id;
        }
    }

    getDocumentLink() {
        //http://ec2-54-211-132-149.compute-1.amazonaws.com/ocms/Stage/controlleddocs/workspace://SpacesStore/5fe21715-e1fd-4c17-9ba8-59a01f2d8df7%7Cworkspace://SpacesStore/2ee12e44-ba08-4d61-adbe-d4274106475d
    }

    getColumnContent(element, column) {
        if (column == 'writingNumber') {
            var elementStatus = element['status'];
            var elementStatusHTML = '';

            if(elementStatus && elementStatus=='Cancelled'){
                elementStatusHTML = '<br/><div><font color="RED"><i>'+elementStatus+'</i></font></div>';
            }
            return `<b><a href="www.google.com" target="_blank">${element[column]}</a></b>${elementStatusHTML}`;
        }
        else
            return element[column];
    }

}

export interface PolicyWriting {
    writingNumber: string;
    title: string;
    authorityReference: string;
    authorityTitle: string;
    tier: number;
    procedures?: ProcedureWriting[] | MatTableDataSource<ProcedureWriting>;
}

export interface ProcedureWriting {
    writingNumber: string;
    title: string;
    authorityReference: string;
    authorityTitle: string;
    tier: number;
    BPIs?: BPIWriting[] | MatTableDataSource<BPIWriting>;
}

export interface BPIWriting {
    writingNumber: string;
    title: string;
    authorityReference: string;
    authorityTitle: string;
    tier: number;
    status?: string;
}


const WRITINGS: PolicyWriting[] = [
    { //POL-1
        writingNumber: 'POL-1', //WritingNumber
        title: 'Delegation of Authority to Authorize Resources', //Title
        authorityReference: 'None', //AuthorityReference
        authorityTitle: '', //AuthorityTitle
        tier: 1,
        procedures: [
            {  //POL-1 : PROC -1
                writingNumber: 'PRO-11',
                title: 'Policies, Procedures and Business Process Instructions',
                authorityReference: 'POL-1',
                authorityTitle: 'Delegation of Authority to Authorize Resources',
                tier: 2,
                BPIs: [{ //POL-1 : PROC -1 : BPI-1
                    writingNumber: 'BPI-11',
                    title: 'Managing release of Policies, Procedures and Business Process Instructions',
                    authorityReference: 'PRO-11',
                    authorityTitle: 'Policies, Procedures and Business Process Instructions',
                    tier: 3
                },
                { //POL-1 : PROC -1 : BPI-2
                    writingNumber: 'BPI-12',
                    title: 'Quality System Review Process',
                    authorityReference: 'PRO-11',
                    authorityTitle: 'Policies, Procedures and Business Process Instructions',
                    tier: 3
                },
                { //POL-1 : PROC -1 : BPI-3
                    writingNumber: 'BPI-13',
                    title: 'Communication of Released Writings',
                    authorityReference: 'PRO-11',
                    authorityTitle: 'Policies, Procedures and Business Process Instructions',
                    tier: 3,
                    status: "Cancelled"
                }
                ]
            },
            { //POL-1 : PROC-2
                writingNumber: 'PRO-12',
                title: 'Procedures and BPIs for Flight Aviation Policies',
                authorityReference: 'POL-1',
                authorityTitle: 'Delegation of Authority to Authorize Resources',
                tier: 2,
                BPIs: [{//POL-1 : PROC-2 : BPI-1
                    writingNumber: 'BPI-121',
                    title: 'Latitude and Longitude Reading Instructions',
                    authorityReference: 'PRO-12',
                    authorityTitle: 'Procedures and BPIs for Flight Aviation Policies',
                    tier: 3
                },
                {//POL-1 : PROC-2 : BPI-2
                    writingNumber: 'BPI-122',
                    title: 'Air traffic instructions',
                    authorityReference: 'PRO-12',
                    authorityTitle: 'Procedures and BPIs for Flight Aviation Policies',
                    tier: 3
                },
                {//POL-1 : PROC-2 : BPI-3
                    writingNumber: 'BPI-123',
                    title: 'Control tower communication instructions',
                    authorityReference: 'PRO-12',
                    authorityTitle: 'Procedures and BPIs for Flight Aviation Policies',
                    tier: 3
                }
                ]
            }
        ]
    },
    { //POL-2
        writingNumber: 'POL-2', //WritingNumber
        title: 'Commercial Airlines Pilot Training Policy', //Title
        authorityReference: 'None', //AuthorityReference
        authorityTitle: '', //AuthorityTitle
        tier: 1,
        procedures: [
            {  //POL-2 : PROC -1
                writingNumber: 'PRO-21',
                title: 'Pre-flight Onboard Checking Procedure',
                authorityReference: 'POL-2',
                authorityTitle: 'Commercial Airlines Pilot Training Policy',
                tier: 2,
                BPIs: [{ //POL-2 : PROC -1 : BPI-1
                    writingNumber: 'BPI-223',
                    title: 'Upgraded Control Panel Instructions',
                    authorityReference: 'PRO-21',
                    authorityTitle: 'Pre-flight Onboard Checking Procedure',
                    tier: 3
                },
                { //POL-2 : PROC -1 : BPI-2
                    writingNumber: 'BPI-224',
                    title: 'Landing Gear Instructions',
                    authorityReference: 'PRO-21',
                    authorityTitle: 'Pre-flight Onboard Checking Procedure',
                    tier: 3,
                    status: "Cancelled"
                },
                { //POL-2 : PROC -1 : BPI-3
                    writingNumber: 'BPI-225',
                    title: 'Panel and Keypad Functionality',
                    authorityReference: 'PRO-21',
                    authorityTitle: 'Pre-flight Onboard Checking Procedure',
                    tier: 3
                }
                ]
            },
            { //POL-2 : PROC-2
                writingNumber: 'PRO-22',
                title: 'Enroute Communication Procedure',
                authorityReference: 'POL-2',
                authorityTitle: 'Commercial Airlines Pilot Training Policy',
                tier: 2,
                BPIs: [{//POL-2 : PROC-2 : BPI-1
                    writingNumber: 'BPI-226',
                    title: 'Alternate Route Instructions',
                    authorityReference: 'PRO-22',
                    authorityTitle: 'Enroute Communication Procedure',
                    tier: 3
                },
                {//POL-2 : PROC-2 : BPI-2
                    writingNumber: 'BPI-227',
                    title: 'Airpocket Survival Equipment Usage',
                    authorityReference: 'PRO-22',
                    authorityTitle: 'Enroute Communication Procedure',
                    tier: 3
                },
                {//POL-2 : PROC-2 : BPI-3
                    writingNumber: 'BPI-228',
                    title: 'Landing gear operations in case of communication failure',
                    authorityReference: 'PRO-22',
                    authorityTitle: 'Enroute Communication Procedure',
                    tier: 3
                }
                ]
            }
        ]
    }
];

/**
 * 


export interface User {
    name: string;
    email: string;
    phone: string;
    addresses?: Address[] | MatTableDataSource<Address>;
}

export interface Comment {
    commenID: number;
    comment: string;
    commentStatus: string;
}

export interface Address {
    street: string;
    zipCode: string;
    city: string;
    comments?: Comment[] | MatTableDataSource<Comment>;
}

const USERS: User[] = [{
    name: 'Mason', //WritingNumber
    email: 'mason@test.com', //Title
    phone: '9864785214', //AuthorityReference
    addresses: [{
        street: 'Street 1',
        zipCode: '78542',
        city: 'Kansas',
        comments: [{
            commenID: 1,
            comment: 'Test',
            commentStatus: 'Open'
        },
        {
            commenID: 2,
            comment: 'Test',
            commentStatus: 'Open'
        },
        {
            commenID: 3,
            comment: 'Test',
            commentStatus: 'Closed'
        }
        ]
    },
    {
        street: 'Street 2',
        zipCode: '78554',
        city: 'Texas',
        comments: [{
            commenID: 4,
            comment: 'Test',
            commentStatus: 'Open'
        },
        {
            commenID: 5,
            comment: 'Test',
            commentStatus: 'Open'
        },
        {
            commenID: 6,
            comment: 'Test',
            commentStatus: 'Closed'
        }
        ]
    }
    ]
},
{
    name: 'Eugene',
    email: 'eugene@test.com',
    phone: '8786541234',
    addresses: [{
        street: 'Street 5',
        zipCode: '23547',
        city: 'Utah',
        comments: [{
            commenID: 7,
            comment: 'Test',
            commentStatus: 'Open'
        },
        {
            commenID: 8,
            comment: 'Test',
            commentStatus: 'Open'
        },
        {
            commenID: 9,
            comment: 'Test',
            commentStatus: 'Closed'
        }
        ]
    },
    {
        street: 'Street 5',
        zipCode: '23547',
        city: 'Ohio',
        comments: [{
            commenID: 19,
            comment: 'Test',
            commentStatus: 'Open'
        },
        {
            commenID: 11,
            comment: 'Test',
            commentStatus: 'Open'
        },
        {
            commenID: 12,
            comment: 'Test',
            commentStatus: 'Closed'
        }
        ]
    }
    ]
},
{
    name: 'Jason',
    email: 'jason@test.com',
    phone: '7856452187',
    addresses: [{
        street: 'Street 5',
        zipCode: '23547',
        city: 'Utah',
        comments: [{
            commenID: 13,
            comment: 'Test',
            commentStatus: 'Open'
        },
        {
            commenID: 14,
            comment: 'Test',
            commentStatus: 'Open'
        },
        {
            commenID: 15,
            comment: 'Test',
            commentStatus: 'Closed'
        }
        ]
    },
    {
        street: 'Street 5',
        zipCode: '23547',
        city: 'Ohio',
        comments: [{
            commenID: 16,
            comment: 'Test',
            commentStatus: 'Open'
        },
        {
            commenID: 17,
            comment: 'Test',
            commentStatus: 'Open'
        },
        {
            commenID: 18,
            comment: 'Test',
            commentStatus: 'Closed'
        }
        ]
    }
    ]
}
];
*/

/**  Copyright 2019 Google Inc. All Rights Reserved.
  Use of this source code is governed by an MIT-style license that
  can be found in the LICENSE file at http://angular.io/license */