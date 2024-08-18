import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BlackButtonComponent } from './black-button.component'

describe('BlackButtonComponent', () => {
  let component: BlackButtonComponent
  let fixture: ComponentFixture<BlackButtonComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlackButtonComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(BlackButtonComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
