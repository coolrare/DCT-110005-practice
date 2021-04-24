import { AuthGuard } from './../auth.guard';
import { CreateComponent } from './create/create.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostComponent } from './post/post.component';

import { PostsComponent } from './posts.component';

const routes: Routes = [
  { path: '', redirectTo: 'posts' },
  { path: 'posts', component: PostsComponent },
  { path: 'create', component: CreateComponent, canActivate: [AuthGuard] },
  { path: 'post', redirectTo: 'posts'},
  { path: 'post/:id', component: PostComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
