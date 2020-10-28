import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModifMatriculaPage } from './modif-matricula.page';

describe('ModifMatriculaPage', () => {
  let component: ModifMatriculaPage;
  let fixture: ComponentFixture<ModifMatriculaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifMatriculaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModifMatriculaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
