import { bind, Rescope } from 'cx/ui';
import { Button } from 'cx/widgets';
import getController from './Controller';

export default () => (
   <cx>
      <Rescope bind="$page" data={{ $route: bind('$route') }} controller={getController()}>
         <div className="bg-slate-100">
            {/* Image */}
            <div
               className="w-full h-64"
               style={{
                  background:
                     "url('https://as1.ftcdn.net/v2/jpg/01/20/86/26/1000_F_120862615_YSKy9jVN4hG1WpiqIgWN44fui9fbn1kB.jpg') no-repeat center",
                  backgroundSize: 'cover',
               }}
            />
            <div className="p-8 bg-white">
               <h1 className="text-3xl font-bold text-gray-800" text-bind="article.title" />
               <p className="mt-12 text-gray-700" text-bind="article.body" />
               <p className="mt-6 text-center">
                  <Button text="Back" icon="arrow-left" onClick={() => history.back()} />
               </p>
            </div>
         </div>
      </Rescope>
   </cx>
);
