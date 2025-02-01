import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { WorkoutService } from './app.service';
import { FormsModule } from '@angular/forms';
import { User } from './app.model';

describe('AppComponent', () => {
  let service: WorkoutService;
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let workoutService: WorkoutService;
  // let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, FormsModule],
      providers: [WorkoutService],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    workoutService = TestBed.inject(WorkoutService);
    service = TestBed.inject(WorkoutService);
    localStorage.clear();

    // // Add sample users for pagination testing
    // for (let i = 1; i <= 10; i++) {
    //   service.addWorkout(`User${i}`, { type: 'Running', minutes: 30 });
    // }
  });
  // beforeEach(() => {
  //   TestBed.configureTestingModule({
  //     providers: [WorkoutService]
  //   });
  //   service = TestBed.inject(WorkoutService);
  //   localStorage.clear(); // Clear storage before each test
  // });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
    expect(service).toBeTruthy();
  });

  // it(`should have the 'my-app' title`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('my-app');
  // });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('h1')?.textContent).toContain(
  //     'Hello, my-app'
  //   );
  // });

  it('should retrieve users from localStorage', () => {
    const mockUsers: User[] = [
      {
        id: 1,
        userName: 'John Doe',
        workoutData: [{ type: 'Running', minutes: 30 }],
      },
    ];
    localStorage.setItem('users', JSON.stringify(mockUsers));

    const users = service.getUsers();
    expect(users.length).toBe(1);
    expect(users[0].userName).toBe('John Doe');
  });

  it('should add a new user', () => {
    const workout = { type: 'Running', minutes: 30 };
    service.addWorkout('Jane Smith', workout);

    const users = service.getUsers();

    expect(users.length).toBe(1);
    expect(users[0].userName).toBe('Jane Smith');
    expect(users[0].workoutData.length).toBe(1);
    expect(users[0].workoutData[0]).toEqual(workout);
  });

  it('should filter users by search text', () => {
    component.users = [
      { id: 1, userName: 'John Doe', workoutData: [] },
      { id: 2, userName: 'Jane Smith', workoutData: [] },
    ];

    component.onSearch('John');
    expect(component.filteredUsers.length).toBe(1);
    expect(component.filteredUsers[0].userName).toBe('John Doe');
  });

  it('should filter users by workout type', () => {
    component.users = [
      {
        id: 1,
        userName: 'John Doe',
        workoutData: [{ type: 'Running', minutes: 30 }],
      },
      {
        id: 2,
        userName: 'Jane Smith',
        workoutData: [{ type: 'Cycling', minutes: 45 }],
      },
    ];

    component.onFilterChange('Running');
    expect(component.filteredUsers.length).toBe(1);
    expect(component.filteredUsers[0].workoutData[0].type).toBe('Running');
  });

  it('should paginate users correctly', () => {
    component.users = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      userName: `User ${i + 1}`,
      workoutData: [],
    }));

    // Ensure filteredUsers is initialized
  component.filteredUsers = [...component.users];

    component.itemsPerPage = 5;
    component.onPageChange(2);

    expect(component.paginatedUsers.length).toBe(5);
    expect(component.paginatedUsers[0].userName).toBe('User 6');


    component.onPageChange(1);

  // Assert: Verify first page data
  expect(component.paginatedUsers.length).toBe(5);
  expect(component.paginatedUsers[0].userName).toBe('User 1');
  });
});
