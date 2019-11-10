// prettier-ignore
import { animate, animation, AnimationReferenceMetadata, query, sequence, style } from '@angular/animations';

const sharedStyles = {
  transform: 'translateY(0%)',
  opacity: 1
};

export const routerTransition: AnimationReferenceMetadata = animation([
  // enter first
  query(':enter > *', style({ opacity: 0, position: 'fixed' }), {
    optional: true
  }),

  // leave then enter on route change
  sequence([
    query(
      ':leave > *',
      [
        style(sharedStyles),
        animate('0.3s ease-in-out', style({ transform: 'translateY(-2%)', opacity: 0 })),
        style({ position: 'fixed' })
      ],
      { optional: true }
    ),
    query(
      ':enter > *',
      [
        style({
          transform: 'translateY(-2%)',
          opacity: 0,
          position: 'static'
        }),
        animate('0.3s ease-in-out', style(sharedStyles))
      ],
      { optional: true }
    )
  ])
]);
