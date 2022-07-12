import { LabelsTopLayout } from 'cx/ui';
import { TextField, ValidationGroup } from 'cx/widgets';
import { PageController } from './Controller';

export default () => (
   <cx>
      <div className="flex flex-row p-8 bg-slate-100" controller={PageController}>
         <div className="flex-1 p-1 bg-red-300">
            <ValidationGroup valid-bind="$page.valid">
               <LabelsTopLayout columns={2}>
                  <TextField value-bind="$page.first" label="First name" placeholder="John" required />
                  <TextField value-bind="$page.last" label="Last name" placeholder="Doe" required />
                  <TextField value-bind="$page.email" label="email" placeholder="john.doe@email.com" required />
                  <TextField value-bind="$page.desc" label="Description" placeholder="..." required />
               </LabelsTopLayout>
            </ValidationGroup>
         </div>
         <div className="flex-1 p-1 bg-blue-300">
            <div
               visible-bind="$page.valid"
               visible-expr="!{$page.valid}"
               text-tpl="Pozdrav {$page.first} {$page.last} saljemo vam email na adresu {$page.email} sa sadrzajem {$page.desc}"
            />
         </div>
      </div>
   </cx>
);
