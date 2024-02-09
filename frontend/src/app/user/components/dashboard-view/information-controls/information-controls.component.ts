import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from 'src/app/user/models/user';

@Component({
  selector: 'app-information-controls',
  templateUrl: './information-controls.component.html',
  styleUrls: ['./information-controls.component.css']
})
export class InformationControlsComponent {
  @Input()
  formGroup!: FormGroup;

  @Output()
  editModeEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  cancelClickedEvent: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  saveClickedEvent: EventEmitter<any> = new EventEmitter<any>();

  inEditMode = false;
  editClick() {
    this.inEditMode = true;
    this.emitEditModeEvent();
  }
  
  cancelClick() {
    this.inEditMode = false;
    this.cancelClickedEvent.emit();
  }

  saveClick() {
    this.inEditMode = false;
    if(this.formGroup.dirty){
      this.saveClickedEvent.emit(this.formGroup.value);
    } else {
      this.cancelClick();
    }
  }

  emitEditModeEvent() {
    this.editModeEvent.emit(this.inEditMode);
  }

  isSaveDisabled(): boolean {
    if (this.formGroup) {
      return !this.formGroup.valid;
    }
    return true;
  }
}
