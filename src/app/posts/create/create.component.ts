import { Router } from '@angular/router';
import { PostService } from './../../post.service';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  // form = new FormGroup({
  //   title: new FormControl(),
  //   tags: new FormArray([
  //     new FormControl('HTML'),
  //     new FormControl('JavaScript'),
  //     new FormControl('CSS')
  //   ])
  // });

  // bodyValidator = Validators.compose([Validators.required, Validators.minLength(10)]);

  form = this.formBuilder.group({
    title: this.formBuilder.control('', Validators.required),
    description: this.formBuilder.control(''),
    body: this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    tags: this.formBuilder.array([
      this.formBuilder.control('HTML'),
      this.formBuilder.control('JavaScript'),
      this.formBuilder.control('CSS'),
    ]),
  });

  getTagsControl() {
    return (this.form.get('tags') as FormArray).controls;
  }

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private postService: PostService
  ) {}

  ngOnInit(): void {}

  addTag(tag: string) {
    (this.form.get('tags') as FormArray).push(this.formBuilder.control(tag));
  }

  removeTag(index: number) {
    (this.form.get('tags') as FormArray).removeAt(index);
  }

  send() {
    console.log(this.form.value);
    const data = { ...this.form.value, tagList: this.form.value.tags };
    delete data.tags;

    this.postService.createArticle(data).subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }
}
