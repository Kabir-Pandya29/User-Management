import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open edit user dialog and update user', () => {
    const user = { id: 1, name: 'John Doe', email: 'john@example.com', role: 'User' };
    spyOn(component, 'updateUser');
    component.openEditUserDialog(user);
    expect(component.newUser).toEqual(user);
    component.updateUser(user);
    expect(component.updateUser).toHaveBeenCalledWith(user);
  });

  it('should confirm and delete user', () => {
    const user = { id: 1, name: 'John Doe', email: 'john@example.com', role: 'User' };
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(component, 'deleteUser');
    component.confirmDeleteUser(user);
    expect(window.confirm).toHaveBeenCalledWith(`Are you sure you want to delete ${user.name}?`);
    expect(component.deleteUser).toHaveBeenCalledWith(user);
  });
});
