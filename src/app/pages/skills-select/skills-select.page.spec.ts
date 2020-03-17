import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SkillsSelectPage } from './skills-select.page';

describe('SkillsSelectPage', () => {
  let component: SkillsSelectPage;
  let fixture: ComponentFixture<SkillsSelectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillsSelectPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SkillsSelectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
