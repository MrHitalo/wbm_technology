import { Routes } from '@angular/router';
import { PainelComponent } from './painel/painel.component';
import { Component } from '@angular/core';
import { TodosDispositivosComponent } from './painel/todos-dispositivos/todos-dispositivos.component';

export const routes: Routes = [
    {
        path:'',
        component: PainelComponent
    },
    {
        path: 'todos',
        component: TodosDispositivosComponent
    }
];
