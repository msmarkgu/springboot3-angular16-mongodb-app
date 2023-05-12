import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobItemsListComponent } from './components/jobitems-list/jobitems-list.component';
import { AddJobItemComponent } from './components/add-jobitem/add-jobitem.component';
import { JobItemDetailComponent } from './components/jobitem-detail/jobitem-detail.component';
import { ImportCSVComponent } from './components/import-csv/import-csv.component';
import { ExportCSVComponent } from './components/export-csv/export-csv.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'add-jobitem' },
  { path: 'jobitems-list', component: JobItemsListComponent },
  { path: 'add-jobitem', component: AddJobItemComponent },
  { path: 'edit-jobitem/:id', component: JobItemDetailComponent },
  { path: 'import-csv', component: ImportCSVComponent },
  { path: 'export-csv', component: ExportCSVComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
