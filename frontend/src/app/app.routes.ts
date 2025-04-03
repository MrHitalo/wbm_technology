import { Routes } from '@angular/router';
import { PainelComponent } from './pages/painel/painel.component';
import { Component } from '@angular/core';
import { EquipamentoComponent } from './pages/equipamento/equipamento.component';

export const routes: Routes = [
    {
        path:'',
        component: PainelComponent
    },
    {
        path:'equipamento',
        component: EquipamentoComponent
    }
];
