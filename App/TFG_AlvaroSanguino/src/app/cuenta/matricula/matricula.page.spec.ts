import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MatriculaPage } from './matricula.page';

describe('MatriculaPage', () => {
  let component: MatriculaPage;
  let fixture: ComponentFixture<MatriculaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatriculaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MatriculaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
