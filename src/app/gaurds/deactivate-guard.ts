import { CanDeactivateFn } from '@angular/router';
import { Productdetails } from '../components/productdetails/productdetails';

export const deactivateGuard: CanDeactivateFn<Productdetails> = (
  component,
  currentRoute,
  currentState,
  nextState,
) => {
  if(component.hasUnsavedChanges()){
    return confirm("You have unsaved changes. Do you want to leave?");
  }
  return true;
};
