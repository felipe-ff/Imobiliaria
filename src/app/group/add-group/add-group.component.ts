import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroupService } from '../../service/group.service';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private groupService: GroupService, public toastr: ToastrManager
    ) { }

  addForm: FormGroup;
  submitted = false;
  disabled = false;

  ngOnInit() {

    this.addForm = this.formBuilder.group({
      groupName: ['', Validators.required],
      groupDescription: ['', Validators.required],
      specialGroupType: [''],
      terminalList: ['', Validators.required],
      terminalType: ['opt1', Validators.required],
      notes: ['', Validators.required],
      groupType: ['option1', Validators.required]
    });

  }

  onSubmit() {
    this.submitted = true;

    if (this.addForm.invalid) {
      this.toastr.errorToastr('Verifique os campos em vermelho.', 'Campos Inválidos!');
      return;
    }
    this.groupService.createGroup(this.addForm.value)
      .subscribe( data => {
        this.toastr.successToastr('Salvo com sucesso!');
        this.router.navigate(['list-group']);
      });
  }

  backToList() {
     const navigationExtras: NavigationExtras = {};
     this.router.navigate(['list-group'], navigationExtras);
  }

  get f() { return this.addForm.controls; }

  changedGroupType() {
    if (this.addForm.controls['groupType'].value === 'option1') {
      this.disabled = false;
    } else {
      this.addForm.controls['terminalType'].patchValue('opt1');
      this.addForm.controls['specialGroupType'].patchValue('');
      this.disabled = true;
    }

  }
}
