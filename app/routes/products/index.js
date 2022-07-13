import { bind, KeySelection } from 'cx/ui';
import { Grid, Rescope } from 'cx/widgets';

import { getColumns } from './columns';
import getController from './Controller';

export default () => (
   <cx>
      <Rescope bind="$page" controller={getController()}>
         <div className="flex h-[94vh] p-8 bg-slate-100 products">
            <Grid
               className="p-2 bg-white"
               records-bind="records"
               scrollable
               fixedFooter
               columns={getColumns()}
               grouping={[
                  {
                     showFooter: false,
                     key: { name: bind('$record.category') },
                     showCaption: true,
                  },
               ]}
               selection={{
                  type: KeySelection,
                  bind: 'selection',
                  multiple: true,
               }}
            />
         </div>
      </Rescope>
   </cx>
);
