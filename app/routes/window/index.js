import { Button, Rescope, Window } from 'cx/widgets';
import getController from './Controller';

export default () => (
   <cx>
      <Rescope bind="$page" controller={getController()}>
         <div className="p-8 bg-slate-100">
            <Button text="Open" mod="primary" onClick={(e, { store }) => store.toggle('windowVisible')} />
            <Button
               text="Open"
               mod="danger"
               onClick={async (e, { store }) => {
                  let flag = await openNewWindow();
               }}
            />

            <Window visible-bind="windowVisible" title="New window" center modal>
               <div text-bind="info" />
            </Window>
         </div>
      </Rescope>
   </cx>
);

export function openNewWindow() {
   return new Promise((resolve) => {
      let w = new Window(
         (
            <cx>
               <Window title="Promise window" center modal closeOnEscape>
                  <div className="flex flex-row">
                     <Button mod="danger" text="Close" onClick={() => resolve(true)} dismiss />
                     <Button text="Cancel" onClick={() => resolve(false)} dismiss />
                  </div>
               </Window>
            </cx>
         )
      );
      w.open();
   });
}
