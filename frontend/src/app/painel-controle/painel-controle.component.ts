import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModbusService } from '../services/modbus.service';
import { OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';


@Component({
  standalone: true,
  selector: 'app-painel-controle',
  imports: [CommonModule, FormsModule],
  templateUrl: './painel-controle.component.html',
  styleUrls: ['./painel-controle.component.css']
})
export class PainelControleComponent  implements OnInit, OnDestroy{
  devices: any[] = [];
  private dataSubscription!: Subscription;

  constructor(private modbusService: ModbusService) {}

  ngOnInit() {
    this.initAutoRefresh();
  }

  private initAutoRefresh() {
    this.dataSubscription = this.modbusService.autoRefreshData().subscribe({
      next: (data) => this.processData(data),
      error: (err) => console.error('Erro na atualização:', err)
    });
  }

  private processData(rawData: any) {
    this.devices = [
      this.createDeviceCard('Esfera', 'settings', rawData.esfera),
      this.createDeviceCard('Gaveta', 'archive', rawData.gaveta),
      this.createDeviceCard('AR', 'ac_unit', rawData.ar),
      this.createDeviceCard('Temperatura', 'thermostat', rawData.temperatura),
      this.createDeviceCard('Umidade', 'opacity', rawData.umidade),
      this.createDeviceCard('Motor', 'engineering', rawData.motor)
    ];
  }

  private createDeviceCard(name: string, icon: string, data: any) {
    return {
      name,
      icon,
      data: Object.entries(data).map(([key, value]) => ({
        label: key.replace(/_/g, ' '),
        value
      }))
    };
  }

  ngOnDestroy() {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }
  
}