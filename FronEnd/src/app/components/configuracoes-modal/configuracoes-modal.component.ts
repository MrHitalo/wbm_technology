import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-configuracoes-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './configuracoes-modal.component.html',
  styleUrls: ['./configuracoes-modal.component.css']
})
export class ConfiguracoesModalComponent {
  config = {
    valveId: '',
    turnOnTime: '',
    turnOffTime: '',
    quantityPerCycle: null,
    cycleTime: null
  };

  constructor(public dialogRef: MatDialogRef<ConfiguracoesModalComponent>) {}

  saveConfig() {
    this.dialogRef.close(this.config);
  }
}