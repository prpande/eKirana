import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

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
    this.emitEditModeEvent();
    this.cancelClickedEvent.emit();
  }
  saveClick() {
    this.inEditMode = false;
    this.formGroup.dirty;
    this.emitEditModeEvent();
    this.saveClickedEvent.emit()
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
