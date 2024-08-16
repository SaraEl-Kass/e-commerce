// // import { Injectable } from '@angular/core';
// // import { Actions, createEffect, ofType } from '@ngrx/effects';
// // import { ProductListingService } from '../services/product-listing.service';
// // import { FilterService } from '../services/filter.service';
// // import { loadProducts, loadProductsSuccess, loadProductsFailure, filterProductsByCategory, filterProductsBySearchTerm } from './product.actions';
// // import { catchError, map, mergeMap } from 'rxjs/operators';
// // import { of } from 'rxjs';

// // @Injectable()
// // export class ProductEffects {
// //   loadProducts$ = createEffect(() =>
// //     this.actions$.pipe(
// //       ofType(loadProducts),
// //       mergeMap(() =>
// //         this.productListingService.getProducts().pipe(
// //           map(products => loadProductsSuccess({ products })),
// //           catchError(error => of(loadProductsFailure({ error })))
// //         )
// //       )
// //     )
// //   );

// //   filterByCategory$ = createEffect(() =>
// //     this.actions$.pipe(
// //       ofType(filterProductsByCategory),
// //       mergeMap(action =>
// //         this.filterService.getProductsByCategory(action.category).pipe(
// //           map(products => loadProductsSuccess({ products })),
// //           catchError(error => of(loadProductsFailure({ error })))
// //         )
// //       )
// //     )
// //   );

// //   filterBySearchTerm$ = createEffect(() =>
// //     this.actions$.pipe(
// //       ofType(filterProductsBySearchTerm),
// //       mergeMap(action =>
// //         this.productListingService.getProducts().pipe(
// //           map(products => {
// //             const filteredProducts = products.filter(product => product.title.toLowerCase().includes(action.searchTerm.toLowerCase()));
// //             return loadProductsSuccess({ products: filteredProducts });
// //           }),
// //           catchError(error => of(loadProductsFailure({ error })))
// //         )
// //       )
// //     )
// //   );

// //   constructor(
// //     private actions$: Actions,
// //     private productListingService: ProductListingService,
// //     private filterService: FilterService
// //   ) {}
// // }
// ////////////////////////
// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { ProductListingService } from '../services/product-listing.service';
// import { FilterService } from '../../../shared/services/filter.service';
// import { loadProducts, loadProductsSuccess, loadProductsFailure, filterProductsByCategory, filterProductsBySearchTerm } from './product.actions';
// import { catchError, map, mergeMap } from 'rxjs/operators';
// import { of } from 'rxjs';

// @Injectable()
// export class ProductEffects {
//   loadProducts$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(loadProducts),
//       mergeMap(() =>
//         this.productListingService.getProducts().pipe(
//           map(products => loadProductsSuccess({ products })),
//           catchError(error => of(loadProductsFailure({ error })))
//         )
//       )
//     )
//   );

//   filterByCategory$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(filterProductsByCategory),
//       mergeMap(action =>
//         this.filterService.getProductsByCategory(action.category).pipe(
//           map(products => loadProductsSuccess({ products })),
//           catchError(error => of(loadProductsFailure({ error })))
//         )
//       )
//     )
//   );

//   filterBySearchTerm$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(filterProductsBySearchTerm),
//       mergeMap(action =>
//         this.productListingService.getProducts().pipe(
//           map(products => {
//             const filteredProducts = products.filter(product => product.title.toLowerCase().includes(action.searchTerm.toLowerCase()));
//             return loadProductsSuccess({ products: filteredProducts });
//           }),
//           catchError(error => of(loadProductsFailure({ error })))
//         )
//       )
//     )
//   );

//   constructor(
//     private actions$: Actions,
//     private productListingService: ProductListingService,
//     private filterService: FilterService
//   ) {}
// }


// // import { Injectable } from '@angular/core';
// // import { Actions, createEffect, ofType } from '@ngrx/effects';
// // import { ProductListingService } from '../services/product-listing.service';
// // import { FilterService } from '../services/filter.service';
// // import { loadProducts, loadProductsSuccess, loadProductsFailure, loadProductsByCategory, loadProductsByCategorySuccess, loadProductsByCategoryFailure, filterProductsBySearchTerm } from './product.actions';
// // import { catchError, map, mergeMap } from 'rxjs/operators';
// // import { of } from 'rxjs';

// // @Injectable()
// // export class ProductEffects {
// //   loadProducts$ = createEffect(() =>
// //     this.actions$.pipe(
// //       ofType(loadProducts),
// //       mergeMap(() =>
// //         this.productListingService.getProducts().pipe(
// //           map(products => loadProductsSuccess({ products })),
// //           catchError(error => of(loadProductsFailure({ error })))
// //         )
// //       )
// //     )
// //   );

// //   loadProductsByCategory$ = createEffect(() =>
// //     this.actions$.pipe(
// //       ofType(loadProductsByCategory),
// //       mergeMap(action =>
// //         this.filterService.getProductsByCategory(action.category).pipe(
// //           map(products => loadProductsByCategorySuccess({ products })),
// //           catchError(error => of(loadProductsByCategoryFailure({ error })))
// //         )
// //       )
// //     )
// //   );

// //   constructor(
// //     private actions$: Actions,
// //     private productListingService: ProductListingService,
// //     private filterService: FilterService
// //   ) {}
// // }

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductListingService } from '../services/product-listing.service';
import { loadProducts, loadProductsSuccess, loadProductsFailure } from './product.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ProductEffects {
  // loadProducts$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(loadProducts),
  //     mergeMap(() =>
  //       this.productListingService.getProducts().pipe(
  //         map(products => loadProductsSuccess({ products })),
  //         catchError(error => of(loadProductsFailure({ error })))
  //       )
  //     )
  //   )
  // );

  constructor(
    private actions$: Actions
  ) {}
}
