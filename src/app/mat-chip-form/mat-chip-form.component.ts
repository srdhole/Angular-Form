import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { Component, ElementRef, ViewChild } from "@angular/core";
import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroup
} from "@angular/forms";
import {
  MatAutocompleteSelectedEvent,
  MatAutocomplete
} from "@angular/material/autocomplete";
import { MatChipInputEvent } from "@angular/material/chips";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";

@Component({
  selector: "app-mat-chip-form",
  templateUrl: "./mat-chip-form.component.html",
  styleUrls: ["./mat-chip-form.component.css"]
})
export class MatChipFormComponent {
  cutomerForm: FormGroup;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = ["Lemon"];
  allFruits: string[] = ["Apple", "Lemon", "Lime", "Orange", "Strawberry"];

  @ViewChild("fruitInput", { static: false }) fruitInput: ElementRef<
    HTMLInputElement
  >;
  @ViewChild("auto", { static: false }) matAutocomplete: MatAutocomplete;
  customerForm: any;

  constructor(private fb: FormBuilder) {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) =>
        fruit ? this._filter(fruit) : this.allFruits.slice()
      )
    );
  }

  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || "").trim()) {
        this.fruits.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = "";
      }

      this.fruitCtrl.setValue(null);
    }
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = "";
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(
      fruit => fruit.toLowerCase().indexOf(filterValue) === 0
    );
  }

  ngOnInit() {
    this.customerForm = this.fb.group({
      fruitCtrl: ["", Validators.required]
    });
  }
  save(): void {
    console.log(this.customerForm);
    console.log("Saved: " + JSON.stringify(this.customerForm.value));
  }
}
