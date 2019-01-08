import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {GroupService} from '../../service/group.service';
import {Group} from '../../model/group.model';

@Component({
  selector: 'app-list-group',
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.css']
})
export class ListGroupComponent implements OnInit {

  groups: Group[];

  constructor(private router: Router, private groupService: GroupService) { }

  ngOnInit() {
    this.groupService.getGroups()
      .subscribe( data => {
        this.groups = data;
      });
      //error => this.alertService.showError(error, "Erro ao listar grupo de terminais!"));
  }

  deleteGroup(group: Group): void {
    this.groupService.deleteGroup(group.id)
      .subscribe( data => {
        this.groups = this.groups.filter(u => u !== group);
      });
  };

  editGroup(group: Group): void {
    localStorage.removeItem('editGroupId');
    localStorage.setItem('editGroupId', group.id.toString());
    this.router.navigate(['edit-group']);
  };

  addGroup(): void {
    this.router.navigate(['add-group']);
  }
}
