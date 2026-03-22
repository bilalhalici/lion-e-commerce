import { Action } from 'redux';

export type Matchable<AC extends () => Action> = AC & {
  type: ReturnType<AC>['type'];
  match(action: Action): action is ReturnType<AC>;
};

export function withMatcher<AC extends () => Action>(actionCreator: AC): Matchable<AC>;

export function withMatcher<AC extends (...arg: any[]) => Action>(actionCreator: AC): Matchable<AC>;

export function withMatcher(actionCreator: Function) {
  const type = actionCreator().type;
  return Object.assign(actionCreator, {
    type,
    match(action: Action) {
      return action.type === type;
    }
  });
}

export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
};

export function createActions<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>;

export function createActions<T extends string>(type: T, payload: void): Action<T>;

export function createActions<T extends string, P>(type: T, payload: P) {
  return { type, payload };
}