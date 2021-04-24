import { PostService } from './../../post.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/interfaces/article';
import { map, shareReplay, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  article$: Observable<Article>;
  article: Article;

  constructor(private route: ActivatedRoute, private postService: PostService) { }

  ngOnInit(): void {
    this.article$ = this.route.paramMap.pipe(
      map(paramMap => paramMap.get('id')),
      switchMap(id => this.postService.getArticle(id)),
      map(singleArticle => singleArticle.article),
      // shareReplay(1)
    );

    // this.route.paramMap.subscribe(paramMap => {
    //   const id = paramMap.get('id');
    //   this.postService.getArticle(id).subscribe(singleArticle => {
    //     this.article = singleArticle.article;
    //     this.postService.getArticle(id).subscribe(singleArticle => {
    //       this.postService.getArticle(id).subscribe(singleArticle => {
    //       });
    //     });
    //   });
    // })

    // switchMap, concatMap, mergeMag, exhaustMap

  }

}
