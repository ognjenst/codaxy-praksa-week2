import { computable, expr, tpl } from 'cx/ui';

export const getColumns = () => [
   {
      header: 'ID',
      field: 'id',
   },
   {
      header: {
         className: 'text-center  text-red-500',
         items: (
            <cx>
               <span
                  text="Title"
                  tooltip={{
                     text: 'Name of the product',
                     placement: 'down',
                  }}
               />
            </cx>
         ),
      },
      field: 'title',
      aggregate: 'count',
      aggregateAlias: 'count',
      caption: tpl('{$group.name} ({$group.count})'),
      footer: tpl('TOTAL: {records.length}'),
      items: (
         <cx>
            <div
               text-bind="$record.title"
               tooltip={{
                  text: tpl('More info: {$record.title}'),
                  placement: 'right',
               }}
            />
         </cx>
      ),
   },
   {
      header: 'Description',
      field: 'description',
   },
   {
      header: 'Price',
      field: 'price',
      align: 'right',
      sortable: true,
      items: (
         <cx>
            <span text-tpl="${$record.price}" />
         </cx>
      ),
   },
   {
      header: 'Discount',
      field: 'discountPercentage',
      align: 'right',
      format: 'ps;0;2',
      sortable: true,
   },
   {
      header: 'Rating',
      field: 'rating',
      align: 'right',
      sortable: true,

      // className: {
      //    'text-green-500': expr('{$record.rating} >= 4.5'),
      //    'text-red-500': expr('{$record.rating} < 4.5'),
      // },

      className: computable('$record.rating', (rating) => {
         return rating >= 4.5 ? 'text-green-500' : 'text-red-500';
      }),
   },
   { header: 'Stock', field: 'stock', align: 'right' },
   { header: 'Brand', field: 'brand' },
   {
      header: 'Category',
      field: 'category',
   },
];
