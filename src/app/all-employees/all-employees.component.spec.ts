import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { of, throwError } from 'rxjs'; // For mocking observables
import { AllEmployeesComponent } from './all-employees.component';
import { AllEmployeesService } from '../all-employees.service';

// Mock the AllEmployeesService
class MockAllEmployeesService {
  getemployees() {
    return of([
      { id: 1, name: 'John', company: 'ABC', role: 'Developer', package: 1000000, email: 'john@example.com', dob: '1990-01-01', address: { city: 'New York' } },
      { id: 2, name: 'Jane', company: 'XYZ', role: 'Designer', package: 800000, email: 'jane@example.com', dob: '1992-05-15', address: { city: 'Los Angeles' } },
    ]);
  }

  deleteemployee(id: number) {
    return of({ message: 'Employee deleted' });
  }

  sortemployee(column: string, order: string) {
    return of([
      { id: 2, name: 'Jane', company: 'XYZ', role: 'Designer', package: 800000, email: 'jane@example.com', dob: '1992-05-15', address: { city: 'Los Angeles' } },
      { id: 1, name: 'John', company: 'ABC', role: 'Developer', package: 1000000, email: 'john@example.com', dob: '1990-01-01', address: { city: 'New York' } },
    ]);
  }

  filteremployee(text: string) {
    return of([
      { id: 1, name: 'John', company: 'ABC', role: 'Developer', package: 1000000, email: 'john@example.com', dob: '1990-01-01', address: { city: 'New York' } },
    ]);
  }

  pageemployee(limit: number, page: number) {
    return of([
      { id: 1, name: 'John', company: 'ABC', role: 'Developer', package: 1000000, email: 'john@example.com', dob: '1990-01-01', address: { city: 'New York' } },
    ]);
  }
}

describe('AllEmployeesComponent', () => {
  let component: AllEmployeesComponent;
  let fixture: ComponentFixture<AllEmployeesComponent>;
  let mockService: MockAllEmployeesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllEmployeesComponent],
      imports: [FormsModule], // Import FormsModule for ngModel
      providers: [
        { provide: AllEmployeesService, useClass: MockAllEmployeesService }, // Provide the mock service
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AllEmployeesComponent);
    component = fixture.componentInstance;
    mockService = TestBed.inject(AllEmployeesService) as unknown as MockAllEmployeesService;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load employees on page load', () => {
    component.pageload();
    expect(component.employees.length).toBe(2);
    expect(component.employees[0].name).toBe('John');
  });

  it('should delete an employee', () => {
    spyOn(window, 'confirm').and.returnValue(true); // Mock confirm dialog
    component.delete(1);
    expect(component.employees.length).toBe(2); // Mock service doesn't modify the list
  });

  it('should sort employees', () => {
    component.column = 'name';
    component.order = 'asc';
    component.sort();
    expect(component.employees.length).toBe(2);
    expect(component.employees[0].name).toBe('Jane');
  });

  it('should filter employees', () => {
    component.text = 'John';
    component.filter();
    expect(component.employees.length).toBe(1);
    expect(component.employees[0].name).toBe('John');
  });

  it('should paginate employees', () => {
    component.limit = 10;
    component.page = 1;
    component.pagination();
    expect(component.employees.length).toBe(1);
    expect(component.employees[0].name).toBe('John');
  });

  it('should handle errors during pageload', () => {
    spyOn(mockService, 'getemployees').and.returnValue(throwError('Error'));
    component.pageload();
    expect(component.employees.length).toBe(0); // No employees should be loaded
  });
});