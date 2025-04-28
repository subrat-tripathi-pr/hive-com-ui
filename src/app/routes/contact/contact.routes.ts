import { Routes } from "@angular/router";
import { AddContactComponent } from "./add/add.component";
import { EditContactComponent } from "./edit/edit.component";
import { ListContactsComponent } from "./list/list.component";

export const routes: Routes = [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'edit', component: EditContactComponent },
    { path: 'add', component: AddContactComponent },
    { path: 'list', component: ListContactsComponent },
];