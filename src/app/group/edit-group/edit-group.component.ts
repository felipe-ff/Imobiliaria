import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../service/group.service';
import { Router, NavigationExtras } from '@angular/router';
import { Group } from '../../model/group.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.css']
})
export class EditGroupComponent implements OnInit {

  group: Group;
  editForm: FormGroup;
  submitted = false;
  disabled = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private groupService: GroupService,
    public toastr: ToastrManager) { }

  ngOnInit() {
    const groupId = localStorage.getItem('editGroupId');
    if (!groupId) {
      alert('Invalid action.');
      this.router.navigate(['list-group']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [],
      groupName: ['', Validators.required],
      groupDescription: ['', Validators.required],
      specialGroupType: [''],
      terminalList: ['', Validators.required],
      terminalType: ['opt1', Validators.required],
      notes: ['', Validators.required],
      groupType: ['', Validators.required]
    });
    this.groupService.getGroupById(+groupId)
      .subscribe( data => {
        this.editForm.setValue(data);
        this.changedGroupType();
      });
  }

  onSubmit() {
    this.submitted = true;

    if (this.editForm.invalid) {
      this.toastr.errorToastr('Verifique os campos em vermelho.', 'Campos Inválidos!');
      return;
    }

    this.groupService.updateGroup(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.toastr.successToastr('Salvo com sucesso!');
          this.router.navigate(['list-group']);
        });
  }

  backToList() {
    const navigationExtras: NavigationExtras = {};
    this.router.navigate(['list-group'], navigationExtras);
  }

  get f() { return this.editForm.controls; }

  changedGroupType() {
    if (this.editForm.controls['groupType'].value === 'option1') {
      this.disabled = false;
    } else {
      this.editForm.controls['terminalType'].patchValue('opt1');
      this.editForm.controls['specialGroupType'].patchValue('');
      this.disabled = true;
    }
  }
}
