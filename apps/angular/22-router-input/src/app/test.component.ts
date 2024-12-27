import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-subscription',
  imports: [],
  template: `
    <div>TestId: {{ testId }}</div>
    <div>Permission: {{ permission }}</div>
    <div>User: {{ user }}</div>
  `,
})
export default class TestComponent implements OnInit, OnDestroy {
  ngOnInit(): void {
    console.log(`Initializing TestComponent ${this.testId}`);
  }

  ngOnDestroy(): void {
    console.log(`Destroying TestComponent`);
  }

  @Input() testId!: string;
  @Input() permission!: string;
  @Input() user!: string;
}
