import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TOP_LEVEL_DATA } from  './boeing-policy-tree.model';

@Component({
  selector: 'boeing-policy-tree',
  templateUrl: './boeing-policy-tree.component.html',
  styleUrls: ['./boeing-policy-tree.component.css']
})


export class BoeingPolicyTreeComponent implements OnInit {

 

constructor() { }

ngOnInit(): void {
}

displayedColumns: string[] = ['name', 'age'];
dataSource = new MatTableDataSource(TOP_LEVEL_DATA);

toggleRow(row) {
  row.expanded = !row.expanded;
}

}

