import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
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
    body: this.formBuilder.control('', [Validators.required, Validators.minLength(10)]),
    tags: this.formBuilder.array([
      this.formBuilder.control('HTML'),
      this.formBuilder.control('JavaScript'),
      this.formBuilder.control('CSS'),
    ]),
  });

  getTagsControl() {
    return (this.form.get('tags') as FormArray).controls;
  }

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  addTag(tag: string) {
    (this.form.get('tags') as FormArray).push(this.formBuilder.control(tag));
  }

  removeTag(index: number) {
    (this.form.get('tags') as FormArray).removeAt(index);
  }

  send() {
    console.log(this.form.value);
  }
}
