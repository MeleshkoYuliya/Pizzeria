import { trigger, animate, transition, style, query, animateChild, group } from '@angular/animations';


export const routeTransitionAnimations = trigger('triggerName', [
  transition('* => Pizzas, * => Checkout, * => OrderDashboard, * => AdminDashboard, * => OrderCard, * => LoginPage, * => RegisterPage', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ]),
    query(':enter', [style({ left: '-100%', opacity: 0 })]),
    query(':leave', animateChild(), {optional: true}),
    group([
      query(':leave', [animate('1s ease-out', style({ left: '100%', opacity: 0 }))], {optional: true}),
      query(':enter', [animate('1s ease-out', style({ left: '0%', opacity: 1 }))])
     ]),
     query(':enter', animateChild(), {optional: true})
   ])
]);

