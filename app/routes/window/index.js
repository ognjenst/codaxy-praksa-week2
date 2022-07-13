import { Button, Rescope, Window } from 'cx/widgets';
import getController from './Controller';

export default () => (
   <cx>
      <Rescope bind="$page" controller={getController()}>
         <div className="p-8 bg-slate-100">
            <Button text="Open" mod="primary" onClick={(e, { store }) => store.toggle('windowVisible')} />
            <Window visible-bind="windowVisible" title="New window" center modal>
               <div text-bind="info" />
            </Window>
         </div>
      </Rescope>
   </cx>
);
